import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { GiKidSlide } from "react-icons/gi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdSportsGymnastics } from "react-icons/md";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Fitness Muszynova - Zajęcia w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/park/fitness",
  },

  description:
    "Fitness w Muszynova – zajęcia dla dzieci i dorosłych w Muszynie. Treningi personalne, grupowe, pilates – popraw kondycję i ciesz się ruchem!",
};

export default function Fitness() {
  const t = useTranslations("fitness");

  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold"> {t("header")}</h1>
          <p className="mt-10">
            {t("text1")} <br></br>
            <br></br> {t("text2")}
          </p>
          <div className="mt-10">
            <Button text={t("button")} link="/zajecia-grupowe" />
          </div>
        </div>
        <div className="mt-16 xl:mt-0 xl:w-2/3">
          <Image
            src="/park/fitness/f2.webp"
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
          <div className="xl:w-1/4 pr-10 xl:mr-2 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold"> {t("cards.header")}</h3>
            <p className="mt-10">{t("cards.text")}</p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<GiKidSlide />}
              title={t("cards.card1.header")}
              buttonText={t("cards.card1.button")}
              link="/park-rekreacyjno-sportowy/sala-zabaw"
              bgColor="bg-black"
              text={t("cards.card3.text")}
            />
            <Card
              icon={<MdOutlinePeopleAlt />}
              title={t("cards.card2.header")}
              buttonText={t("cards.card2.button")}
              link="/cennik"
              bgColor="bg-black"
              text={t("cards.card2.text")}
            />
            <Card
              icon={<MdSportsGymnastics />}
              title={t("cards.card3.header")}
              buttonText={t("cards.card3.button")}
              bgColor="bg-black"
              link="/kontakt"
              text={t("cards.card3.text")}
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/fitness/f1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/fitness/f2.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/fitness/f3.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/fitness/f4.webp"
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
