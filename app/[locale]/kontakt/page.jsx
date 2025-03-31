import { MdOutlineSportsCricket } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidParty } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { IoPizzaOutline } from "react-icons/io5";
import { LuWeight } from "react-icons/lu";
import Image from "next/image";
import Map from "../../UI/Map/Map";
import Card from "../../UI/Card";
import Form from "./form";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.contact",
  });

  const path = routing.pathnames["/kontakt"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Contact() {
  const t = useTranslations("contact");
  return (
    <>
      <div className="px-6 xl:px-44 py-16 xl:py-20">
        <h1 className="text-center text-4xl xl:text-5xl text-customGold font-bold mb-16 xl:mb-20 break-words">
          {t("header")}
        </h1>
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card
              link="/o-nas"
              icon={<CiLocationOn />}
              title={t("cards.card1.header")}
              buttonText={t("cards.card1.button")}
              text={[
                t("cards.card1.text1"),
                t("cards.card1.text2"),
                t("cards.card1.text3"),
                t("cards.card1.text4"),
              ].join(" <br /> ")}
            />
            <Card
              link="/galeria"
              icon={<BsTelephone />}
              title={t("cards.card2.header")}
              buttonText={t("cards.card2.button")}
              text={[
                t("cards.card2.text1"),
                t("cards.card2.text2"),
                t("cards.card2.text3"),
              ].join(" <br /> ")}
            />
            <Card
              link="/zajecia-grupowe"
              icon={<BiSolidParty />}
              title={t("cards.card3.header")}
              buttonText={t("cards.card3.button")}
              text={[
                t("cards.card3.text1"),
                t("cards.card3.text2"),
                t("cards.card3.text3"),
              ].join(" <br /> ")}
            />
            <Card
              link="/restauracja"
              icon={<IoPizzaOutline />}
              title={t("cards.card4.header")}
              buttonText={t("cards.card4.button")}
              text={[
                t("cards.card4.text1"),
                t("cards.card4.text2"),
                t("cards.card4.text3"),
                t("cards.card4.text4"),
              ].join(" <br /> ")}
            />
            <Card
              link="/park"
              icon={<MdOutlineSportsCricket />}
              title={t("cards.card5.header")}
              buttonText={t("cards.card5.button")}
              text={[
                t("cards.card5.text1"),
                t("cards.card5.text2"),
                t("cards.card5.text3"),
              ].join(" <br /> ")}
            />
            <Card
              link="/park/silownia"
              icon={<LuWeight />}
              title={t("cards.card6.header")}
              buttonText={t("cards.card6.button")}
              text={[
                t("cards.card6.text1"),
                t("cards.card6.text2"),
                t("cards.card6.text3"),
              ].join(" <br /> ")}
            />
          </div>
        </section>
      </div>
      <section className="px-6 xl:px-44 pt-0 xl:pt-20 py-20">
        <div className="flex flex-col md:flex-row  gap-8 xl:gap-16">
          <div className=" sm:w-1/2 xl:w-1/3 ">
            <Image
              src="/kontakt.webp"
              width={100}
              height={100}
              layout="responsive"
              alt="Wizytówka Parku Rekreacyjno Sportowego Muszynova z informacjami"
            />
          </div>
          <div className="xl:w-1/2">
            <h2 className="text-4xl font-semibold">{t("form.header")}</h2>
            <Form />
          </div>
        </div>
      </section>
      <Map />
    </>
  );
}
