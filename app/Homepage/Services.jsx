"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

// Import Ikon
import { PiWall } from "react-icons/pi";
import { GiThrowingBall, GiBowlingStrike, GiKidSlide } from "react-icons/gi";
import { MdOutlineSportsCricket, MdOutlinePedalBike } from "react-icons/md";
import { IoGameController, IoFitness } from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { FaBusinessTime } from "react-icons/fa6";
import { TbMassage } from "react-icons/tb";
const LinkItem = ({ Icon, text, href }) => (
  <li className="group/item touch-manipulation">
    {" "}
    {/* touch-manipulation = szybsze tap na iOS */}
    <Link
      href={href}
      className={`
        flex items-center gap-3 xs:gap-4 sm:gap-5 
        px-4 py-4 xs:py-4.5 sm:p-4           // ↑ większy touch target (min ~48px wysokości)
        rounded-2xl 
        transition-all duration-300 ease-out
        active:bg-white/12 active:scale-[1.015]   // ripple + micro-lift na tap (bardzo ważne na mobile!)
        hover:bg-white/8                           // desktop hover
        cursor-pointer select-none
      `}
    >
      {/* Ikona – bez zmian, ewentualnie możesz lekko powiększyć na mobile */}
      <div
        className={`
          flex-shrink-0 w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14
          rounded-xl bg-[#C4966C]/10 border border-[#C4966C]/20 
          text-[#C4966C] flex items-center justify-center 
          shadow-[0_0_12px_-2px_rgba(196,150,108,0.08)]
          group-hover/item:shadow-[#C4966C]/30 
          group-hover/item:scale-105 
          transition-all duration-300
        `}
      >
        <Icon className="text-2xl sm:text-2.5xl" />
      </div>

      {/* Tekst – flex-grow + truncate na bardzo długie nazwy */}
      <span
        className={`
          text-[15px] xs:text-base sm:text-lg font-medium 
          text-gray-200 group-hover/item:text-gray-50 
          transition-colors leading-snug flex-grow truncate
        `}
      >
        {text}
      </span>

      {/* Strzałka – zawsze widoczna na mobile, na desktop fade-in */}
      <span
        className={`
          ml-2 xs:ml-3 text-[#C4966C]/70 text-xl xs:text-2xl font-medium
          transition-all duration-300
          group-hover/item:text-[#C4966C] group-hover/item:translate-x-0.5
          xs:opacity-60 xs:group-hover/item:opacity-100   // na małych ekranach zawsze dość widoczna
        `}
      >
        →
      </span>
    </Link>
  </li>
);

// 2. Karta – bez przycisku na dole
const ServiceCard = ({ header, children }) => {
  return (
    <div
      className={`
        group flex flex-col h-full 
        bg-[#1a1a1a] rounded-3xl sm:rounded-[2.5rem] 
        p-6 sm:p-8 lg:p-12 
        border border-white/5 
        shadow-xl 
        transition-all duration-500 
        hover:border-[#C4966C]/50 
        hover:shadow-2xl hover:shadow-[#C4966C]/5 
        hover:-translate-y-1 sm:hover:-translate-y-2
      `}
    >
      {/* Nagłówek */}
      <div className="mb-6 sm:mb-10 text-center">
        <h3
          className={`
            text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-5 
            tracking-wide group-hover:text-[#C4966C] 
            transition-colors duration-300
          `}
        >
          {header}
        </h3>
        <div
          className={`
            h-1 w-12 sm:w-16 bg-[#C4966C] mx-auto rounded-full 
            opacity-70 group-hover:w-24 sm:group-hover:w-32 
            transition-all duration-500
          `}
        />
      </div>

      {/* Lista */}
      <ul className="flex flex-col gap-2 sm:gap-3 mb-6 flex-grow">
        {children}
      </ul>
    </div>
  );
};

export default function Services() {
  const t = useTranslations("services");

  return (
    <section
      className={`
        relative bg-[#111111] 
        px-4 sm:px-6 lg:px-20 xl:px-44 
        py-16 sm:py-20 xl:py-28 overflow-hidden
      `}
    >
      {/* Tło dekoracyjne – bez zmian */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#C4966C]/5 rounded-full blur-[80px] sm:blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#C4966C]/5 rounded-full blur-[80px] sm:blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2
          className={`
            text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 
            font-extrabold text-white mb-10 sm:mb-16 xl:mb-24 
            text-center break-words tracking-tight px-2
          `}
        >
          {t("header")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* KARTA 1 – Strefa Active Sport / Outdoor */}
          <ServiceCard header={t("cards.1.header")}>
            <LinkItem
              Icon={PiWall}
              text={t("cards.1.text1")}
              href="/park/scianka-wspinaczkowa"
            />
            <LinkItem
              Icon={GiThrowingBall}
              text={t("cards.1.text2")}
              href="/park/hala-sportowa"
            />
            <LinkItem
              Icon={MdOutlineSportsCricket}
              text={t("cards.1.text3")}
              href="/park/squash"
            />

            <LinkItem
              Icon={IoIosFitness}
              text={t("cards.3.text1")}
              href="/park/silownia"
            />
            <LinkItem
              Icon={IoFitness}
              text={t("cards.3.text2")}
              href="/park/fitness"
            />
          </ServiceCard>

          {/* KARTA 2 – Strefa Fun & Kids */}
          <ServiceCard header={t("cards.2.header")}>
            <LinkItem
              Icon={GiBowlingStrike}
              text={t("cards.2.text1")}
              href="/park/mini-kregielnia"
            />
            <LinkItem
              Icon={GiKidSlide}
              text={t("cards.2.text2")}
              href="/park/sala-zabaw"
            />
            <LinkItem
              Icon={IoGameController}
              text={t("cards.2.text3")}
              href="/park/sala-gier"
            />
            <LinkItem
              Icon={FaTv}
              text={t("cards.2.text4")}
              href="/park/sala-multimedialna"
            />
            <LinkItem
              Icon={MdOutlinePedalBike}
              text={t("cards.1.text4")}
              href="/park/wypozyczalnia-rowerow"
            />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
}
