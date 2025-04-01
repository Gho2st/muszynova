import { useTranslations } from "next-intl";
import ImagesR from "./Images";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.parkgallery" });

  const path = routing.pathnames["/galeria/park"][locale]; // Pobieramy ścieżkę dla języka
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

export default function GalleryPark() {
  const t = useTranslations("gallery");
  return (
    <div className="px-6 xl:px-24 py-16 xl:py-24 2xl:py-32 ">
      <h1 className="text-3xl xl:text-5xl font-bold text-customGold text-center mb-16 xl:mb-20">
        {t("header3")}
      </h1>
      <ImagesR />
    </div>
  );
}
