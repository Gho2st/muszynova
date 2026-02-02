"use client";
import Image from "next/image";
import Button from "../UI/Buttons/Button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section className="relative py-20 xl:py-32 px-6 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
        <Image src="/dots.svg" width={200} height={200} alt="" />{" "}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Główny obrazek */}
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200">
                <Image
                  src="/about.webp"
                  alt={t("alt.1")}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#C4966C]/30 rounded-[2.5rem] -z-10 hidden md:block"></div>

              <div className="absolute -bottom-8 -left-4 md:bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl animate-float hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#C4966C]/10 rounded-full flex items-center justify-center text-[#C4966C]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Muszynova
                    </p>
                    <p className="text-sm md:text-base font-bold text-gray-900">
                      {t("nature")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[#C4966C]/10 text-[#C4966C] text-xs font-bold tracking-widest uppercase mb-4">
                {t("kicker")}
              </span>

              <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t("header")}
              </h1>

              <div className="w-20 h-1 bg-[#C4966C] mb-8 rounded-full"></div>

              <p className="text-gray-600 text-base xl:text-lg leading-relaxed font-normal mb-10">
                {t("text")}
              </p>

              <div className="flex flex-row  gap-4">
                <Button
                  text={t("button")}
                  bgColor="bg-[#C4966C]"
                  textColor="text-white"
                  link="https://muszynova.oos.pl/customer/login"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                />
                <Button
                  text={t("button2")}
                  bgColor="bg-[#C4966C]"
                  textColor="text-white"
                  link="/cennik"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
