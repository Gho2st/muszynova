"use client";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="relative bg-cover bg-center text-white ">
      <div
        className="relative min-h-[80vh] xl:h-132 bg-cover bg-center z-1 opacity-[0.09] "
        style={{
          backgroundImage: "url('/tlo.png')",
          backgroundSize: "50%", // Zmniejsza tło do 50% oryginalnego rozmiaru
          backgroundPosition: "center", // Upewnia się, że tło jest wyśrodkowane
        }}
      ></div>
      {/* Lekko zielona warstwa */}
      <div className="absolute inset-0 bg-[#13322B]   "></div>
      {/* jasniejsza wersja #1D493E */}
      {/* Tekst na wierzchu */}
      <div className="absolute inset-0 flex flex-col gap-16 items-center justify-center z-10">
        <span className=" text-4xl font-bold mt-20 mb-10 ">Porozmawiajmy</span>
        <ul className="flex flex-col xl:flex-row text-center gap-4 xl:gap-20 text-lg">
          <li>
            <span className="text-customGold font-semibold">Adres: </span>
            33-370 Muszyna Złockie 77c
          </li>
          <li>
            <span className="text-customGold font-semibold">Telefon: </span>
            <Link href={"tel:48509445000"}>+48 509 445 000 </Link>
          </li>
          <li>
            <span className="text-customGold font-semibold">Email: </span>
            biuro@muszynova.pl
          </li>
          <li>
            <span className="text-customGold font-semibold">Otwarte: </span>{" "}
            11:00 - 21:00
          </li>
        </ul>
        <div className="">
          <h3 className="text-xl">Nasze Social Media</h3>
          <div className="flex mt-5 justify-center gap-5 text-xl">
            <div className="border-2 border-yellow-500 p-2 rounded-2xl">
              <FaFacebookF className="text-customGold" />
            </div>
            <div className="border-2 border-yellow-500 p-2 rounded-2xl">
              <FaInstagram className="text-customGold" />
            </div>
            <div className="border-2 border-yellow-500 p-2 rounded-2xl">
              <FaGoogle className="text-customGold" />
            </div>
          </div>
        </div>
        <span className="mb-20">
          © {currentYear} Muszynova | Realizacja:{" "}
          <Link
            className="hover:text-green-500 font-bold"
            href={"https://www.domiweb.pl/"}
          >
            {" "}
            Domiweb
          </Link>
        </span>
      </div>
      <span className="absolute bg-[#C4966C] rounded-lg p-1 text-4xl text-black bottom-32 right-6 xl:bottom-16 xl:right-10 z-10">
        <IoIosArrowUp onClick={scrollToTop} className="cursor-pointer" />
      </span>
    </footer>
  );
}
