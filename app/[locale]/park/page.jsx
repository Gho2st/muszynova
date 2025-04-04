import Image from "next/image";
import Button from "../../UI/Buttons/Button";
import Map from "../../UI/Map/Map";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineSportsCricket } from "react-icons/md";
import { IoIosFitness } from "react-icons/io";
import { IoFitnessOutline } from "react-icons/io5";
import { PiPersonSimpleBike } from "react-icons/pi";
import { PiPingPong } from "react-icons/pi";
import { GiKidSlide } from "react-icons/gi";
import { PiWall } from "react-icons/pi";
import { TbBowling } from "react-icons/tb";
import Card from "../../UI/Card";
import { useTranslations } from "next-intl";
import { FaPlaystation } from "react-icons/fa";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.park",
  });

  const path = routing.pathnames["/park"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Park() {
  const t = useTranslations("park");

  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">{t("header")}</h1>
          <p className="mt-10">{t("text")}</p>
          <div className="mt-10">
            <Button text={t("button")} link="/o-nas" />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/Muszynova-hotel.jpg"
            width={100}
            height={100}
            layout="responsive"
            alt="Zdjęcie z zewnątrz parku rekreacyjno sportowego Muszynova"
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
              alt="logo Muszynova"
            />
          </div>
          <div className="flex xl:w-3/4 justify-center items-center">
            <h2 className="text-4xl xl:text-6xl text-customGold text-center font-bold">
              {t("header2")}
            </h2>
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row">
          <div className="xl:w-1/4 xl:pr-10 xl:mr-2 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold">Muszyna</h3>
            <p className="mt-10">{t("cards.text")}</p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={t("cards.card1.header")}
              buttonText={t("cards.card1.button")}
              link="/park/hala-sportowa"
              bgColor="bg-black"
              text={t("cards.card1.text")}
            />
            <Card
              icon={<TbBowling />}
              title={t("cards.card2.header")}
              buttonText={t("cards.card2.button")}
              link="/park/mini-kregielnia"
              bgColor="bg-black"
              text={t("cards.card2.text")}
            />
            <Card
              icon={<PiWall />}
              title={t("cards.card3.header")}
              buttonText={t("cards.card3.button")}
              link="/park/scianka-wspinaczkowa"
              bgColor="bg-black"
              text={t("cards.card3.text")}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row mt-10">
          <div className="grid xl:grid-cols-4 gap-5 text-white">
            <Card
              icon={<GiKidSlide />}
              title={t("cards.card4.header")}
              buttonText={t("cards.card4.button")}
              link="/park/sala-zabaw"
              bgColor="bg-black"
              text={t("cards.card4.text")}
            />
            <Card
              icon={<MdOutlineSportsCricket />}
              title={t("cards.card5.header")}
              buttonText={t("cards.card5.button")}
              link="/park/squash"
              bgColor="bg-black"
              text={t("cards.card5.text")}
            />
            <Card
              icon={<PiPersonSimpleBike />}
              title={t("cards.card6.header")}
              buttonText={t("cards.card6.button")}
              link="/park/wypozyczalnia-rowerow"
              bgColor="bg-black"
              text={t("cards.card6.text")}
            />
            <Card
              icon={<PiPingPong />}
              title={t("cards.card7.header")}
              buttonText={t("cards.card7.button")}
              link="/park/sala-gier"
              bgColor="bg-black"
              text={t("cards.card7.text")}
            />
            <Card
              icon={<IoIosFitness />}
              title={t("cards.card8.header")}
              buttonText={t("cards.card8.button")}
              link="/park/silownia"
              bgColor="bg-black"
              text={t("cards.card8.text")}
            />
            <Card
              icon={<IoFitnessOutline />}
              title={t("cards.card9.header")}
              buttonText={t("cards.card9.button")}
              link="/park/fitness"
              bgColor="bg-black"
              text={t("cards.card9.text")}
            />
            <Card
              icon={<FaPlaystation />}
              title={t("cards.card10.header")}
              buttonText={t("cards.card10.button")}
              link="/park/sala-multimedialna"
              bgColor="bg-black"
              text={t("cards.card10.text")}
            />
          </div>
        </div>
      </section>
      <section className="pt-20">
        <Map />
      </section>
    </>
  );
}
