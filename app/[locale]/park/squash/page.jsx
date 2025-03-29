import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineSportsTennis } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.squash",
  });

  const path = routing.pathnames["/park/squash"][locale]; // Pobieramy ścieżkę dla języka
  const canonicalUrl = `https://muszynova.pl/${locale}${path}`; // Dodajemy prefix języka, np. "/pl/kontakt"
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Squash() {
  const t = useTranslations("squash");
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold"> {t("header")}</h1>
          <p className="mt-10">
            {t("text1")}
            <br></br> <br></br>
            {t("text2")}
          </p>
          <div className="mt-10">
            <Button text={t("button")} link={"/cennik"} />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/squash/s1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="Profesjonalna sala o certyfikowanych wymiarach do Squasha"
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
              alt="Logo Muszynova"
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
            <h3 className="text-4xl font-semibold"> {t("cards.header")}</h3>
            <p className="mt-10">{t("cards.text")}</p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={t("cards.card1.header")}
              buttonText={t("cards.card1.button")}
              link="o-nas"
              bgColor="bg-black"
              text={t("cards.card1.text")}
            />
            <Card
              icon={<MdOutlineSportsTennis />}
              title={t("cards.card2.header")}
              buttonText={t("cards.card2.button")}
              bgColor="bg-black"
              link="https://muszynova.oos.pl/reservations"
              text={t("cards.card2.text")}
            />
            <Card
              icon={<TbClock24 />}
              title={t("cards.card3.header")}
              buttonText={t("cards.card3.button")}
              bgColor="bg-black"
              link="/kontakt"
              text={t("cards.card3.text")}
            />
          </div>
        </div>
        <section className="grid md:grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/squash/s1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Profesjonalna sala o certyfikowanych wymiarach do Squasha"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/squash/s2.webp"
              layout="fill"
              objectFit="cover"
              alt="Sala do Squasha na tle z rakietą i piłeczką"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/squash/s3.webp"
              layout="fill"
              objectFit="cover"
              alt="Rakieta i piłeczka na sali do squasha"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/squash/s4.webp"
              layout="fill"
              objectFit="cover"
              alt="Rakieta i piłeczka na sali do squasha"
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
