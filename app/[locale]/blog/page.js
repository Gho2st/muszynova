import LineHeader from "@/app/UI/LineHeader";
import BlogCard from "@/app/UI/BlogCard";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.blog",
  });

  const path = routing.pathnames["/blog"][locale]; // Pobieramy ścieżkę dla języka
  // Jeśli locale to 'pl', pomijamy prefix języka, w przeciwnym razie go dodajemy
  const canonicalUrl =
    locale === "pl"
      ? `https://muszynova.pl${path}`
      : `https://muszynova.pl/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Blog() {
  const t = useTranslations("blog");
  return (
    <section className="px-6 xl:px-24 py-16 xl:py-20 2xl:py-32 ">
      <h1 className="text-4xl xl:text-5xl mb-16 font-semibold">{t("header2")}</h1>
      <LineHeader text={t("header3")} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 xl:mt-24 gap-10 xl:gap-20">
        <BlogCard
          header={t("posts.1.header")}
          text={t("posts.1.text")}
          link="/blog/muszyna-10-najlepszych-atrakcji"
        />
        <BlogCard
          header={t("posts.2.header")}
          text={t("posts.2.text")}
          link="/blog/muszyna-najlepsze-szlaki-turystyczne"
        />
        <BlogCard
          header={t("posts.3.header")}
          text={t("posts.3.text")}
          link="/blog/jak-spedzic-weekend-w-muszynie"
        />
      </div>
    </section>
  );
}
