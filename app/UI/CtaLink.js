"use client";

import { motion } from "framer-motion";
import Button from "./Buttons/Button";

export default function CtaLink({ header, text, button, link }) {
  return (
    <section className="mt-20 md:mt-32 w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        <div className="relative overflow-hidden rounded-3xl bg-customGreen text-white shadow-2xl shadow-customGreen/20">
          {/* Ozdobny akcent na górze (zamiast starego outline) */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C4966C]" />

          {/* Opcjonalnie: Subtelny gradient/poświata w tle dla głębi */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center p-8 md:p-16 lg:p-20">
            {/* Nagłówek */}
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight mb-6">
              {header}
            </h2>

            {/* Tekst */}
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 md:mb-12 font-light">
              {text}
            </p>

            {/* Przycisk */}
            <div className="flex justify-center w-full">
              <Button text={button} link={link} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
