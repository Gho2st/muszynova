import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineSportsTennis } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";

export const metadata = {
  title: "Squash Muszynova - Kort w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/park-rekreacyjno-sportowy/squash",
  },

  description:
    "Squash w Muszynova – jedyny profesjonalny kort w Muszynie. Graj 7 dni w tygodniu, rezerwuj online, popraw kondycję i ciesz się dynamiczną grą!",
};

export default function Squash() {
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">Squash </h1>
          <p className="mt-10">
            Nasza sala squash to miejsce, gdzie pasjonaci tego dynamicznego
            sportu znajdą wszystko, czego potrzebują do ekscytującej rozgrywki.{" "}
            <br></br> <br></br>
            Wyposażona w profesjonalny kort, nasza sala stworzona jest zarówno
            dla doświadczonych graczy, jak i dla tych, którzy dopiero zaczynają
            swoją przygodę ze squashem.<br></br> <br></br> Przyjdź, zanurz się w
            intensywnym tempie gry w squash’a i doświadczaj niezapomnianych
            emocji!
          </p>
          <div className="mt-10">
            <Button text="Cennik" link={"/cennik"} />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/squash/s1.webp"
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
            <h3 className="text-4xl font-semibold">Squash</h3>
            <p className="mt-10">
              Przyjmij wyzwanie i spróbuj swoich sił w squashu – dynamicznej i
              coraz bardziej popularnej dyscyplinie sportowej, która wywodzi się
              z tenisa. To intensywna gra, która dostarcza adrenaliny, ale
              pozwala również poprawić sprawność ruchową i kondycję. <br></br>
              <br></br> To nie tylko efektywny trening kondycyjny, ale także
              doskonała okazja do spalenia dużej ilości kalorii. Grając w
              squash’a nie tylko dobrze się bawisz ale aktywnie dbasz o swoje
              zdrowie i kondycję fizyczną.
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={"Jedyna w okolicy"}
              buttonText={"O Nas"}
              link="o-nas"
              bgColor="bg-black"
              text="Wyjątkowa sala do squash’a, zapewniająca niezapomniane wrażenia. Jedyna tego typu przestrzeń w Muszynie i okolicy!"
            />
            <Card
              icon={<MdOutlineSportsTennis />}
              title={"Rezerwacja online"}
              buttonText={"Rezerwuj"}
              bgColor="bg-black"
              link="https://muszynova.oos.pl/reservations"
              text="Zarezerwuj swój kort do squash’a, dzięki rezerwacji online zaledwie kilkoma kliknięciami, oszczędzając czas."
            />
            <Card
              icon={<TbClock24 />}
              title={"7 dni w tygodniu"}
              buttonText={"Kontakt"}
              bgColor="bg-black"
              link="/kontakt"
              text="Zapraszamy do korzystania z naszej sali squash 7 dni w tygodniu. Zadzwoń pod numer 509 445 000 lub zarezerwuj online."
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/squash/s1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/squash/s2.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/squash/s3.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/squash/s4.webp"
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
