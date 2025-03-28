import { useTranslations } from "next-intl";
import Image from "next/image";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.pricing" });

  const path = routing.pathnames["/cennik"][locale]; // Pobieramy ścieżkę dla języka
  const canonicalUrl = `https://muszynova.pl/${locale}${path}`; // Dodajemy prefix języka, np. "/pl/kontakt"
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
        <h1 className="text-5xl xl:text-6xl font-bold text-customGold text-center mb-16 xl:mb-20">
          {t("header")}
        </h1>
        <div className=" xl:px-24 xl:flex xl:justify-center">
          <div className="xl:w-2/3">
            <Image
              src="/cennik/cennik.webp"
              alt=""
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
