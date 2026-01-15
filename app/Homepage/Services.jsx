"use client";

import { useTranslations } from "next-intl";
import Button from "../UI/Buttons/Button";

// Import Ikon
import { PiWall } from "react-icons/pi";
import { GiThrowingBall, GiBowlingStrike, GiKidSlide } from "react-icons/gi";
import { MdOutlineSportsCricket, MdOutlinePedalBike } from "react-icons/md";
import { IoGameController, IoFitness } from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { FaBusinessTime } from "react-icons/fa6";
import { TbMassage } from "react-icons/tb";

// 1. Komponent elementu listy (Ikona + Tekst)
const ListItem = ({ Icon, text }) => (
  <li className="flex items-center gap-3 sm:gap-4 lg:gap-5 p-2 sm:p-3 rounded-2xl transition-colors duration-300 hover:bg-white/5 group/item">
    {/* Kontener ikony: Mniejszy na mobile, większy na desktop */}
    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#C4966C]/10 border border-[#C4966C]/20 text-[#C4966C] flex items-center justify-center shadow-[0_0_15px_-3px_rgba(196,150,108,0.1)] group-hover/item:shadow-[#C4966C]/40 group-hover/item:scale-105 transition-all duration-300">
      <Icon className="text-xl sm:text-2xl xl:text-3xl" />
    </div>
    {/* Tekst: Mniejszy na mobile */}
    <span className="text-base sm:text-lg font-medium text-gray-300 group-hover/item:text-white transition-colors leading-tight">
      {text}
    </span>
  </li>
);

// 2. Komponent Karty (Reusable Card)
const ServiceCard = ({ header, children, buttonText, link }) => {
  return (
    <div className="group flex flex-col h-full bg-[#1a1a1a] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 border border-white/5 shadow-xl transition-all duration-500 hover:border-[#C4966C]/50 hover:shadow-2xl hover:shadow-[#C4966C]/5 hover:-translate-y-1 sm:hover:-translate-y-2">
      {/* Nagłówek z dekoracyjną linią */}
      <div className="mb-6 sm:mb-10 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-5 tracking-wide group-hover:text-[#C4966C] transition-colors duration-300">
          {header}
        </h3>
        {/* Dekoracyjna linia pod nagłówkiem */}
        <div className="h-1 w-12 sm:w-16 bg-[#C4966C] mx-auto rounded-full opacity-70 group-hover:w-24 sm:group-hover:w-32 transition-all duration-500"></div>
      </div>

      {/* Lista elementów */}
      <ul className="flex flex-col gap-2 sm:gap-4 mb-8 sm:mb-12 flex-grow">
        {children}
      </ul>

      {/* Przycisk na dole */}
      <div className="flex items-center justify-center mt-auto">
        <Button
          text={buttonText}
          bgColor="bg-[#C4966C]"
          textColor="text-white"
          link={link}
          className="shadow-lg hover:shadow-[#C4966C]/40 transition-shadow w-full sm:w-auto text-center justify-center"
        />
      </div>
    </div>
  );
};

export default function Services() {
  const t = useTranslations("services");

  return (
    <section className="relative bg-[#111111] px-4 sm:px-6 lg:px-20 xl:px-44 py-16 sm:py-20 xl:py-28 overflow-hidden">
      {/* Dekoracyjne tło (rozmyte plamy światła) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#C4966C]/5 rounded-full blur-[80px] sm:blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#C4966C]/5 rounded-full blur-[80px] sm:blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Nagłówek Sekcji */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-10 sm:mb-16 xl:mb-24 text-center break-words tracking-tight px-2">
          {t("header")}
        </h2>

        {/* Grid Kart - Na mobile 1 kolumna, na tablecie 2 (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* KARTA 1 */}
          <ServiceCard
            header={t("cards.1.header")}
            buttonText={t("cards.button")}
            link="/park"
          >
            <ListItem Icon={PiWall} text={t("cards.1.text1")} />
            <ListItem Icon={GiThrowingBall} text={t("cards.1.text2")} />
            <ListItem Icon={MdOutlineSportsCricket} text={t("cards.1.text3")} />
            <ListItem Icon={MdOutlinePedalBike} text={t("cards.1.text4")} />
          </ServiceCard>

          {/* KARTA 2 */}
          <ServiceCard
            header={t("cards.2.header")}
            buttonText={t("cards.button")}
            link="/park"
          >
            <ListItem Icon={GiBowlingStrike} text={t("cards.2.text1")} />
            <ListItem Icon={GiKidSlide} text={t("cards.2.text2")} />
            <ListItem Icon={IoGameController} text={t("cards.2.text3")} />
            <ListItem Icon={FaTv} text={t("cards.2.text4")} />
          </ServiceCard>

          {/* KARTA 3 */}
          <ServiceCard
            header={t("cards.3.header")}
            buttonText={t("cards.button")}
            link="/park"
          >
            <ListItem Icon={IoIosFitness} text={t("cards.3.text1")} />
            <ListItem Icon={IoFitness} text={t("cards.3.text2")} />
          </ServiceCard>

          {/* KARTA 4 */}
          <ServiceCard
            header={t("cards.4.header")}
            buttonText={t("cards.button")}
            link="/park"
          >
            <ListItem Icon={FaBusinessTime} text={t("cards.4.text1")} />
            <ListItem Icon={TbMassage} text={t("cards.4.text2")} />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
}
