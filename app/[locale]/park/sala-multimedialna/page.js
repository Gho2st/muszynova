import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { BsHeadsetVr } from "react-icons/bs";
import { FaPlaystation } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";

export const metadata = {
  title: "Sala Multimedialna Muszynova – Nowoczesna Rozrywka w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/park/sala-multimedialna",
  },

  description:
    "Odkryj nowoczesną Salę Multimedialną w Muszynovej! Interaktywne gry, wirtualna rzeczywistość i niezapomniana rozrywka dla całej rodziny. Sprawdź, co na Ciebie czeka!",
};

export default function Multi() {
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">Sala Multimedialna</h1>
          <p className="mt-10">
            Serce naszej sali multimedialnej stanowi najnowsze PlayStation,
            gdzie zapewniamy dostęp do najlepszych gier i rozrywek dla fanów
            konsolowej zabawy. <br></br>
            <br></br> Od ekscytujących przygód po emocjonujące rozgrywki
            sportowe, każdy znajdzie coś dla siebie. A to wszystko na wygodnych
            pufach, które stwarzają idealne warunki do zanurzenia się w świat
            wirtualnej rozrywki.
          </p>
          <div className="mt-10">
            <Button text="Cennik" link="/cennik" />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/sala-multimedialna/1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt="obrazek przedstawiający chłopca grającego na playstation przed telewizorem w Muszynova"
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
            <h3 className="text-4xl font-semibold">Sala Multimedialna</h3>
            <p className="mt-10">
              Wyposażona w konsolę PlayStation oraz system wirtualnej
              rzeczywistości (VR), sala multimedialna to miejsce, gdzie gracze
              mogą zanurzyć się w fascynujące światy wirtualne. <br></br>{" "}
              <br></br> Bez względu na to, czy ktoś preferuje dynamiczne gry
              akcji czy też eksploracyjne przygody w VR, nasza sala umożliwia
              pełną swobodę wyboru rozrywki.
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<FaPlaystation />}
              title={"PlayStation"}
              buttonText={"Kontakt"}
              link="/kontakt"
              bgColor="bg-black"
              text="Zapraszamy Cię do naszej nowoczesnej sali multimedialnej, gdzie świat PlayStation staje się prawdziwą przygodą! Czekają na Ciebie najnowsze gry, niezapomniane emocje i niezrównane doznania w świecie wirtualnej rozrywki."
            />
            <Card
              icon={<BsHeadsetVr />}
              title={"VR"}
              link=""
              buttonText={"Kontakt"}
              bgColor="bg-black"
              text="Zapraszamy Cię do odkrycia nowego wymiaru rozrywki w naszej wyjątkowej sali multimedialnej z wirtualną rzeczywistością (VR). To miejsce, gdzie granice rzeczywistości zlewają się z fantazją, tworząc niezapomniane doświadczenia."
            />
            <Card
              icon={<FaBirthdayCake />}
              title={"Urodziny"}
              buttonText={"Kontakt"}
              link=""
              bgColor="bg-black"
              text="Zaplanuj wyjątkowe urodziny w naszej fantastycznej sali multimedialnej, gdzie każdy moment staje się niezapomnianą przygodą! Nie musisz się martwić o organizację – nasz zespół zadba o każdy detal, abyś mógł skoncentrować się wyłącznie na cieszeniu się chwilą."
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/sala-multimedialna/1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/sala-multimedialna/s2.webp"
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
