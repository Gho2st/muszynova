import { useTranslations } from "next-intl";
import Image from "next/image";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ButtonGreen from "@/app/UI/Buttons/ButtonGreen";
import Header from "@/app/UI/Header";

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
      <Header text={t("header")} />
      <section className="py-16 xl:py-20 bg-black xl:bg-white">
        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center mb-16">
          <ButtonGreen text={t("button")} link="/seniorzy.pdf" />
          <ButtonGreen text={t("button2")} link="/szkoly-przedszkola.pdf" />
        </div>

        <div className=" xl:px-24 xl:flex xl:justify-center">
          <div className="xl:w-2/3">
            <Image
              src="/cennik/cennik.webp"
              alt={t("alt")}
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
