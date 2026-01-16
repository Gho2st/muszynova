"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// Zmieniamy zwykły div na motion.div i dodajemy prop 'delay'
const MenuItem = ({
  img,
  title,
  desc,
  align = "left",
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      // Animacja wejścia
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Animacja wykona się raz, gdy element wejdzie w widok
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
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
    </motion.div>
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
        {/* NAGŁÓWEK - Animacja wejścia od dołu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 xl:mb-24"
        >
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
        </motion.div>

        {/* GŁÓWNY UKŁAD 3 KOLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-center">
          {/* LEWA KOLUMNA */}
          <div className="flex flex-col gap-12 xl:gap-20 order-2 lg:order-1">
            <MenuItem
              img="/restauracja/mleko-ser.webp"
              title={t("items.item1.header")}
              desc={t("items.item1.text")}
              align="right"
              className="lg:translate-x-8 xl:translate-x-12"
              delay={0.1} // Pierwszy element
            />
            <MenuItem
              img="/restauracja/lody.webp"
              title={t("items.item2.header")}
              desc={t("items.item2.text")}
              align="right"
              className="lg:-translate-x-4"
              delay={0.2} // Drugi element (nieco później)
            />
            <MenuItem
              img="/restauracja/5gwiazdek.webp"
              title={t("items.item3.header")}
              desc={t("items.item3.text")}
              align="right"
              className="lg:translate-x-8 xl:translate-x-12"
              delay={0.3} // Trzeci element
            />
          </div>

          {/* ŚRODEK - TALERZ (CENTRALNY) */}
          <div className="order-1 lg:order-2 flex justify-center relative my-8 lg:my-0">
            {/* Dekoracyjny okrąg pod talerzem */}
            <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl transform scale-90"></div>

            {/* Zewnetrzny motion.div do animacji WEJŚCIA (Zoom + Fade) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Wewnętrzny motion.div do animacji OBROTU (Ciągła pętla) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
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
            </motion.div>
          </div>

          {/* PRAWA KOLUMNA */}
          <div className="flex flex-col gap-12 xl:gap-20 order-3 lg:order-3">
            <MenuItem
              img="/restauracja/pizza.webp"
              title={t("items.item4.header")}
              desc={t("items.item4.text")}
              align="left"
              className="lg:-translate-x-8 xl:-translate-x-12"
              delay={0.1} // Start równo z lewą kolumną
            />
            <MenuItem
              img="/restauracja/kawa.webp"
              title={t("items.item5.header")}
              desc={t("items.item5.text")}
              align="left"
              className="lg:translate-x-4"
              delay={0.2}
            />
            <MenuItem
              img="/restauracja/tort.webp"
              title={t("items.item6.header")}
              desc={t("items.item6.text")}
              align="left"
              className="lg:-translate-x-8 xl:-translate-x-12"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
