'use client'
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
}) {
  // Parsowanie tekstu zoptymalizowane za pomocą useMemo
  const parsedContent = useMemo(() => {
    // Dzielimy tekst na linie i usuwamy puste
    const lines = text.split("<br />").filter((line) => line.trim() !== "");

    return lines.map((line, index) => {
      // Regex szukający formatu: +48 123 456 789
      const phoneRegex = /(\+48 \d{3} \d{3} \d{3})/;
      const parts = line.split(phoneRegex);

      // Jeśli linia nie zawiera numeru, parts ma długość 1
      if (parts.length === 1) {
        return (
          <span key={index} className="block mb-1">
            {line}
          </span>
        );
      }

      // Jeśli zawiera numer, mapujemy części
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

  // Konfiguracja animacji
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
      viewport={{ once: true, margin: "-50px" }} // Animacja odpali się raz, gdy element wejdzie w widok
      className={`flex flex-col justify-between ${bgColor} p-8 h-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
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
    </motion.div>
  );
}
