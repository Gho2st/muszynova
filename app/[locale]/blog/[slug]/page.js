import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/app/UI/Header";
import LineHeader from "@/app/UI/LineHeader";
import CtaLink from "@/app/UI/CtaLink";
import RecentPosts from "@/app/UI/Blog/RecentPosts";
import BackgroundList from "@/app/UI/BackgroundList";
import Gallery from "@/app/UI/Slider";
import { getTranslations } from "next-intl/server";
import { blogPosts } from "@/app/data/blogData";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const t = await getTranslations({ locale, namespace: "blog.blogPosts" });

  // bierzemy ścieżkę DLA KONKRETNEGO SLUGA
  const localizedPath = routing.pathnames[`/blog/${slug}`]?.[locale];

  // Budujemy canonical URL
  const canonicalUrl =
    locale === "pl"
      ? `https://muszynova.pl${localizedPath}`
      : `https://muszynova.pl/${locale}${localizedPath}`;

  return {
    title: t(`${post.id}.meta.title`),
    description: t(`${post.id}.meta.description`),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const t = await getTranslations({ locale, namespace: "blog.blogPosts" });

  const altTranslations = t.raw(`${post.id}.alt`);
  const listTranslations = t.raw(`${post.id}.list`);

  const images = altTranslations
    ? Object.keys(altTranslations)
        .map((key) => ({
          url: `/blog/${post.id}/${key}.webp`,
          alt: String(altTranslations[key]).trim(),
        }))
        .sort((a, b) => {
          // sortujemy po numerze pliku: 1.webp, 2.webp, 3.webp...
          const numA = parseInt(a.url.match(/\/(\d+)\.webp$/)?.[1] || "0", 10);
          const numB = parseInt(b.url.match(/\/(\d+)\.webp$/)?.[1] || "0", 10);
          return numA - numB;
        })
    : [];

  const mainImage = images[0] || null;
  const hasGallery = images.length > 1;

  const backgroundListItems = listTranslations
    ? Object.values(listTranslations)
        .map(String)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];

  // Dane tekstowe
  const data = {
    title: t(`${post.id}.title`),
    subtitle: t(`${post.id}.header2`),
    subtitle2: t(`${post.id}.header3`),
    contentPart1: t(`${post.id}.text`),
    cta: {
      button: t(`${post.id}.cta.button`),
      header: t(`${post.id}.cta.header`),
      text: t(`${post.id}.cta.text`),
    },
  };

  return (
    <>
      <Header text={data.title} />

      {/* Główne zdjęcie – zawsze pierwsze */}
      {mainImage && (
        <div className="flex md:w-3/4 mx-auto justify-center md:mt-16 h-[700px] ">
          <Image
            src={mainImage.url}
            width={1200}
            height={800}
            alt={mainImage.alt}
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="pt-8 px-[9%] 2xl:px-[13%]">
        <section className="py-8 2xl:py-20">
          <div>
            <LineHeader text={data.subtitle} layout="left" />
            <p
              className="text-lg xl:text-xl leading-relaxed mt-10 xl:my-16 text-left"
              dangerouslySetInnerHTML={{ __html: data.contentPart1 }}
            />
          </div>

          {backgroundListItems.length > 0 && (
            <BackgroundList title={data.subtitle2} items={backgroundListItems} />
          )}

          <CtaLink
            link="/park"
            button={data.cta.button}
            header={data.cta.header}
            text={data.cta.text}
          />

          <div className="mt-16">
            <RecentPosts
              blogPosts={blogPosts.map((p) => ({
                ...p,
                title: t(`${p.id}.title`),
              }))}
              layout="row"
            />
          </div>
        </section>
      </div>

      {/* Galeria – TYLKO gdy jest więcej niż 1 zdjęcie */}
      {hasGallery && (
        <div className="py-16 bg-gray-50">
          <Gallery images={images} />
        </div>
      )}
    </>
  );
}
