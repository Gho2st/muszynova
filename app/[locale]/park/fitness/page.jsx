import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { GiKidSlide } from "react-icons/gi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdSportsGymnastics } from "react-icons/md";

export const metadata = {
  title: "Fitness Muszynova - Zajęcia w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/park/fitness",
  },

  description:
    "Fitness w Muszynova – zajęcia dla dzieci i dorosłych w Muszynie. Treningi personalne, grupowe, pilates – popraw kondycję i ciesz się ruchem!",
};

export default function Fitness() {
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">Fitness </h1>
          <p className="mt-10">
            Zajęcia fitness w Parku Muszynova zostały stworzone z myślą o
            zdrowiu, dobrej kondycji i radości z aktywności fizycznej. Bez
            względu na poziom zaawansowania, wiek czy cel treningowy, mamy coś
            dla każdego. <br></br>
            <br></br> Nasi instruktorzy są gotowi poprowadzić Cię przez
            różnorodne formy aktywności, począwszy od energetycznych zajęć o
            wysokiej intensywności po statyczne, relaksujące sesje pilatesu.
          </p>
          <div className="mt-10">
            <Button text="Zajęcia Grupowe" link="/zajecia-grupowe" />
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
          <div className="xl:w-3/5 flex justify-center items-center">
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
            <h3 className="text-4xl font-semibold">Zajęcia Fitness</h3>
            <p className="mt-10">
              Instruktorzy fitness oferują nam treningi różniące się od siebie
              intensywnością, wykorzystaniem dodatkowego obciążenia czy innego
              sprzętu. Rodzaj treningu, w zależności od tego, czy chcemy
              poprawić swoją wydolność, czy skupić się na rozbudowaniu i
              zwiększeniu siły mięśni, możemy wybrać samodzielnie. Poza
              spalaniem kalorii i ogólnym wzmocnieniem ciała, fitness to przede
              wszystkim dobra zabawa!
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<GiKidSlide />}
              title={"Zajęcia Kids"}
              buttonText={"Sala Zabaw"}
              link="/park-rekreacyjno-sportowy/sala-zabaw"
              bgColor="bg-black"
              text="Zapraszamy najmłodszych do wspólnego odkrywania radości z ruchu i zdrowego stylu życia w Muszynova. Nasze zajęcia dla dzieci rozwijają sprawność fizyczną oraz kształtują pozytywne nawyki, które będą korzystne dla ich zdrowia i dobrej kondycji w przyszłości."
            />
            <Card
              icon={<MdOutlinePeopleAlt />}
              title={"Zajęcia dla dorosłych"}
              buttonText={"Cennik"}
              link="/cennik"
              bgColor="bg-black"
              text="Dla naszych dorosłych uczestników, w Muszynova przygotowaliśmy różnorodne i dostosowane do różnych poziomów zaawansowania zajęcia fitness, które pomogą w utrzymaniu dobrej formy fizycznej, ale także staną się chwilą relaksu i ucieczki od codziennego stresu..."
            />
            <Card
              icon={<MdSportsGymnastics />}
              title={"Treningi indywidualne"}
              buttonText={"Kontakt"}
              bgColor="bg-black"
              link="/kontakt"
              text="Nasi doświadczeni trenerzy personalni pracują z każdym klientem, dostosowując plan treningowy do indywidualnych potrzeb, umiejętności i ambicji. Treningi indywidualne pozwalają skupić się na konkretnej dziedzinie, takiej jak poprawa siły, redukcja wagi, zwiększenie elastyczności czy też ogólne polepszenie sprawności."
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
