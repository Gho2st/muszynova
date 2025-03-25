import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { MdSportsGymnastics } from "react-icons/md";
import { PiWall } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";

export const metadata = {
  title: "Ścianka Wspinaczkowa Muszynova",
  alternates: {
    canonical:
      "https://muszynova.pl/park-rekreacyjno-sportowy/scianka-wspinaczkowa",
  },

  description:
    "Ścianka Wspinaczkowa Muszynova w Muszynie – bezpieczne zajęcia grupowe, indywidualne, dla szkół. Wspinaczka dla dzieci i dorosłych na każdym poziomie!",
};

export default function Scianka() {
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">
            Ścianka Wspinaczkowa
          </h1>
          <p className="mt-10">
            Ścianka wspinaczkowa to idealna aktywność dostępna przez cały rok.
            Inspiruje do zdobywania nowych wysokości i pokonywania własnych
            ograniczeń. <br></br> <br></br> Nasza ścianka wspinaczkowa oferuje
            niezapomniane doświadczenia dla wspinaczy o różnym stopniu
            zaawansowania, zarówno dla tych, którzy zaczynają swoją przygodę ze
            wspinaczką, jak i dla doświadczonych entuzjastów.
          </p>
          <div className="mt-10">
            <Button
              text="Zarezerwuj"
              link={"https://muszynova.oos.pl/reservations"}
            />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/scianka-wspinaczkowa/s2.webp"
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
            <h3 className="text-4xl font-semibold">Ścianka Wspinaczkowa</h3>
            <p className="mt-10">
              Bezpieczeństwo jest u nas priorytetem. Solidna konstrukcja ściany
              oraz profesjonalne zabezpieczenia sprawiają, że każdy wspinacz
              może skupić się na zdobywaniu kolejnych metrów bez obaw o swoje
              bezpieczeństwo. <br></br> <br></br> Nasza ścianka wspinaczkowa
              oferuje różnorodne trasy, dopasowane do umiejętności i
              doświadczenia każdego wspinacza.
            </p>
          </div>
          <div className="xl:w-3/4 grid md:grid-cols-2 xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<FaPeopleGroup />}
              title={"Zajęcia grupowe"}
              buttonText={"Zajęcia Grupowe"}
              link="/zajecia-grupowe"
              bgColor="bg-black"
              text="Zapraszamy do udziału w naszych zajęciach grupowych na ściance wspinaczkowej. Nasze zajęcia stworzone są z myślą o różnych poziomach zaawansowania, dostosowując się do umiejętności i doświadczenia każdego uczestnika."
            />
            <Card
              icon={<MdSportsGymnastics />}
              title={"Zajęcia indywidualne"}
              buttonText={"Cennik"}
              link="/cennik"
              bgColor="bg-black"
              text="Nasi doświadczeni instruktorzy dostosują program zajęć do Twojego poziomu zaawansowania, indywidualnych celów oraz tempa nauki. Dzięki temu będziesz mógł skupić się na konkretnych aspektach wspinaczki, które są dla Ciebie najważniejsze. To także idealna opcja dla tych, którzy cenią sobie prywatność i chcą skoncentrować się na własnym postępie."
            />
            <Card
              icon={<PiWall />}
              title={"Oferta dla szkół i grup"}
              buttonText={"Kontakt"}
              link="/kontakt"
              bgColor="bg-black"
              text="Dla szkół oferujemy edukacyjne zajęcia, gdzie uczniowie mogą zdobywać umiejętności wspinaczkowe pod czujnym okiem doświadczonych instruktorów. To doskonała okazja do rozwijania sprawności fizycznej, kształtowania umiejętności team worku i budowania pewności siebie."
            />
          </div>
        </div>
        <section className="grid md:grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/scianka-wspinaczkowa/s1.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/scianka-wspinaczkowa/s2.webp"
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
