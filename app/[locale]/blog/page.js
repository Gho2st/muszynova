import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });

  const path = routing.pathnames["/blog"][locale];
  const canonicalUrl =
    locale === "pl"
      ? `https://muszynova.pl${path}`
      : `https://muszynova.pl/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: canonicalUrl },
  };
}

async function getPosts(locale) {
  const translations = await prisma.postTranslation.findMany({
    where: {
      locale,
      post: { status: "published" },
    },
    include: { post: true },
    orderBy: { post: { publishedAt: "desc" } },
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

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const currentLocale = locale || "pl";
  const t = await getTranslations({ locale: currentLocale, namespace: "blog" });
  const posts = await getPosts(currentLocale);
  const prefix = currentLocale === "pl" ? "" : `/${currentLocale}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      <div className="mb-14">
        <span className="text-xs uppercase tracking-widest text-gray-400">
          {t("header2")}
        </span>
        <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mt-3">
          {t("header")}
        </h1>
        <p className="mt-4 text-base text-gray-500 max-w-xl leading-relaxed">
          {t("text")}
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">Brak opublikowanych wpisów.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`${prefix}/blog/${post.slug}`}
              className="group flex flex-col"
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-5 relative">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                    {t("noImage")}
                  </div>
                )}
              </div>

              {post.publishedAt && (
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString(
                    currentLocale === "pl" ? "pl-PL" : currentLocale,
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </p>
              )}

              <h2 className="text-base font-medium text-gray-900 group-hover:text-gold-700 transition-colors mb-2 leading-snug">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
              )}

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-700 group-hover:text-gold-800 transition-colors">
                {t("readMoreButton")}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
