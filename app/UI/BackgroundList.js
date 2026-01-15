"use client";
import { motion } from "framer-motion";

export default function BackgroundList({ title, items, text, className = "" }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Zmiana: wjazd delikatnie z dołu, bardziej naturalne dla listy
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`
        relative flex flex-col w-full max-w-3xl mx-auto 
        my-8 md:my-12
        bg-white rounded-2xl shadow-sm border border-gray-100
        overflow-hidden
        ${className}
      `}
    >
      {/* Opcjonalny złoty akcent na górze - jeśli nie pasuje, usuń tę linijkę */}
      <div className="h-1 w-full bg-customGold/80" />

      <div className="p-6 md:px-10 md:py-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
          {title}
        </h3>

        {text && (
          <p className="mb-6 md:mb-8 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            {text}
          </p>
        )}

        {/* Zmiana: Lista wycentrowana, bez kafelków */}
        <ul className="flex flex-col text-center">
          {items.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              // STYL ELEMENTU LISTY:
              // py-3 md:py-4 -> optymalne odstępy pionowe na mobile i desktop
              // border-b border-gray-100 -> bardzo delikatna linia oddzielająca
              // last:border-0 -> ostatni element bez linii
              className="
                py-3 md:py-4
                border-b border-gray-100 last:border-0
                text-slate-700 font-medium text-base md:text-lg leading-snug
              "
            >
              {/* Po prostu tekst, bez żadnych ikon */}
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
