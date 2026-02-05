"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Button from "./Buttons/Button";

export default function Card2({
  icon,
  bgColor = "bg-customGreen",
  title,
  text,
  text2,
  hours,
  buttonText,
  link,
}) {
  const parsedContent = useMemo(() => {
    if (!text) return null;

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
                  className="text-white font-medium underline decoration-transparent hover:decoration-white hover:text-gray-200 transition-all duration-300"
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
      className={`flex flex-col justify-between ${bgColor} p-8 h-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
    >
      <div>
        <div className="p-3 w-fit rounded-full text-5xl text-black bg-white flex items-center justify-center shadow-sm">
          {icon && icon}
        </div>
        <h2 className="text-xl xl:text-2xl mt-6 text-white font-bold tracking-wide">
          {title}
        </h2>
      </div>

      {/* --- Sekcja Środkowa: Godziny i Treść --- */}
      <div className="flex-grow">
        {/* Godziny (Specyficzne dla Card2) */}
        {hours && (
          <h3 className="mt-10 font-semibold text-gray-200 tracking-wide">
            {hours}:
          </h3>
        )}

        {/* Główny tekst z linkami telefonicznymi */}
        <div className="mt-5 text-gray-300 font-light leading-relaxed">
          {parsedContent}
        </div>
      </div>

      {/* --- Sekcja Dolna: Przycisk --- */}
      <div className="mt-10 flex justify-start">
        <Button text={buttonText} link={link} />
      </div>
    </motion.div>
  );
}
