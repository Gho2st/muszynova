import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { CiLocationOn } from "react-icons/ci";
import { FaBicycle } from "react-icons/fa"; // Ikona roweruimport { TbClock24 } from "react-icons/tb";
import { TbClock24 } from "react-icons/tb";

export const metadata = {
  title: "Wypożyczalnia Rowerów Muszynova",
  alternates: {
    canonical:
      "https://muszynova.pl/park-rekreacyjno-sportowy/wypozyczalnia-rowerow",
  },

  description:
    "Wypożyczalnia Rowerów Muszynova w Muszynie – rowery dla każdego, trasy w okolicy, 7 dni w tygodniu. Odkrywaj region aktywnie – sprawdź cennik!",
};

export default function Wypozyczalnia() {
  return (
    <>
      {/* hero */}
      <div className="xl:flex pb-20">
        <div className="xl:w-1/3 px-6 xl:p-16 pt-20 xl:pl-16">
          <h1 className="text-4xl xl:text-6xl font-bold">
            Wypożyczalnia Rowerów
          </h1>
          <p className="mt-10">
            Nasza wypożyczalnia rowerów to idealne miejsce dla miłośników
            aktywności na świeżym powietrzu. Oferujemy szeroki wybór rowerów –
            od miejskich po górskie – dla dzieci i dorosłych. <br></br>{" "}
            <br></br>
            Wypożycz rower i odkrywaj malownicze trasy Muszyny i okolic, ciesząc
            się pięknem natury. To świetny sposób na aktywny wypoczynek dla
            każdego, niezależnie od doświadczenia! <br></br> <br></br>
          </p>
          <div className="mt-10">
            <Button text="Cennik" link={"/cennik"} />
          </div>
        </div>
        <div className="mt-16 xl:mt-0 xl:w-2/3">
          <Image
            src="/park/wypozyczalnia/w1.webp"
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
          <div className="xl:w-1/4 pr-10 xl:mr-2 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold">Wypożyczalnia Rowerów</h3>
            <p className="mt-10">
              W Muszynova oferujemy nowoczesne rowery w doskonałym stanie,
              dostosowane do różnych tras i potrzeb. Wypożycz rower i ruszaj na
              przygodę – od spokojnych przejażdżek po wymagające szlaki górskie.
              <br></br> <br></br> To nie tylko sposób na aktywność, ale także
              okazja do zwiedzania regionu w ekologicznym stylu!
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={"Lokalne trasy"}
              buttonText={"O Nas"}
              link="/o-nas"
              bgColor="bg-black"
              text="Odkrywaj Muszynę i okolice na rowerze – polecamy najlepsze trasy dla początkujących i zaawansowanych rowerzystów!"
            />
            <Card
              icon={<FaBicycle />}
              title={"Szeroki wybór"}
              buttonText={"Cennik"}
              bgColor="bg-black"
              link="/cennik"
              text="Wypożycz rower idealny dla Ciebie – mamy modele miejskie, górskie, dziecięce i akcesoria, jak kaski czy foteliki."
            />
            <Card
              icon={<TbClock24 />}
              title={"7 dni w tygodniu"}
              buttonText={"Kontakt"}
              bgColor="bg-black"
              link="/kontakt"
              text="Nasza wypożyczalnia jest otwarta 7 dni w tygodniu. Zadzwoń na 509 445 000 i ruszaj na rowerową przygodę!"
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/wypozyczalnia/w1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/wypozyczalnia/w2.jpg"
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
