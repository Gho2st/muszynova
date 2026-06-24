import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hash, hashCta } from "@/lib/contentHash";

function revalidatePost(translations) {
  revalidatePath("/blog");
  revalidateTag("blog");

  if (translations?.length) {
    translations.forEach((t) => {
      const prefix = t.locale === "pl" ? "" : `/${t.locale}`;
      revalidatePath(`${prefix}/blog/${t.slug}`);
    });
  }
}

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
  const postId = parseInt(id);

  const owned = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true },
  });
  if (!owned)
    return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

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
      where: { id: postId },
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

    revalidatePost(post.translations || []);

    const updatedPost = await prisma.post.findUnique({
      where: { id: post.id },
      include: { translations: true },
    });

    return NextResponse.json(updatedPost);
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Slug już istnieje w jednym z języków" },
        { status: 409 },
      );
    }
    console.error("[PUT /api/blog/[id]]", err);
    return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const { id } = await params;
  const postId = parseInt(id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { translations: { select: { locale: true, slug: true } } },
  });

  if (!post)
    return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  await prisma.post.delete({ where: { id: postId } });

  revalidatePost(post.translations);

  return NextResponse.json({ success: true });
}
