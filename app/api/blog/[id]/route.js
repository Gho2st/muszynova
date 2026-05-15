import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { hash, hashCta } from "@/lib/contentHash";

export async function GET(req, { params }) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { translations: true },
  });

  if (!post)
    return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req, { params }) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const { id } = await params;
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
    !translations?.pl?.title ||
    !translations?.pl?.content ||
    !translations?.pl?.slug
  ) {
    return NextResponse.json(
      { error: "Tłumaczenie PL (slug, tytuł, treść) jest wymagane" },
      { status: 400 },
    );
  }

  // hashe źródła PL — to z czego zostały zrobione tłumaczenia
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
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        coverImage: coverImage || null,
        status,
        ctaPrimaryUrl: ctaPrimaryUrl || null,
        ctaSecondaryUrl: ctaSecondaryUrl || null,
        publishedAt:
          status === "published"
            ? publishedAt
              ? new Date(publishedAt)
              : new Date()
            : null,
        updatedAt: new Date(),
      },
    });

    await Promise.all(
      Object.entries(translations)
        .filter(([, t]) => t.title && t.content && t.slug)
        .map(([locale, t]) =>
          prisma.postTranslation.upsert({
            where: { postId_locale: { postId: post.id, locale } },
            update: {
              slug: t.slug,
              title: t.title,
              excerpt: t.excerpt || null,
              content: t.content,
              ctaTitle: t.ctaTitle || null,
              ctaDescription: t.ctaDescription || null,
              ctaPrimaryLabel: t.ctaPrimaryLabel || null,
              ctaSecondaryLabel: t.ctaSecondaryLabel || null,
              ...sourceHashes,
            },
            create: {
              postId: post.id,
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
            },
          }),
        ),
    );

    revalidatePath("/blog");
    Object.entries(translations).forEach(([locale, t]) => {
      if (!t.slug) return;
      const prefix = locale === "pl" ? "" : `/${locale}`;
      revalidatePath(`${prefix}/blog/${t.slug}`);
    });

    const updatedPost = await prisma.post.findUnique({
      where: { id: post.id },
      include: { translations: true },
    });
    return NextResponse.json(updatedPost);
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Slug już istnieje w jednym z języków. Wybierz inny." },
        { status: 409 },
      );
    }
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });
    }
    console.error("[PUT /api/blog/[id]]", err);
    return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { translations: { select: { locale: true, slug: true } } },
  });

  if (!post)
    return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  await prisma.post.delete({ where: { id: parseInt(id) } });

  revalidatePath("/blog");
  post.translations.forEach((t) => {
    const prefix = t.locale === "pl" ? "" : `/${t.locale}`;
    revalidatePath(`${prefix}/blog/${t.slug}`);
  });

  return NextResponse.json({ success: true });
}
