import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.gallery" });

  const path = routing.pathnames["/galeria"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Galeria() {
  const t = useTranslations("gallery");
  return (
    <>
      <section className="px-6 xl:px-24 py-16 xl:py-20 ">
        <h1 className="text-5xl xl:text-6xl font-bold text-customGold text-center mb-16 xl:mb-20">
          {t("header")}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-x-10 gap-y-10 sm:gap-y-0">
          <Link
            className="w-3/3 sm:w-1/3 hover:scale-105 transition-all ease-in-out duration-300"
            href={"/galeria/park"}
          >
            <div>
              <Image
                src="/galeria/park.webp"
                width={100}
                height={100}
                layout="responsive"
                alt="Obiekt Muszynova z lotu ptaka"
              />
            </div>
          </Link>
          <Link
            className="w-3/3 sm:w-1/3 hover:scale-105 transition-all ease-in-out duration-300"
            href={"/galeria/restauracja"}
          >
            <div>
              <Image
                src="/galeria/restauracja.webp"
                width={100}
                height={100}
                layout="responsive"
                alt="Karta Menu umiejscowiona na stole w restauracji Muszynova"
              />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
