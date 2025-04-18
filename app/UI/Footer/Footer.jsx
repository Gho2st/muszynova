"use client";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showArrow, setShowArrow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations("footer");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Sprawdzamy, czy jesteśmy na dole strony
      const isAtBottom = currentScrollY + windowHeight >= documentHeight - 10; // -10 dla marginesu błędu

      // Pokazuj strzałkę, gdy przewijamy w górę lub jesteśmy na dole
      if ((currentScrollY < lastScrollY && currentScrollY > 50) || isAtBottom) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Czyszczenie listenera przy odmontowaniu komponentu
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <footer className="px-6 bg-customGreen text-white">
      <div className="flex flex-col gap-10 xl:gap-16 items-center justify-center z-10">
        <h2 className="text-3xl xl:text-4xl text-center font-bold mt-14 xl:mt-20">
          {t("header")}
        </h2>

        <div className="h-1 w-2/5 bg-customGold mb-4 xl:mb-10"></div>
        <ul className="flex flex-col xl:flex-row text-center gap-4 xl:gap-20 xl:text-lg">
          <li>
            <span className="text-customGold font-semibold">
              {t("info.info1.address")}:{" "}
            </span>
            {t("info.info1.text")}
          </li>
          <li>
            <span className="text-customGold font-semibold">
              {t("info.info2.address")}:{" "}
            </span>
            <Link
              className="hover:text-neutral-400 transition-all duration-500 underline"
              href={"tel:48509445000"}
            >
              +48 509 445 000{" "}
            </Link>
          </li>
          <li>
            <span className="text-customGold font-semibold">
              {t("info.info3.address")}:{" "}
            </span>
            biuro@muszynova.pl
          </li>
          <li>
            <span className="text-customGold font-semibold">
              {t("info.info4.address")}:{" "}
            </span>
            <Link className="underline" href="/kontakt">{t("info.info4.text")}</Link>
          </li>
        </ul>
        <div className="">
          <h3 className="text-xl text-center">{t("social")}</h3>
          <div className="flex mt-5 justify-center gap-5 text-xl">
            <Link
              href={"https://www.facebook.com/Parkmuszynova"}
              className="border-2 border-yellow-500 transition-all duration-200 hover:scale-110 p-2 rounded-2xl"
            >
              <FaFacebookF className="text-customGold" />
            </Link>
            <Link
              href={"https://www.instagram.com/muszynova/"}
              className="border-2 border-yellow-500 transition-all duration-200 hover:scale-110 p-2 rounded-2xl"
            >
              <FaInstagram className="text-customGold" />
            </Link>
            <Link
              href={"https://g.co/kgs/YAoG1YE"}
              className="border-2 border-yellow-500 transition-all duration-200 hover:scale-110 p-2 rounded-2xl"
            >
              <IoLogoGoogle className="text-customGold" />
            </Link>
            <Link
              href={"https://www.tiktok.com/@park.muszynova"}
              className="border-2 border-yellow-500 transition-all duration-200 hover:scale-110 p-2 rounded-2xl"
            >
              <FaTiktok className="text-customGold" />
            </Link>
          </div>
        </div>
        <span className="mb-20">
          © {currentYear} Muszynova &{" "}
          <Link
            className="hover:text-green-500 transition-all duration-500 font-bold"
            href={"https://www.domiweb.pl/"}
          >
            Domiweb
          </Link>
        </span>
      </div>
      {showArrow && (
        <span className="fixed bg-[#C4966C] shadow-2xl rounded-lg p-1 text-4xl text-white bottom-6 right-6 xl:bottom-16 xl:right-10 z-10">
          <IoIosArrowUp onClick={scrollToTop} className="cursor-pointer" />
        </span>
      )}
    </footer>
  );
}
