"use client";
import Image from "next/image";
import FloatingImage from "./FloatingImage";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/Muszynova-hotel.webp"
          alt="Tło Muszynova"
          fill
          className="object-cover opacity-90"
          quality={90}
          priority
        />
      </motion.div>

      {/* 2. OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#13322B]/20 to-black/80 z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-start  h-full px-6  pt-20 xl:pt-32 text-white text-center">
        {/* Tekst */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="block text-2xl md:text-4xl xl:text-5xl font-bold uppercase tracking-widest leading-tight drop-shadow-lg">
            {t("welcome")}
          </span>
        </motion.div>
        <div className=" md:w-1/2 xl:w-2/5 2xl:w-1/3 mt-8 my:mt-12">
          <FloatingImage
            src="/logo-nova.webp"
            alt="Muszynova Logo"
            width={500}
            height={500}
          />
        </div>

        {/* 4. SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">
            Odkryj więcej
          </span>
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center pt-2 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 15, 0], opacity: [1, 0, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-customGold rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
