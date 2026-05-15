import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hash, hashCta } from "@/lib/contentHash";

const LOCALES = { en: "English", sk: "Slovak", ua: "Ukrainian", de: "German" };

const TRANSLATION_TOOL = {
  name: "translation",
  description: "Submit the translated blog post fields",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string", description: "Translated title" },
      slug: {
        type: "string",
        description: `SEO URL slug in target language: 3-6 words, lowercase, hyphens, no diacritics, no stop-words, main keyword.`,
      },
      excerpt: { type: "string", description: "Translated excerpt" },
      content: {
        type: "string",
        description: "Translated content - keep HTML tags intact",
      },
      ctaTitle: { type: "string", description: "Translated CTA title" },
      ctaDescription: {
        type: "string",
        description: "Translated CTA description",
      },
      ctaPrimaryLabel: {
        type: "string",
        description: "Translated primary button label",
      },
      ctaSecondaryLabel: {
        type: "string",
        description: "Translated secondary button label",
      },
    },
  },
};

function sanitizeSlug(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(req) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  if (!process.env.ANTHROPIC_API_KEY)
    return NextResponse.json(
      { error: "Brak klucza ANTHROPIC_API_KEY w .env" },
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
    postId, // jeśli edycja, ID istniejącego posta
    force = false, // wymuś pełne tłumaczenie
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
          // brak istniejącego tłumaczenia lub wymuszenie → tłumacz wszystko
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

        // nic do tłumaczenia → zwróć istniejące tłumaczenie bez wywołania API
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

        // przygotuj zawartość do tłumaczenia — tylko zmienione pola
        const partsToSend = [];
        if (fieldsToTranslate.title) partsToSend.push(`Title: ${title}`);
        if (fieldsToTranslate.excerpt)
          partsToSend.push(`Excerpt: ${excerpt || "(none)"}`);
        if (fieldsToTranslate.content) partsToSend.push(`Content:\n${content}`);
        if (fieldsToTranslate.cta) {
          partsToSend.push(
            `CTA Title: ${ctaTitle || "(none)"}`,
            `CTA Description: ${ctaDescription || "(none)"}`,
            `CTA Primary Button: ${ctaPrimaryLabel || "(none)"}`,
            `CTA Secondary Button: ${ctaSecondaryLabel || "(none)"}`,
          );
        }

        // slug zawsze tłumaczymy gdy zmienia się tytuł (bo zależy od tytułu)
        const needSlug = fieldsToTranslate.title;

        const requestedFields = [];
        if (fieldsToTranslate.title) requestedFields.push("title");
        if (needSlug) requestedFields.push("slug");
        if (fieldsToTranslate.excerpt) requestedFields.push("excerpt");
        if (fieldsToTranslate.content) requestedFields.push("content");
        if (fieldsToTranslate.cta) {
          requestedFields.push(
            "ctaTitle",
            "ctaDescription",
            "ctaPrimaryLabel",
            "ctaSecondaryLabel",
          );
        }

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5",
            max_tokens: 3500,
            tools: [TRANSLATION_TOOL],
            tool_choice: { type: "tool", name: "translation" },
            system: `Translate the given blog post fields from Polish to ${language}. Keep HTML tags intact. For slug: SEO-optimized 3-6 word URL slug in ${language}. Submit only these fields using the tool: ${requestedFields.join(", ")}.`,
            messages: [
              {
                role: "user",
                content: partsToSend.join("\n\n"),
              },
            ],
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody?.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        if (data.error)
          throw new Error(data.error.message || "Błąd API Anthropic");

        const toolUse = data.content?.find((c) => c.type === "tool_use");
        if (!toolUse?.input) throw new Error("Brak tool_use w odpowiedzi");

        const parsed = toolUse.input;

        // złóż wynik: zmienione pola z AI + niezmienione z istniejącego tłumaczenia
        results[locale] = {
          title: fieldsToTranslate.title
            ? parsed.title || ""
            : existing?.title || "",
          slug: needSlug ? sanitizeSlug(parsed.slug) : existing?.slug || "",
          excerpt: fieldsToTranslate.excerpt
            ? parsed.excerpt || ""
            : existing?.excerpt || "",
          content: fieldsToTranslate.content
            ? parsed.content || ""
            : existing?.content || "",
          ctaTitle: fieldsToTranslate.cta
            ? parsed.ctaTitle || ""
            : existing?.ctaTitle || "",
          ctaDescription: fieldsToTranslate.cta
            ? parsed.ctaDescription || ""
            : existing?.ctaDescription || "",
          ctaPrimaryLabel: fieldsToTranslate.cta
            ? parsed.ctaPrimaryLabel || ""
            : existing?.ctaPrimaryLabel || "",
          ctaSecondaryLabel: fieldsToTranslate.cta
            ? parsed.ctaSecondaryLabel || ""
            : existing?.ctaSecondaryLabel || "",
          _hashes: currentHashes, // wyślemy je do frontu razem z wynikiem
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

  const hasAnyResult = Object.values(results).some((r) => r.title);
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
