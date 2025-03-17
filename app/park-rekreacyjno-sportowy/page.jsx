import Image from "next/image";
import Button from "../UI/Buttons/Button";
import Map from "../UI/Map/Map";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineSportsCricket } from "react-icons/md";
import { IoIosFitness } from "react-icons/io";
import { IoFitnessOutline } from "react-icons/io5";
import { PiPersonSimpleBike } from "react-icons/pi";
import { PiPingPong } from "react-icons/pi";
import { GiKidSlide } from "react-icons/gi";
import { PiWall } from "react-icons/pi";
import { TbBowling } from "react-icons/tb";
import Card from "../UI/Card";

export const metadata = {
  title: "Park Rekreacyjno-Sportowy Muszynova - Aktywność w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/park-rekreacyjno-sportowy",
  },

  description:
    "Park Rekreacyjno-Sportowy Muszynova w Muszynie – siłownia, fitness, squash, rowery, hala sportowa, sala zabaw. Rozrywka i sport dla każdego!",
};

export default function Park() {
  return (
    <>
      {/* hero */}
      <div className="xl:flex pb-20">
        <div className="xl:w-1/3 px-6 xl:p-16 pt-20 xl:pl-16">
          <h1 className="text-4xl xl:text-6xl font-bold">
            Park rekreacyjno-sportowy
          </h1>
          <p className="mt-10">
            Aktywność to dla nas różnorodność. Tak, aby każdy czerpał z niej
            fun, dobrze spędzał czas, tak jak lubi, niezależnie od poziomu
            zaawansowania, czy też dyscypliny sportowej. Jesteśmy przygotowani
            na rozrywkę, jak i wyciskanie siódmych potów. Przez małych i dużych,
            amatorów i zawodowców. Profesjonalne sprzęty, nowoczesne zaplecze w
            pięknym wnętrzu – to wszystko czeka na Ciebie w Muszynova. A Ty
            odkrywaj!
          </p>
          <div className="mt-10">
            <Button text="Czytaj Więcej" link="/o-nas" />
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
          <div className="xl:w-1/4 pr-10 xl:mr-2 mt-20 xl:mt-0">
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
              title={"Hala sportowa"}
              buttonText={"Hala Sportowa"}
              link="/park-rekreacyjno-sportowy/hala-sportowa"
              bgColor="bg-black"
              text="z certyfikowaną, wielowarstwową nawierzchnią sportową Gerflor Teraflex. Zapraszamy do gry w sporty zespołowe: piłkę nożną halową, siatkówkę, koszykówkę, piłkę ręczną oraz badmintona, a także gimnastykę."
            />
            <Card
              icon={<TbBowling />}
              title={"Mini kręgielnia"}
              buttonText={"Mini Kręgielnia"}
              link="/park-rekreacyjno-sportowy/mini-kregielnia"
              bgColor="bg-black"
              text="wyposażona w dwa tory do gry. W pomieszczeniu kręgielni zadbaliśmy również o strefę relaksu dla użytkowników oczekujących na rozpoczęcie gry."
            />
            <Card
              icon={<PiWall />}
              title={"Ścianka wspinaczkowa"}
              buttonText={"Ścianka wspinaczkowa"}
              link="/park-rekreacyjno-sportowy/scianka-wspinaczkowa"
              bgColor="bg-black"
              text="przewidziana zarówno dla amatorów, jak i profesjonalistów. Nasza konstrukcja to nowoczesna przestrzeń z bryłami geometrycznymi i uwypukleniami o powierzchni 90 m². Gabaryty ścianki pozwalają na korzystanie z niej trzech osób równocześnie. Posiada 6 punktów asekuracji górnej, 18 punktów asekuracji indywidualnej."
            />
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row mt-10">
          <div className="grid xl:grid-cols-4 gap-5 text-white">
            <Card
              icon={<GiKidSlide />}
              title={"Sala zabaw dla dzieci "}
              buttonText={"Sala Zabaw"}
              link="/park-rekreacyjno-sportowy/sala-zabaw"
              bgColor="bg-black"
              text="wyposażona w konstrukcje zabawową, w której na dzieci czekają liczne atrakcje: labirynty, tunele, drabinki, zjeżdżalnia, piłeczki. Ponadto w sali zabaw wydzielona została strefa malucha zaopatrzona w miękkie pufy, basen z kulkami oraz tablice manipulacyjno – sensoryczne pozwalające najmłodszym zarówno na zabawę jak i naukę."
            />
            <Card
              icon={<MdOutlineSportsCricket />}
              title={"Sala do squasha"}
              buttonText={"Squash"}
              link="/park-rekreacyjno-sportowy/squash"
              bgColor="bg-black"
              text="wykonaną zgodnie z wytycznymi WSF (Światowa Federacja Squasha). Korty zostały przygotowane w sposób pozwalający zarówno na zespołową rywalizację jak również na relaks poprzez trening indywidualny."
            />
            <Card
              icon={<PiPersonSimpleBike />}
              title={"Wypożyczalnia rowerów"}
              buttonText={"Wypożyczalnia rowerów"}
              link="/park-rekreacyjno-sportowy/wypozyczalnia-rowerow"
              bgColor="bg-black"
              text="z przekrojowym zestawem rowerów oraz akcesoriów dla dzieci i dorosłych preferujących spędzanie czasu na świeżym powietrzu. Znajdziesz w niej rowery męskie, damskie i dziecięce, a także osprzęt niezbędny do bezpiecznej jazdy."
            />
            <Card
              icon={<PiPingPong />}
              title={"Sala do tenisa stołowego"}
              buttonText={"Sala Gier"}
              link="/park-rekreacyjno-sportowy/sala-gier"
              bgColor="bg-black"
              text="wyposażonego w dwa stoły do ulubionej dyscypliny małych i dużych, czyli popularnej gry w ping ponga. Atrakcja przeznaczona jest dla osób w różnym przedziale wiekowym."
            />
            <Card
              icon={<IoIosFitness />}
              title={"Siłownia"}
              buttonText={"Siłownia"}
              link="/park-rekreacyjno-sportowy/silownia"
              bgColor="bg-black"
              text="pozwala na przeprowadzenie kompleksowego treningu obwodowego. Znajdziesz w niej wysokiej jakości sprzęt – atestowany i bezpieczny dla użytkowników. Strefa cardio to bieżnie, rowery treningowe elektromagnetyczne, ergometry wioślarskie, orbitreki elektromagnetyczne, steppery."
            />
            <Card
              icon={<IoFitnessOutline />}
              title={"Sala Fitness"}
              buttonText={"Sala Fitness"}
              link="/park-rekreacyjno-sportowy/fitness"
              bgColor="bg-black"
              text="Sala fitness umożliwia przeprowadzenie kompleksowego treningu obwodowego i cardio. Wyposażona w bieżnie, rowery treningowe elektromagnetyczne, ergometry wioślarskie, orbitreki elektromagnetyczne oraz steppery – wszystko dla Twojej kondycji i zdrowia."
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
