import Image from "next/image";
import Button from "../../UI/Buttons/Button";
import Map from "../../UI/Map/Map";
import { CiLocationOn } from "react-icons/ci";
import { MdFoodBank } from "react-icons/md";
import { MdOutlineSportsCricket } from "react-icons/md";
import Card from "../../UI/Card";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.aboutus" });

  const path = routing.pathnames["/o-nas"][locale]; // Pobieramy ścieżkę dla języka
  const canonicalUrl = `https://muszynova.pl/${locale}${path}`; // Dodajemy prefix języka, np. "/pl/kontakt"
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function About() {
  const t = useTranslations("aboutus");

  return (
    <>
      {/* hero */}
      <div className="xl:flex pb-20">
        <div className="xl:w-1/3 px-6 xl:p-16 pt-16 xl:pt-20 xl:pl-16">
          <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            {t("header")} <br></br>
            <span className="text-customGold"> Muszynova? </span>
          </h1>
          <p className="mt-10">{t("text")}</p>
          <div className="mt-10">
            <Button text={t("button")} link="/galeria" />
          </div>
        </div>
        <div className="mt-16 xl:mt-0 xl:w-2/3">
          <Image
            src="/Muszynova-hotel.jpg"
            width={100}
            height={100}
            layout="responsive"
            alt=""
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
          <div className="xl:w-1/4 xl:mr-16 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold">Muszyna</h3>
            <p className="mt-10">{t("cards.text")}</p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={t("cards.card1.header")}
              buttonText={t("cards.card1.button")}
              link="/kontakt"
              bgColor="bg-black"
              text={t("cards.card1.text")}
            />
            <Card
              icon={<MdFoodBank />}
              title={t("cards.card2.header")}
              buttonText={t("cards.card2.button")}
              link="/restauracja"
              bgColor="bg-black"
              text={t("cards.card2.text")}
            />
            <Card
              icon={<MdOutlineSportsCricket />}
              title={t("cards.card3.header")}
              buttonText={t("cards.card3.button")}
              link="/park"
              bgColor="bg-black"
              text={t("cards.card3.text")}
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
