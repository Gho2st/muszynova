import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { hash, hashCta } from "@/lib/contentHash";

export async function GET() {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { translations: true },
  });

  return NextResponse.json(posts);
}

export async function POST(req) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const body = await req.json();
  const {
    coverImage,
    status,
    publishedAt,
    translations,
    ctaPrimaryUrl,
    ctaSecondaryUrl,
  } = body;

  if (
    !translations?.pl?.slug ||
    !translations?.pl?.title ||
    !translations?.pl?.content
  ) {
    return NextResponse.json(
      { error: "Tłumaczenie PL (slug, tytuł, treść) jest wymagane" },
      { status: 400 },
    );
  }

  // hashe źródła PL — wspólne dla wszystkich tłumaczeń
  const pl = translations.pl;
  const sourceHashes = {
    sourceHashTitle: hash(pl.title),
    sourceHashExcerpt: hash(pl.excerpt || ""),
    sourceHashContent: hash(pl.content),
    sourceHashCta: hashCta(
      pl.ctaTitle,
      pl.ctaDescription,
      pl.ctaPrimaryLabel,
      pl.ctaSecondaryLabel,
    ),
  };

  try {
    const post = await prisma.post.create({
      data: {
        coverImage: coverImage || null,
        status: status || "draft",
        ctaPrimaryUrl: ctaPrimaryUrl || null,
        ctaSecondaryUrl: ctaSecondaryUrl || null,
        publishedAt:
          status === "published"
            ? publishedAt
              ? new Date(publishedAt)
              : new Date()
            : null,
        translations: {
          create: Object.entries(translations)
            .filter(([, t]) => t.title && t.content && t.slug)
            .map(([locale, t]) => ({
              locale,
              slug: t.slug,
              title: t.title,
              excerpt: t.excerpt || null,
              content: t.content,
              ctaTitle: t.ctaTitle || null,
              ctaDescription: t.ctaDescription || null,
              ctaPrimaryLabel: t.ctaPrimaryLabel || null,
              ctaSecondaryLabel: t.ctaSecondaryLabel || null,
              ...sourceHashes,
            })),
        },
      },
      include: { translations: true },
    });

    revalidatePath("/blog");
    post.translations.forEach((t) => {
      const prefix = t.locale === "pl" ? "" : `/${t.locale}`;
      revalidatePath(`${prefix}/blog/${t.slug}`);
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Slug już istnieje w jednym z języków. Wybierz inny." },
        { status: 409 },
      );
    }
    console.error("[POST /api/blog]", err);
    return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}
