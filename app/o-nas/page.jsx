import Image from "next/image";
import Button from "../UI/Buttons/Button";
import Map from "../UI/Map/Map";
import { CiLocationOn } from "react-icons/ci";
import { MdFoodBank } from "react-icons/md";
import { MdOutlineSportsCricket } from "react-icons/md";
import Card from "../UI/Card";

export const metadata = {
  title: "O Nas - Muszynova: Aktywność i Smaki w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/o-nas",
  },

  description:
    "Muszynova w Muszynie – park rekreacyjny z aktywnościami i restauracja z kuchnią beskidzką. Sport, zabawa i relaks w Beskidzie Sądeckim!",
};

export default function About() {
  return (
    <>
      {/* hero */}
      <div className="xl:flex pb-20">
        <div className="xl:w-1/3 px-6 xl:p-16 pt-20 xl:pl-16">
          <h1 className="text-4xl xl:text-6xl font-bold">
            Czym jest <span className="text-customGold">Muszynova? </span>
          </h1>
          <p className="mt-10">
            Muszynova – nazwa to fantazyjne połączenia lokalizacji „Muszyna” ze
            słowem „nowoczesny” w zapisie międzynarodowym, bo jesteśmy otwarci
            na wszystkich.
          </p>
          <p className="mt-8">
            Tym samym jest to obietnica, zaproszenie do odkrywania znanego
            kurortu niejako „na novo”. W nowym wydaniu, w nowym standardzie, dla
            małych i dużych, zapraszamy lokalnych mieszkańców i turystów,
            indywidualnie i grupowo. Aktywnie, pysznie, bez kompromisów, to
            nasze nove podejście. Nowoczesny Park i Restauracja zapraszają do
            spędzania czasu w Muszynie inaczej, tak jak lubisz Ty.
          </p>
          <p className="mt-8">
            Odkrywaj na nowo świat food i fun, w otoczeniu pięknej przyrody
            Beskidu Sądeckiego.
          </p>
          <div className="mt-10">
            <Button text="Galeria" link="/galeria" />
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
              Co nas wyróżnia?
            </h2>
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row">
          <div className="xl:w-1/4 xl:mr-16 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold">Muszyna</h3>
            <p className="mt-10">
              Muszyna to znana i lubiana miejscowość uzdrowiskowa, która w
              ostatnich latach rozwija się niezwykle dynamicznie, przyciągając
              turystów z różnych stron świata. To urokliwe Uzdrowisko położone w
              otulinie <strong> Beskidu Sądeckiego </strong> zachwyca przyrodą,
              a także wieloma atrakcjami, do których należą m.in ogrody
              sensoryczne, wieloletnie zabytki, szlaki górskie oraz rowerowe a
              także źródła wody mineralnej.
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={"Muszyna - lokalizacja"}
              buttonText={"Kontakt"}
              link="/kontakt"
              bgColor="bg-black"
              text="W ciszy, z widokiem na zieleń lasów, tuż przy szlaku, z szumem
                rzeki Poprad w oddali. Tak spędzisz u nas czas, to nova jakość
                wnętrza, ale i piękne otoczenie Beskidu."
            />
            <Card
              icon={<MdFoodBank />}
              title={"Food – restauracja"}
              buttonText={"Restauracja"}
              link="/restauracja"
              bgColor="bg-black"
              text="Krótka karta dań w novoczesnym wydaniu z beskidzką nutą. Lekko,
                odżywczo, dla dzieci i dla dorosłych. Pyszna kawa, drinki, a dla
                dzieci znane i lubiane pizze, desery w zdrowszym wydaniu. Z nami
                także urządzisz uroczystości z atrakcjami."
            />
            <Card
              icon={<MdOutlineSportsCricket />}
              title={"Fun - sport i rozrywka"}
              buttonText={"Park Rekreacyjno Sportowy"}
              link="/park-rekreacyjno-sportowy"
              bgColor="bg-black"
              text="Aktywne spędzanie wolnego czasu na novo, z frajdą. Zachęcamy do
                ruchu od najmłodszych lat, jesteśmy do tego przygotowani. Cztery
                nowocześnie wyposażone strefy aktywności wraz z zapleczem
                czekają na sportowców zawodowych, juniorów, rodziny i
                użytkowników indywidualnych."
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
