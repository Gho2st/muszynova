import { useTranslations } from "next-intl";
import Image from "next/image";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.pricing" });

  const path = routing.pathnames["/cennik"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Cennik() {
  const t = useTranslations("pricing");
  return (
    <>
      <section className="py-16 xl:py-20 bg-black xl:bg-white">
        <h1 className="text-3xl xl:text-5xl font-bold text-customGold text-center mb-16 xl:mb-20">
          {t("header")}
        </h1>
        <div className=" xl:px-24 xl:flex xl:justify-center">
          <div className="xl:w-2/3">
            <Image
              src="/cennik/cennik.webp"
              alt="Cennik Parku Rekreacyjno Sportowego Muszynova w Muszynie"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
        </div>
      </section>
    </>
  );
}
