import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { CiLocationOn } from "react-icons/ci";
import { PiWall } from "react-icons/pi";
import { TbBowling } from "react-icons/tb";

export const metadata = {
  title: "Sala Zabaw Muszynova - Muszyna",
  alternates: {
    canonical: "https://muszynova.pl/park-rekreacyjno-sportowy/sala-zabaw",
  },

  description:
    "Sala Zabaw Muszynova w Muszynie – dla dzieci: małpi gaj, animacje, urodziny, gry. Bezpieczna opieka podczas treningu rodziców – radość i rozwój!",
};

export default function Sala() {
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">Sala Zabaw</h1>
          <p className="mt-10">
            Sala zabaw dla dzieci to przestrzeń stworzona specjalnie dla
            najmłodszych, aby mogły się bawić i spędzać aktywnie czas w
            bezpiecznym otoczeniu. W takiej sali dzieci mają dostęp do
            różnorodnych atrakcji, które zapewniają im radość i zabawę. Mogą
            korzystać z kreatywnych zajęć oraz innych form rozrywki. W sali
            zabaw dba się o to, aby każde dziecko czuło się komfortowo i miało
            możliwość interakcji z innymi rówieśnikami. To doskonałe miejsce,
            gdzie maluchy mogą rozwijać swoje umiejętności społeczne, dzielić
            się z innymi oraz współpracować w grupie.
          </p>
          <div className="mt-10">
            <Button text="O Nas" link="/o-nas" />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/sala-zabaw/s2.webp"
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
            <h3 className="text-4xl font-semibold">
              Ty ćwiczysz a Twoje dziecko bawi się pod okiem naszych opiekunów.
            </h3>
            <p className="mt-10">
              Zorganizuj urodziny w Muszynova. Zapewniamy doskonałe warunki oraz
              dostarczamy szereg atrakcji, aby uczynić ten dzień jeszcze
              bardziej wyjątkowym. Do dyspozycji mamy przestronne sale, idealne
              do organizacji urodzinowego przyjęcia, dekoracje tematyczne oraz
              animatorki. Dla najmłodszych zapewnimy animacje, gry i konkursy.
              Dla starszych dzieci posiadamy bogatą ofertę atrakcji, takich jak
              mini kręgielnia, sala multimedialna czy strefa gier.
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={"Opieka"}
              buttonText={"Kontakt"}
              bgColor="bg-black"
              link="/kontakt"
              text="Podczas gdy Ty skupiasz się na intensywnym treningu, zapewniamy bezpieczną i pełną radości zabawę dla Twojego dziecka. W specjalnie przystosowanej strefie zabaw, pod okiem opiekuna, Twoje dziecko może korzystać z wszelkich atrakcji i bawić się na całego. Dbamy o to, aby każde dziecko czuło się komfortowo i miało możliwość aktywnego spędzania czasu w bezpiecznym otoczeniu."
            />
            <Card
              icon={<TbBowling />}
              title={"Animatorki"}
              buttonText={"Zobacz Restaurację"}
              bgColor="bg-black"
              link="/restauracja"
              text="Nasze animatorki sprawią, że czas maluchów będzie pełen uśmiechu. Organizujemy kreatywne gry, konkursy i zajęcia plastyczne, dostosowane do wieku i zainteresowań dzieciaków. Bezpieczeństwo i dobre samopoczucie dzieci są dla nas priorytetem, dlatego możesz być pewien/a, że Twoje dziecko będzie pod stałą opieką wykwalifikowanych profesjonalistek, które zadbają o każdy detal, by zorganizować dzień pełen pozytywnych wrażeń i radości."
            />
            <Card
              icon={<PiWall />}
              title={"Małpi Gaj"}
              buttonText={"Galeria"}
              bgColor="bg-black"
              link="/galeria"
              text="Jesteśmy nowym miejscem w naszym rejonie, które oferuje nowoczesny małpi gaj dla dzieci. To specjalnie stworzona przestrzeń, w której Wasze pociechy mogą odkrywać, bawić się i rozwijać swoje umiejętności poprzez interakcję z elementami specjalnie dostosowanymi do ich wieku. Nasza innowacyjna koncepcja małpiego gaju to gwarancja, że dzieci będą miały niepowtarzalną okazję do zdobywania nowych umiejętności poprzez zabawę w bezpiecznym i przyjaznym środowisku."
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <Image
            src="/park/sala-zabaw/s1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/sala-zabaw/s2.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/sala-zabaw/s3.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/sala-zabaw/s4.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </section>
      </section>
      <section className="pt-20">
        <Map />
      </section>
    </>
  );
}
