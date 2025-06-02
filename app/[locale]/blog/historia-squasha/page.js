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
    namespace: "metadata.historia-squasha",
  });

  const path = routing.pathnames["/blog/historia-squasha"][locale]; // Pobieramy ścieżkę dla języka
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

export default function HistoriaSquasha() {
  const t = useTranslations("blog.posts.5");

  const customItems = [
    t("list.1"),
    t("list.2"),
    t("list.3"),
    t("list.4"),
    t("list.5"),
    t("list.6"),
    t("list.7"),
    t("list.8"),
  ];

  return (
    <>
      <Header text={t("header")} />
      <div className="flex md:w-3/4 mx-auto justify-center md:mt-16 h-[700px] ">
        <Image
          src="/park/squash/s1.webp"
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
              url: "/park/squash/s1.webp",
              alt: t("alt.1"),
            },
            {
              url: "/park/squash/s2.webp",
              alt: t("alt.2"),
            },
            {
              url: "/park/squash/s3.webp",
              alt: t("alt.3"),
            },
            {
              url: "/park/squash/s4.webp",
              alt: t("alt.4"),
            },
          ]}
        />
      </div>
    </>
  );
}
