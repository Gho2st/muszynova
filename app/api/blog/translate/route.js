import { NextResponse } from "next/server";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hash, hashCta } from "@/lib/contentHash";
import { deepseekChat } from "@/lib/deepseek";

const LOCALES = { en: "English", sk: "Slovak", ua: "Ukrainian", de: "German" };

function buildSchema(requestedFields) {
  const shape = {};
  if (requestedFields.includes("title")) {
    shape.title = z.string().describe("Translated title");
  }
  if (requestedFields.includes("slug")) {
    shape.slug = z
      .string()
      .describe(
        "SEO URL slug in target language: 3-6 words, lowercase, hyphens, no diacritics, no stop-words, main keyword.",
      );
  }
  if (requestedFields.includes("excerpt")) {
    shape.excerpt = z.string().describe("Translated excerpt");
  }
  if (requestedFields.includes("ctaTitle")) {
    shape.ctaTitle = z.string().describe("Translated CTA title");
  }
  if (requestedFields.includes("ctaDescription")) {
    shape.ctaDescription = z.string().describe("Translated CTA description");
  }
  if (requestedFields.includes("ctaPrimaryLabel")) {
    shape.ctaPrimaryLabel = z
      .string()
      .describe("Translated primary button label");
  }
  if (requestedFields.includes("ctaSecondaryLabel")) {
    shape.ctaSecondaryLabel = z
      .string()
      .describe("Translated secondary button label");
  }
  return z.object(shape);
}

function sanitizeSlug(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function repairJsonText({ text }) {
  if (!text) return text;
  let cleaned = text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first !== -1 && last !== -1 && last > first) {
    cleaned = cleaned.slice(first, last + 1);
  }
  return cleaned;
}

function stripCodeFences(text) {
  if (!text) return "";
  return text
    .replace(/^\s*```(?:html|json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
}

export async function POST(req) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  if (!process.env.DEEPSEEK_API_KEY)
    return NextResponse.json(
      { error: "Brak klucza DEEPSEEK_API_KEY w .env" },
      { status: 500 },
    );

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe dane wejściowe" },
      { status: 400 },
    );
  }

  const {
    postId,
    force = false,
    title,
    excerpt,
    content,
    ctaTitle,
    ctaDescription,
    ctaPrimaryLabel,
    ctaSecondaryLabel,
  } = body;

  if (!title || !content)
    return NextResponse.json(
      { error: "Brakuje tytułu lub treści" },
      { status: 400 },
    );

  // hash aktualnych pól PL
  const currentHashes = {
    title: hash(title),
    excerpt: hash(excerpt || ""),
    content: hash(content),
    cta: hashCta(ctaTitle, ctaDescription, ctaPrimaryLabel, ctaSecondaryLabel),
  };

  // pobierz istniejące tłumaczenia (do porównania hashów)
  let existingTranslations = [];
  if (postId && !force) {
    existingTranslations = await prisma.postTranslation.findMany({
      where: { postId: Number(postId), locale: { in: Object.keys(LOCALES) } },
      select: {
        locale: true,
        title: true,
        excerpt: true,
        content: true,
        slug: true,
        ctaTitle: true,
        ctaDescription: true,
        ctaPrimaryLabel: true,
        ctaSecondaryLabel: true,
        sourceHashTitle: true,
        sourceHashExcerpt: true,
        sourceHashContent: true,
        sourceHashCta: true,
      },
    });
  }

  const results = {};
  const errors = {};
  const skipped = {};

  await Promise.all(
    Object.entries(LOCALES).map(async ([locale, language]) => {
      try {
        const existing = existingTranslations.find((t) => t.locale === locale);

        // zdecyduj które pola wymagają tłumaczenia
        const fieldsToTranslate = {};

        if (force || !existing) {
          fieldsToTranslate.title = true;
          fieldsToTranslate.excerpt = true;
          fieldsToTranslate.content = true;
          fieldsToTranslate.cta = !!(
            ctaTitle ||
            ctaDescription ||
            ctaPrimaryLabel ||
            ctaSecondaryLabel
          );
        } else {
          fieldsToTranslate.title =
            existing.sourceHashTitle !== currentHashes.title;
          fieldsToTranslate.excerpt =
            excerpt && existing.sourceHashExcerpt !== currentHashes.excerpt;
          fieldsToTranslate.content =
            existing.sourceHashContent !== currentHashes.content;
          fieldsToTranslate.cta =
            (ctaTitle ||
              ctaDescription ||
              ctaPrimaryLabel ||
              ctaSecondaryLabel) &&
            existing.sourceHashCta !== currentHashes.cta;
        }

        const anyToTranslate = Object.values(fieldsToTranslate).some(Boolean);
        if (!anyToTranslate) {
          skipped[locale] = "Wszystkie pola aktualne";
          results[locale] = {
            title: existing.title,
            slug: existing.slug,
            excerpt: existing.excerpt || "",
            content: existing.content,
            ctaTitle: existing.ctaTitle || "",
            ctaDescription: existing.ctaDescription || "",
            ctaPrimaryLabel: existing.ctaPrimaryLabel || "",
            ctaSecondaryLabel: existing.ctaSecondaryLabel || "",
            _hashes: currentHashes,
          };
          return;
        }

        // slug zawsze tłumaczymy gdy zmienia się tytuł
        const needSlug = fieldsToTranslate.title;

        // ============================================================
        // CALL 1: krótkie pola przez generateObject (z schemą)
        // ============================================================
        const shortRequestedFields = [];
        if (fieldsToTranslate.title) shortRequestedFields.push("title");
        if (needSlug) shortRequestedFields.push("slug");
        if (fieldsToTranslate.excerpt) shortRequestedFields.push("excerpt");
        if (fieldsToTranslate.cta) {
          shortRequestedFields.push(
            "ctaTitle",
            "ctaDescription",
            "ctaPrimaryLabel",
            "ctaSecondaryLabel",
          );
        }

        let shortFieldsResult = {};

        if (shortRequestedFields.length > 0) {
          const shortParts = [];
          if (fieldsToTranslate.title) shortParts.push(`Title: ${title}`);
          if (fieldsToTranslate.excerpt)
            shortParts.push(`Excerpt: ${excerpt || "(none)"}`);
          if (fieldsToTranslate.cta) {
            shortParts.push(
              `CTA Title: ${ctaTitle || "(none)"}`,
              `CTA Description: ${ctaDescription || "(none)"}`,
              `CTA Primary Button: ${ctaPrimaryLabel || "(none)"}`,
              `CTA Secondary Button: ${ctaSecondaryLabel || "(none)"}`,
            );
          }

          const shortSchema = buildSchema(shortRequestedFields);

          // Eskalacja parametrów przy retry — DeepSeek bywa kapryśny
          // dla nielacińskich i aglutynacyjnych języków (ar, hu).
          const callShortFields = (attempt = 1) =>
            generateObject({
              model: deepseekChat,
              mode: "json",
              schema: shortSchema,
              maxTokens: attempt === 1 ? 2000 : 4000,
              temperature: attempt === 1 ? 0.2 : 0,
              experimental_repairText: repairJsonText,
              system: `You are a professional translator. Translate the given Polish blog fields to ${language}.

CRITICAL OUTPUT RULES:
- Output MUST be a single valid JSON object, nothing else.
- No markdown code fences. No commentary before or after.
- Escape all double quotes inside string values as \\".
- For slug: SEO 3-6 words, lowercase, hyphens, ASCII only (transliterate from ${language} if needed).

Required keys (exactly these, nothing else): ${shortRequestedFields.join(", ")}.`,
              prompt: shortParts.join("\n\n"),
            });

          try {
            const { object } = await callShortFields(1);
            shortFieldsResult = object;
          } catch (firstErr) {
            console.warn(
              `[translate] retry short fields dla locale ${locale} po błędzie:`,
              firstErr.message,
            );
            const { object } = await callShortFields(2);
            shortFieldsResult = object;
          }
        }

        // ============================================================
        // CALL 2: content jako czysty tekst (HTML) przez generateText
        // To eliminuje problemy z escapowaniem cudzysłowów w HTML
        // i pozwala na duży maxTokens bez ryzyka uciętego JSON-a.
        // ============================================================
        let translatedContent = "";

        if (fieldsToTranslate.content) {
          const callContent = (attempt = 1) =>
            generateText({
              model: deepseekChat,
              maxTokens: attempt === 1 ? 8000 : 12000,
              temperature: attempt === 1 ? 0.2 : 0,
              system: `You are a professional translator. Translate the following Polish HTML content to ${language}.

CRITICAL RULES:
- Keep ALL HTML tags, attributes, and structure completely intact and unchanged.
- Translate only the visible text content between tags.
- Do NOT add any preamble, commentary, or markdown code fences.
- Do NOT wrap the output in \`\`\`html or any other fences.
- Return ONLY the translated HTML, starting directly with the first tag or text.`,
              prompt: content,
            });

          try {
            const { text } = await callContent(1);
            translatedContent = stripCodeFences(text);
          } catch (firstErr) {
            console.warn(
              `[translate] retry content dla locale ${locale} po błędzie:`,
              firstErr.message,
            );
            const { text } = await callContent(2);
            translatedContent = stripCodeFences(text);
          }
        }

        // ============================================================
        // Złóż wynik: zmienione pola z AI + niezmienione z istniejącego
        // ============================================================
        results[locale] = {
          title: fieldsToTranslate.title
            ? shortFieldsResult.title || ""
            : existing?.title || "",
          slug: needSlug
            ? sanitizeSlug(shortFieldsResult.slug)
            : existing?.slug || "",
          excerpt: fieldsToTranslate.excerpt
            ? shortFieldsResult.excerpt || ""
            : existing?.excerpt || "",
          content: fieldsToTranslate.content
            ? translatedContent
            : existing?.content || "",
          ctaTitle: fieldsToTranslate.cta
            ? shortFieldsResult.ctaTitle || ""
            : existing?.ctaTitle || "",
          ctaDescription: fieldsToTranslate.cta
            ? shortFieldsResult.ctaDescription || ""
            : existing?.ctaDescription || "",
          ctaPrimaryLabel: fieldsToTranslate.cta
            ? shortFieldsResult.ctaPrimaryLabel || ""
            : existing?.ctaPrimaryLabel || "",
          ctaSecondaryLabel: fieldsToTranslate.cta
            ? shortFieldsResult.ctaSecondaryLabel || ""
            : existing?.ctaSecondaryLabel || "",
          _hashes: currentHashes,
          _translatedFields: Object.entries(fieldsToTranslate)
            .filter(([, v]) => v)
            .map(([k]) => k),
        };
      } catch (err) {
        console.error(`[translate] Błąd dla locale ${locale}:`, err.message);
        errors[locale] = err.message;
        results[locale] = {
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          ctaTitle: "",
          ctaDescription: "",
          ctaPrimaryLabel: "",
          ctaSecondaryLabel: "",
        };
      }
    }),
  );

  const hasAnyResult = Object.values(results).some((r) => r.title || r.content);
  if (!hasAnyResult && Object.keys(skipped).length === 0) {
    return NextResponse.json(
      { error: "Tłumaczenie nie powiodło się dla żadnego języka", errors },
      { status: 502 },
    );
  }

  return NextResponse.json({
    results,
    errors: Object.keys(errors).length ? errors : null,
    skipped: Object.keys(skipped).length ? skipped : null,
  });
}
