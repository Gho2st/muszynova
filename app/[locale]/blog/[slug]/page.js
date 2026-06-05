import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

const DOMAIN = process.env.SITE_DOMAIN;

async function getPost(slug, locale) {
  const translation = await prisma.postTranslation.findFirst({
    where: {
      slug,
      locale,
      post: { status: "published", site: { domain: DOMAIN } },
    },
    include: { post: true },
  });

  if (!translation) return null;
  return {
    id: translation.post.id,
    slug: translation.slug,
    title: translation.title,
    excerpt: translation.excerpt,
    content: translation.content,
    coverImage: translation.post.coverImage,
    publishedAt: translation.post.publishedAt,
    createdAt: translation.post.createdAt,
    updatedAt: translation.updatedAt,
    ctaTitle: translation.ctaTitle,
    ctaDescription: translation.ctaDescription,
    ctaPrimaryLabel: translation.ctaPrimaryLabel,
    ctaSecondaryLabel: translation.ctaSecondaryLabel,
    ctaPrimaryUrl: translation.post.ctaPrimaryUrl,
    ctaSecondaryUrl: translation.post.ctaSecondaryUrl,
  };
}

async function getAllTranslationsForPost(slug, locale) {
  const translation = await prisma.postTranslation.findFirst({
    where: { slug, locale, post: { status: "published" } },
    include: {
      post: {
        include: { translations: { select: { locale: true, slug: true } } },
      },
    },
  });
  return translation?.post.translations ?? [];
}

async function getLatestPosts(currentSlug, locale, limit = 3) {
  const translations = await prisma.postTranslation.findMany({
    where: {
      locale,
      slug: { not: currentSlug },
      post: { status: "published" },
    },
    include: { post: true },
    orderBy: { post: { publishedAt: "desc" } },
    take: limit,
  });

  return translations.map((t) => ({
    id: t.post.id,
    slug: t.slug,
    title: t.title,
    excerpt: t.excerpt,
    coverImage: t.post.coverImage,
    publishedAt: t.post.publishedAt,
  }));
}

function calculateReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const currentLocale = locale || "pl";
  const post = await getPost(slug, currentLocale);
  if (!post) return {};

  const allTranslations = await getAllTranslationsForPost(slug, currentLocale);
  const languages = { "x-default": `/blog/${post.slug}` };
  allTranslations.forEach((t) => {
    if (t.locale === "pl") languages["pl"] = `/blog/${t.slug}`;
    else languages[t.locale] = `/${t.locale}/blog/${t.slug}`;
  });

  const canonical =
    currentLocale === "pl"
      ? `/blog/${post.slug}`
      : `/${currentLocale}/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog Muszynova`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
    },
    alternates: { canonical, languages },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug, locale } = await params;
  const currentLocale = locale || "pl";
  const t = await getTranslations({ locale: currentLocale, namespace: "blog" });
  const post = await getPost(slug, currentLocale);
  if (!post) notFound();

  const prefix = currentLocale === "pl" ? "" : `/${currentLocale}`;
  const latest = await getLatestPosts(slug, currentLocale);
  const readingTime = calculateReadingTime(post.content);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: post.coverImage || "",
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: "Muszynova" },
    publisher: { "@type": "Organization", name: "Muszynova" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
          <Link
            href={`${prefix}/`}
            className="hover:text-green-600 transition-colors"
          >
            {t("main")}
          </Link>
          <span className="text-gray-300">›</span>
          <Link
            href={`${prefix}/blog`}
            className="hover:text-green-600 transition-colors"
          >
            Blog
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        {/* Nagłówek */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-400 mb-4 flex-wrap">
            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString(
                  currentLocale === "pl" ? "pl-PL" : currentLocale,
                  { day: "numeric", month: "long", year: "numeric" },
                )}
              </span>
            )}
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{readingTime} min</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-500 leading-relaxed border-l-2 border-red-200 pl-4 italic">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Zdjęcie główne */}
        {post.coverImage && (
          <div className="aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden mb-12 relative">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Treść */}
        <div
          className="text-gray-700 text-lg
            [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-gray-900 [&_h2]:mt-12 [&_h2]:mb-5
            [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-gray-900 [&_h3]:mt-10 [&_h3]:mb-4

            [&_p]:my-6 [&_p]:leading-[1.8]

            [&_a]:text-red-700 [&_a]:underline hover:[&_a]:text-red-800
            [&_strong]:text-gray-900 [&_strong]:font-medium

            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6 [&_ul]:space-y-2
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-2
            [&_li]:leading-[1.7] [&_li]:pl-2
            [&_li::marker]:text-gray-400 [&_li::marker]:font-medium
            [&_ul_ul]:list-[circle] [&_ul_ul]:mt-2 [&_ul_ul]:mb-0
            [&_ol_ol]:list-[lower-alpha] [&_ol_ol]:mt-2 [&_ol_ol]:mb-0

            [&_blockquote]:border-l-2 [&_blockquote]:border-red-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-8
            [&_img]:rounded-xl [&_img]:my-8 [&_img]:max-w-full
            [&_hr]:border-gray-200 [&_hr]:my-12
            [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        {post.ctaTitle && (
          <div className="my-16 bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 lg:p-10 text-green-50">
            <p className="text-xs uppercase tracking-widest text-green-300 mb-3">
              Muszynova
            </p>
            <h3 className="text-2xl lg:text-3xl font-light mb-3 leading-tight">
              {post.ctaTitle}
            </h3>
            {post.ctaDescription && (
              <p className="text-green-100 mb-6 leading-relaxed max-w-xl">
                {post.ctaDescription}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              {post.ctaPrimaryUrl && post.ctaPrimaryLabel && (
                <Link
                  href={
                    post.ctaPrimaryUrl.startsWith("http")
                      ? post.ctaPrimaryUrl
                      : `${prefix}${post.ctaPrimaryUrl}`
                  }
                  className="inline-flex items-center gap-2 bg-green-50 text-green-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                >
                  {post.ctaPrimaryLabel} <span>→</span>
                </Link>
              )}
              {post.ctaSecondaryUrl && post.ctaSecondaryLabel && (
                <Link
                  href={
                    post.ctaSecondaryUrl.startsWith("http")
                      ? post.ctaSecondaryUrl
                      : `${prefix}${post.ctaSecondaryUrl}`
                  }
                  className="inline-flex items-center gap-2 border border-green-700 text-green-50 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  {post.ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Autor */}
        <div className="flex items-center gap-4 py-6 border-t border-b border-gray-100 my-8">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-medium shrink-0">
            MZ
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{t("team.1")}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t("team.2")}</p>
          </div>
        </div>

        {/* Najnowsze wpisy */}
        {latest.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs uppercase tracking-widest text-gray-400">
                {t("new")}
              </p>
              <Link
                href={`${prefix}/blog`}
                className="text-xs uppercase tracking-widest text-gold-700 hover:text-gold-800 transition-colors"
              >
                {t("all")}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {latest.map((p) => (
                <Link
                  key={p.id}
                  href={`${prefix}/blog/${p.slug}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors"
                >
                  <div className="aspect-[16/10] bg-gray-100 relative">
                    {p.coverImage && (
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    {p.publishedAt && (
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                        {new Date(p.publishedAt).toLocaleDateString(
                          currentLocale === "pl" ? "pl-PL" : currentLocale,
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                    )}
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-gold-700 transition-colors leading-snug">
                      {p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Powrót */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href={`${prefix}/blog`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            {t("back")}
          </Link>
        </div>
      </article>
    </>
  );
}
