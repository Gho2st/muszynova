"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const MenuItem = ({ img, title, desc, align = "left", className = "" }) => {
  return (
    <div
      className={`flex items-center gap-4 lg:gap-6 ${
        align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
      } flex-col text-center lg:text-left ${className}`}
    >
      {/* IKONA W BĄBELKU */}
      <div className="relative flex-shrink-0 w-20 h-20 xl:w-24 xl:h-24 bg-white rounded-full p-4 shadow-xl shadow-black/10 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
        <Image
          src={img}
          width={80}
          height={80}
          alt={title}
          className="object-contain w-full h-full"
        />
      </div>

      {/* TEKST */}
      <div
        className={`flex flex-col ${
          align === "left" ? "lg:text-left" : "lg:text-right"
        } text-center`}
      >
        <h3 className="text-xl font-bold leading-tight mb-2 text-white drop-shadow-sm">
          {title}
        </h3>
        <p className="text-sm xl:text-base font-medium text-white/90 leading-relaxed max-w-xs mx-auto lg:mx-0">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default function Restaurant() {
  const t = useTranslations("restaurant");

  return (
    <section className="relative bg-[#C4966C] py-20 xl:py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 xl:px-12">
        {/* NAGŁÓWEK */}
        <div className="text-center max-w-3xl mx-auto mb-16 xl:mb-24">
          <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-4 block">
            Smaki Natury
          </span>
          <h2 className="text-4xl xl:text-6xl font-extrabold text-white mb-8 tracking-tight drop-shadow-md">
            {t("header")}
          </h2>
          <div className="text-white text-lg xl:text-xl font-medium space-y-4 leading-relaxed">
            <p className="font-bold">{t("header2")}</p>
            <p className="font-light opacity-90">{t("text")}</p>
          </div>
        </div>

        {/* GŁÓWNY UKŁAD 3 KOLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-center">
          {/* LEWA KOLUMNA */}
          <div className="flex flex-col gap-12 xl:gap-20 order-2 lg:order-1">
            {/* Item 1 - Przesunięty w stronę środka */}
            <MenuItem
              img="/restauracja/mleko-ser.webp"
              title={t("items.item1.header")}
              desc={t("items.item1.text")}
              align="right" // Ikona bliżej środka
              className="lg:translate-x-8 xl:translate-x-12"
            />
            {/* Item 2 - Standardowy */}
            <MenuItem
              img="/restauracja/lody.webp"
              title={t("items.item2.header")}
              desc={t("items.item2.text")}
              align="right"
              className="lg:-translate-x-4" // Lekkie cofnięcie dla łuku
            />
            {/* Item 3 - Przesunięty w stronę środka */}
            <MenuItem
              img="/restauracja/5gwiazdek.webp"
              title={t("items.item3.header")}
              desc={t("items.item3.text")}
              align="right"
              className="lg:translate-x-8 xl:translate-x-12"
            />
          </div>

          {/* ŚRODEK - TALERZ (CENTRALNY) */}
          <div className="order-1 lg:order-2 flex justify-center relative my-8 lg:my-0">
            {/* Dekoracyjny okrąg pod talerzem */}
            <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl transform scale-90"></div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }} // Bardzo wolny obrót talerza
              className="relative w-64 h-64 md:w-80 md:h-80 xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden shadow-2xl shadow-black/20 border-4 border-white/20"
            >
              <Image
                src="/restauracja/salatka-2.webp"
                fill
                className="object-cover"
                alt={t("alt.1")}
                priority
              />
            </motion.div>
          </div>

          {/* PRAWA KOLUMNA */}
          <div className="flex flex-col gap-12 xl:gap-20 order-3 lg:order-3">
            {/* Item 4 - Przesunięty w stronę środka */}
            <MenuItem
              img="/restauracja/pizza.webp"
              title={t("items.item4.header")}
              desc={t("items.item4.text")}
              align="left" // Ikona bliżej środka
              className="lg:-translate-x-8 xl:-translate-x-12"
            />
            {/* Item 5 - Standardowy */}
            <MenuItem
              img="/restauracja/kawa.webp"
              title={t("items.item5.header")}
              desc={t("items.item5.text")}
              align="left"
              className="lg:translate-x-4"
            />
            {/* Item 6 - Przesunięty w stronę środka */}
            <MenuItem
              img="/restauracja/tort.webp"
              title={t("items.item6.header")}
              desc={t("items.item6.text")}
              align="left"
              className="lg:-translate-x-8 xl:-translate-x-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
