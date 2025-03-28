import { useTranslations } from "next-intl";
import Image from "next/image";

export const metadata = {
  title: "Cennik Parku Rekreacyjno Sportowego - Muszynova",
  alternates: {
    canonical: "https://muszynova.pl/cennik",
  },
  description:
    "Poznaj aktualny cennik usług i produktów oferowanych przez Muszynova. Sprawdź szczegóły i wybierz najlepszą ofertę dla siebie!",
};

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
