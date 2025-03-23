import Image from "next/image";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { BsTelephone } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { IoGitNetworkOutline } from "react-icons/io5";
import Button from "@/app/UI/Buttons/Button";

export const metadata = {
  title: "Siłownia Muszynova - Treningi i Karnety w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/park-rekreacyjno-sportowy/silownia",
  },

  description:
    "Siłownia Muszynova w Muszynie – nowoczesny sprzęt, trenerzy personalni, plany treningowe i karnety. Popraw kondycję i osiągnij cele fitness!",
};

export default function Silownia() {
  return (
    <>
      {/* hero */}
      <div className="xl:flex pb-20">
        <div className="xl:w-1/3 px-6 xl:p-16 pt-20 xl:pl-16">
          <h1 className="text-4xl xl:text-6xl font-bold">Siłownia</h1>
          <p className="mt-10">
            Jeżeli pragniesz skutecznie poprawić swoją kondycję i osiągnąć formę
            przy wsparciu wykwalifikowanej kadry, to nasza siłownia w Muszynie
            jest idealnym miejscem dla Ciebie. <br></br> <br></br> Znajdziesz w
            niej wysokiej jakości sprzęt – atestowany i bezpieczny dla
            użytkowników. W zależności od planu treningowego i upodobań dostępna
            jest strefa wolnych ciężarów, strefa z maszynami oraz strefa cardio.
          </p>
          <div className="mt-10">
            <Button
              link="https://muszynova.oos.pl/customer/login"
              text="Zakup Karnetu"
            />
          </div>
        </div>
        <div className="mt-16 xl:mt-0 xl:w-2/3">
          <Image
            src="/park/silownia/s1.webp"
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
            <h3 className="text-4xl font-semibold">Siłownia</h3>
            <p className="mt-10">
              Oferujemy dostęp do nowoczesnych urządzeń, ale także zatrudniamy
              doświadczonych trenerów, którzy są gotowi dostosować plan
              treningowy specjalnie do Twoich potrzeb. Dzięki temu
              spersonalizowanemu podejściu oraz fachowej wiedzy naszego
              personelu, z łatwością osiągniesz pożądane rezultaty. Wierzymy, że
              wspólnie możemy stworzyć plan, który spełni Twoje oczekiwania i
              dostarczy Ci motywacji do systematycznych treningów i utrzymania
              zdrowego stylu życia.
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<BsTelephone />}
              title={"Konsultacja"}
              buttonText={"Kontakt"}
              link={"/kontakt"}
              bgColor="bg-black"
              text="Jeżeli nie wiesz jak zacząć, Nasi doświadczeni trenerzy przeprowadzą z Tobą konsultację, dokładnie analizując Twoje cele, historię treningową oraz ewentualne ograniczenia fizyczne. Pokażą Ci, jak prawidłowo korzystać ze wszystkich dostępnych sprzętów."
            />
            <Card
              icon={<CiCalendar />}
              title={"Plan Treningowy"}
              buttonText={"Zajęcia Grupowe"}
              link={"/zajecia-grupowe"}
              bgColor="bg-black"
              text="Trenerzy mogą ułożyć dla Ciebie spersonalizowany plan treningowy, dostosowany do Twoich indywidualnych potrzeb i celów. Zapewnią kompleksowe podejście, uwzględniając zarówno Twoje obecne umiejętności, jak i aspiracje fitnessowe, abyś mógł osiągnąć optymalne rezultaty."
            />
            <Card
              icon={<IoGitNetworkOutline />}
              title={"Trening Personalny"}
              buttonText={"O Nas"}
              link={"/o-nas"}
              bgColor="bg-black"
              text="Oferujemy również treningi personalne, podczas których trener osobiście wyjaśni jak prawidłowo wykonywać każde ćwiczenie. Dzięki temu spersonalizowanemu podejściu, trening stanie się jeszcze bardziej efektywny, a Ty zdobędziesz szczegółowe wskazówki dotyczące techniki, intensywności i progresji."
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <Image
            src="/park/silownia/s1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/silownia/s2.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/silownia/s3.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/silownia/s4.webp"
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
