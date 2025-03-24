import { MdOutlineSportsCricket } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidParty } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { IoPizzaOutline } from "react-icons/io5";
import { LuWeight } from "react-icons/lu";

import Image from "next/image";
import Map from "../UI/Map/Map";
import Card from "../UI/Card";
import Form from "./form";
export default function Contact() {
  return (
    <>
      <div className="px-6 xl:px-44 py-16 xl:py-20">
        <h1 className="text-center text-5xl xl:text-6xl text-customGold font-bold mb-20">
          Skontakuj się z nami!
        </h1>
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card
              link="/o-nas"
              icon={<CiLocationOn />}
              title={"Adres"}
              buttonText={"O Nas"}
              text="33-370 Muszyna Złockie 77c <br></br> Właścicielem obiektu jest:
                <br></br>
                Firma Handlowa Mikulec <br></br> NIP 7341518138"
            />
            <Card
              link="/galeria"
              icon={<BsTelephone />}
              title={"Recepcja"}
              buttonText={"Galeria"}
              text="biuro@muszynova.pl +48 509 445 000 <br></br> Park Muszynova +48
                509 825 000 <br></br>
                Restauracja Muszynova"
            />
            <Card
              link="/zajecia-grupowe"
              icon={<BiSolidParty />}
              title={"Rezerwacje grupowe, imprezy okolicznościowe"}
              buttonText={"Zajęcia Grupowe"}
              text="Grzegorz Ziółko, <br></br>Manager manager@muszynova.pl <br></br>
                tel.: +48 509 445 000"
            />
            <Card
              link="/restauracja"
              icon={<IoPizzaOutline />}
              title={"Restauracja Muszynova"}
              buttonText={"Restauracja"}
              text=" Godziny Otwarcia <br></br> Poniedziałek - Środa NIECZYNNE
                <br></br> Czwartek - Piątek 12:00 - 20:00<br></br>Sobota -
                Niedziela 12:00 - 21:00"
            />
            <Card
              link="/park-rekreacyjno-sportowy"
              icon={<MdOutlineSportsCricket />}
              title={"Park Muszynova"}
              buttonText={"Park Rekreacyjno Sportowy"}
              text="Godziny Otwarcia <br></br> Poniedziałek - Piątek 16:00 - 20:00
                <br></br> Sobota - Niedziela 11:00 - 21:00"
            />
            <Card
              link="/park-rekreacyjno-sportowy/silownia"
              icon={<LuWeight />}
              title={"Siłownia"}
              buttonText={"Siłownia"}
              text="Godziny Otwarcia <br></br> Poniedziałek - Piątek 8:00 - 20:00
                <br></br> Sobota - Niedziela 11:00 - 21:00"
            />
          </div>
        </section>
      </div>
      <section className="px-6 xl:px-44 pt-0 xl:pt-20 py-20">
        <div className="flex flex-col md:flex-row  gap-8 xl:gap-16">
          <div className=" sm:w-1/2 xl:w-1/3 ">
            <Image
              src="/kontakt.webp"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="xl:w-1/2">
            <h2 className="text-4xl font-semibold">Formularz kontaktowy</h2>
            <Form />
          </div>
        </div>
      </section>
      <Map />
    </>
  );
}
