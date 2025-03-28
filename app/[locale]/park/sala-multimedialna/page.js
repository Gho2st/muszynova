import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { BsHeadsetVr } from "react-icons/bs";
import { FaPlaystation } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.multimediaroom",
  });

  const path = routing.pathnames["/park/sala-multimedialna"][locale]; // Pobieramy ścieżkę dla języka
  const canonicalUrl = `https://muszynova.pl/${locale}${path}`; // Dodajemy prefix języka, np. "/pl/kontakt"
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Multi() {
  const t = useTranslations("multimediaroom");
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">{t("header")}</h1>
          <p className="mt-10">
            {t("text1")} <br></br>
            <br></br> {t("text2")}
          </p>
          <div className="mt-10">
            <Button text={t("button")} link="/o-nas" />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/sala-multimedialna/1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="obrazek przedstawiający chłopca grającego na playstation przed telewizorem w Muszynova"
          />
        </div>
      </div>

      {/* more section */}
      <section className="px-6 xl:px-24 xl:py-20">
        <div className="flex flex-col-reverse xl:flex-row justify-between xl:mb-10">
          <div className="w-2/3 xl:w-1/5 mx-auto xl:mx-0">
            <Image
              src={"/logo2.webp"}
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex xl:w-3/4 justify-center items-center">
            <h2 className="text-4xl xl:text-6xl text-customGold text-center font-bold">
              {t("header2")}
            </h2>
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row">
          <div className="xl:w-1/4 pr-10 xl:mr-2 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold">{t("cards.header")}</h3>
            <p className="mt-10">{t("cards.text")}</p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<FaPlaystation />}
              title={t("cards.card1.header")}
              buttonText={t("cards.card1.button")}
              link="/galeria"
              bgColor="bg-black"
              text={t("cards.card1.text")}
            />
            <Card
              icon={<BsHeadsetVr />}
              title={t("cards.card2.header")}
              link="/cennik"
              buttonText={t("cards.card2.button")}
              bgColor="bg-black"
              text={t("cards.card2.text")}
            />
            <Card
              icon={<FaBirthdayCake />}
              title={t("cards.card3.header")}
              buttonText={t("cards.card3.button")}
              link="/kontakt"
              bgColor="bg-black"
              text={t("cards.card3.text")}
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/sala-multimedialna/1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/sala-multimedialna/s2.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
        </section>
      </section>
      <section className="pt-20">
        <Map />
      </section>
    </>
  );
}
