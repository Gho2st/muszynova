"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Button from "./Buttons/Button";

export default function Card({
  icon,
  bgColor = "bg-customGreen",
  title,
  text,
  buttonText,
  link,
  isWesele = false, // Nowy prop
  weseleText,
}) {
  const parsedContent = useMemo(() => {
    const lines = text.split("<br />").filter((line) => line.trim() !== "");

    return lines.map((line, index) => {
      const phoneRegex = /(\+48 \d{3} \d{3} \d{3})/;
      const parts = line.split(phoneRegex);

      if (parts.length === 1) {
        return (
          <span key={index} className="block mb-1">
            {line}
          </span>
        );
      }

      return (
        <span key={index} className="block mb-1">
          {parts.map((part, i) => {
            if (part.match(phoneRegex)) {
              const phoneNumberClean = part.replace(/\s/g, "");
              return (
                <a
                  key={i}
                  href={`tel:${phoneNumberClean}`}
                  className="text-white font-medium underline decoration-transparent hover:decoration-white hover:text-white transition-all duration-300"
                >
                  {part}
                </a>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </span>
      );
    });
  }, [text]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      // Dodano klase "relative", aby logo w rogu trzymało się krawędzi karty
      className={`relative flex flex-col justify-between ${bgColor} p-8 h-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
    >
      {/* Ikona */}
      <div className="p-3 w-fit rounded-full text-5xl text-black bg-white flex items-center justify-center shadow-sm">
        {icon}
      </div>

      {/* Tytuł */}
      <h4 className="text-xl xl:text-2xl mt-6 text-white font-bold tracking-wide">
        {title}
      </h4>

      {/* Treść */}
      <div className="mt-6 text-gray-200 font-light flex-grow leading-relaxed">
        {parsedContent}
      </div>

      {/* Przycisk */}
      <div className="mt-8 flex justify-start">
        <Button text={buttonText} link={link} />
      </div>

      {/* Logo Wesele z Klasą */}
      {/* Logo Wesele z Klasą z wezwaniem do działania */}
      {isWesele && (
        <div className="absolute bottom-4 right-4 flex flex-col items-end group">
          {/* Tekst zachęty - pojawia się subtelnie nad logiem */}
          <span className="text-[10px] uppercase tracking-widest text-white/70 mb-1 font-semibold group-hover:text-white transition-colors">
            {weseleText}
          </span>

          <div className="max-w-[130px] md:max-w-[160px] opacity-90 hover:opacity-100 transition-all transform hover:scale-105">
            <a
              href="https://www.weselezklasa.pl/ogloszenia-weselne/muszynova-park-i-restauracja,61583/"
              target="_blank"
              rel="noopener noreferrer"
              title="Wyślij zapytanie o wesele w Muszynova"
            >
              <img
                src="https://www.weselezklasa.pl/banery/Weselezklasa/button230x50bordowetlo.png"
                alt="Profil Muszynova na Wesele z Klasą"
                className="w-full h-auto rounded-md shadow-md border border-white/10"
              />
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}
