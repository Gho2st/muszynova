import Image from "next/image";
import LineHeader from "@/app/UI/LineHeader";
import BackgroundList from "@/app/UI/BackgroundList";
import Header from "@/app/UI/Header";
import { useTranslations } from "next-intl";
import CtaLink from "@/app/UI/CtaLink";
import Gallery from "@/app/UI/Slider";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.jak-spedzic-weekend-w-muszynie",
  });

  const path =
    routing.pathnames["/blog/jak-spedzic-weekend-w-muszynie"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Muszyna() {
  const t = useTranslations("blog.posts.3");

  const customItems = [t("list.1"), t("list.2")];

  return (
    <>
      <Header text={t("header")} />
      <div className="flex md:w-3/4 mx-auto justify-center md:mt-16 h-[700px] ">
        <Image
          src="/blog/weekend/1.png"
          width={500}
          height={500}
          layout="responsive"
          className="object-cover"
          alt={t("alt.1")}
        />
      </div>
      <section className="px-6 md:px-20 xl:px-32 2xl:px-44 py-16 md:py-20 2xl:py-24">
        <LineHeader text={t("header2")} />
        <p className="mt-10 md:mt-16 text-center md:w-3/4 mx-auto xl:text-xl">
          {t("text")}
        </p>
        <div className="mt-16">
          <BackgroundList title={t("header3")} items={customItems} />
        </div>
        <CtaLink />
      </section>
      <div>
        <Gallery
          images={[
            {
              url: "/blog/weekend/1.png",
              alt: t("alt.1"),
            },
            {
              url: "/blog/weekend/2.png",
              alt: t("alt.2"),
            },
            {
              url: "/blog/weekend/3.png",
              alt: t("alt.3"),
            },
            {
              url: "/blog/weekend/4.png",
              alt: t("alt.4"),
            },
          ]}
        />
      </div>
    </>
  );
}
