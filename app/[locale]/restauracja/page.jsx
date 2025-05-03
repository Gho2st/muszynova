import Image from "next/image";
import Button from "../../UI/Buttons/Button";
import Restaurant from "@/app/Homepage/Restaurant";
import Card from "../../UI/Card";
import { BiSolidParty } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import MenuButton from "@/app/UI/Buttons/MenuButton";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.restaurant",
  });

  const path = routing.pathnames["/restauracja"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Page() {
  const t = useTranslations("restaurantpage");
  const r = useTranslations("restaurant");
  return (
    <>
      <div className="grid xl:grid-cols-2">
        <div className="px-6 xl:p-16 pt-16 xl:pt-20 2xl:pt-32">
          <h1 className="text-4xl xl:text-5xl font-bold">{t("header")}</h1>
          <p className="mb-10 xl:mb-0 mt-10">
            {t("text1")}
            <br></br>
            <br></br>
            {t("text2")}
          </p>
        </div>
        <div>
          <Image
            src={"/restauracja/r1.webp"}
            height={100}
            width={100}
            layout="responsive"
            alt={t("alt.1")}
          />
        </div>
      </div>
      {/* 2 */}
      <div className="flex flex-col-reverse xl:flex-row">
        <div className="xl:w-1/2">
          <Image
            src={"/restauracja/r2.webp"}
            height={100}
            width={100}
            layout="responsive"
            alt={t("alt.2")}
          />
        </div>
        <div className="xl:w-1/2 px-6 py-20  xl:p-16 2xl:pt-32">
          <h2 className="text-4xl xl:text-5xl text-center font-bold">
            {t("header2")}
          </h2>
          <div className="flex flex-col gap-10 justify-center items-center mt-20">
            <MenuButton text={t("button")} link="/menu.pdf" />
            <MenuButton text={t("button2")} link="/karta-napojow.pdf" />
          </div>
        </div>
      </div>
      <Restaurant t={r} />
      <section className="px-6 xl:px-44 py-20">
        <h2 className="text-4xl xl:text-5xl font-bold text-center mb-20">
          {t("header3")}
        </h2>
        <div className="grid xl:grid-cols-3 gap-10">
          <Card
            icon={<BiSolidParty />}
            title={t("cards.card1.header")}
            buttonText={t("cards.card1.button")}
            link="/o-nas"
            text={t("cards.card1.text")}
          />

          <Card
            icon={<FaRegCalendar />}
            title={t("cards.card2.header")}
            buttonText={t("cards.card2.button")}
            link="/galeria"
            text={t("cards.card2.text")}
          />
          <Card
            icon={<FaPeopleGroup />}
            title={t("cards.card3.header")}
            buttonText={t("cards.card3.button")}
            link="/kontakt"
            text={t("cards.card3.text")}
          />
        </div>
      </section>
    </>
  );
}
