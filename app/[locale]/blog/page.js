import LineHeader from "@/app/UI/LineHeader";
import BlogCard from "@/app/UI/BlogCard";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Header from "@/app/UI/Header";

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
    <>
      <Header text={t("header2")} />
      <section className="px-6 xl:px-24 py-16 xl:py-20 2xl:py-32 ">
        <LineHeader text={t("header3")} />
        <p className="text-center mt-10">{t("text")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 xl:mt-16 2xl:mt-24 gap-10 2xl:gap-20">
          <BlogCard
            header={t("posts.1.header")}
            text={t("posts.1.text")}
            link="/blog/muszyna-10-najlepszych-atrakcji"
            button={t("posts.1.button")}
          />
          <BlogCard
            header={t("posts.2.header")}
            text={t("posts.2.text")}
            link="/blog/muszyna-najlepsze-szlaki-turystyczne"
            button={t("posts.2.button")}
          />
          <BlogCard
            header={t("posts.3.header")}
            text={t("posts.3.text")}
            link="/blog/jak-spedzic-weekend-w-muszynie"
            button={t("posts.3.button")}
          />
          <BlogCard
            header={t("posts.4.header")}
            text={t("posts.4.text")}
            link="/blog/aktywny-wypoczynek-w-beskidzie-sadeckim"
            button={t("posts.4.button")}
          />
          <BlogCard
            header={t("posts.5.header")}
            text={t("posts.5.text")}
            link="/blog/historia-squasha"
            button={t("posts.5.button")}
          />
          <BlogCard
            header={t("posts.6.header")}
            text={t("posts.6.text")}
            link="/blog/rowerem-przez-muszyne"
            button={t("posts.6.button")}
          />
          <BlogCard
            header={t("posts.7.header")}
            text={t("posts.7.text")}
            link="/blog/muszyna-wody-mineralne"
            button={t("posts.7.button")}
          />
          <BlogCard
            header={t("posts.8.header")}
            text={t("posts.8.text")}
            link="/blog/lokalne-legendy-i-historie"
            button={t("posts.8.button")}
          />
        </div>
      </section>
    </>
  );
}
