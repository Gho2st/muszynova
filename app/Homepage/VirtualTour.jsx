"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaCompass } from "react-icons/fa";

const VirtualTour = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const t = useTranslations("virtualtour");

  const handleLoadIframe = () => {
    setIsIframeLoaded(true);
  };

  return (
    <section
      id="virtual-tour"
      className="py-20 xl:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-8">
        <div className="flex flex-col items-center text-center mb-12 xl:mb-16">
          <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-customGold uppercase mb-3">
            <FaCompass className="animate-pulse" />{" "}
            {t("subheader") || "Odkryj Park"}{" "}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            {t("header")}
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl">
            {t("description") ||
              "Przespaceruj się po naszych alejkach bez wychodzenia z domu. Poczuj klimat Muszyny online."}
          </p>
        </div>

        <div className="relative w-full h-[500px] lg:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100 group bg-gray-900">
          <AnimatePresence mode="wait">
            {!isIframeLoaded ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={handleLoadIframe}
              >
                {/* Tło z efektem Zoom na hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: "url('/virtual.webp')" }}
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500 backdrop-blur-[2px]" />

                {/* Centralny Przycisk "Start" */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  {/* Kółko z ikoną Play (Glassmorphism) */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:bg-customGold/90 group-hover:border-transparent transition-all duration-300"
                  >
                    <FaPlay className="w-8 h-8 ml-2 text-white drop-shadow-md" />
                  </motion.div>

                  <h3 className="text-2xl text-center font-bold tracking-wide drop-shadow-lg">
                    {t("button")}
                  </h3>
                  <span className="text-sm text-gray-200 mt-2 font-medium tracking-wider uppercase opacity-80">
                    {t("button2")}
                  </span>
                </div>
              </motion.div>
            ) : (
              /* STAN 2: IFRAME (ZAŁADOWANY) */
              <motion.div
                key="iframe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="h-full w-full bg-gray-100 relative z-20"
              >
                <iframe
                  src="/virtual-tour/index.html"
                  className="h-full w-full border-0"
                  title={t("header")}
                  allowFullScreen
                  loading="lazy"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
