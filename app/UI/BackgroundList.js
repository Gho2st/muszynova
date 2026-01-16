"use client";
import { motion } from "framer-motion";

export default function BackgroundList({ title, items, text, className = "" }) {
  // Warianty animacji
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`
        relative flex flex-col w-full max-w-3xl xl:max-w-4xl mx-auto 
        my-12 md:my-20
        bg-white rounded-3xl 
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] 
        overflow-hidden
        ${className}
      `}
    >
      {/* Dekoracyjny pasek na górze (kolor złoty z poprzednich przykładów) */}
      <div className="h-2 w-full bg-[#C4966C]" />

      <div className="p-8 md:p-12 text-center">
        {/* Nagłówek */}
        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          {title}
        </h3>

        {/* Opcjonalny opis */}
        {text && (
          <p className="mb-10 text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            {text}
          </p>
        )}

        {/* Lista */}
        <ul className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="
                group
                relative
                flex items-center justify-start md:justify-center
                p-4 rounded-xl
                transition-colors duration-300
                hover:bg-gray-50
              "
            >
              {/* Ozdobny punktator (bullet point) */}
              <span className="hidden md:inline-block mr-3 text-[#C4966C] text-xl transform group-hover:scale-125 transition-transform duration-300">
                ❖
              </span>

              {/* Tekst elementu */}
              <span className="text-gray-700 font-medium text-lg text-left md:text-center w-full md:w-auto">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
