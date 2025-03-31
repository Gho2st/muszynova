import Image from "next/image";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { BsTelephone } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { IoGitNetworkOutline } from "react-icons/io5";
import Button from "@/app/UI/Buttons/Button";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.gym",
  });

  const path = routing.pathnames["/park/silownia"][locale]; // Pobieramy ścieżkę dla języka
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
export default function Silownia() {
  const t = useTranslations("gym");

  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">{t("header")}</h1>
          <p className="mt-10">
            {t("text1")} <br></br> <br></br> {t("text2")}
          </p>
          <div className="mt-10">
            <Button
              link="https://muszynova.oos.pl/customer/login"
              text={t("button")}
            />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/silownia/s1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="Siłownia ze sprzętem, maszynami, hantlami"
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
          <div className="xl:w-1/4 xl:pr-10 xl:mr-2 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold">{t("cards.header")}</h3>
            <p className="mt-10">{t("cards.text")}</p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<BsTelephone />}
              title={t("cards.card1.header")}
              buttonText={t("cards.card1.button")}
              link={"/kontakt"}
              bgColor="bg-black"
              text={t("cards.card1.text")}
            />
            <Card
              icon={<CiCalendar />}
              title={t("cards.card2.header")}
              buttonText={t("cards.card2.button")}
              link={"/zajecia-grupowe"}
              bgColor="bg-black"
              text={t("cards.card2.text")}
            />
            <Card
              icon={<IoGitNetworkOutline />}
              title={t("cards.card3.header")}
              buttonText={t("cards.card3.button")}
              link={"/o-nas"}
              bgColor="bg-black"
              text={t("cards.card3.text")}
            />
          </div>
        </div>
        <section className="grid md:grid-cols-2 pt-20 gap-10">
          <Image
            src="/park/silownia/s1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="Siłownia ze sprzętem, maszynami, hantlami"
          />
          <Image
            src="/park/silownia/s2.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="Bieżnie, orbitreki, suwnice, ławeczki do wyciskania"
          />
          <Image
            src="/park/silownia/s3.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="Hantle o różnym ciężarze"
          />
          <Image
            src="/park/silownia/s4.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="Profesjonalne ławeczki do ćwiczeń"
          />
        </section>
      </section>
      <section className="pt-20">
        <Map />
      </section>
    </>
  );
}
