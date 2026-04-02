import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Cards() {
  const t = useTranslations("pricing");

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 overflow-hidden bg-neutral-900 font-sans text-center">
      {/* Tło - Zdjęcie lasu */}
      <Image
        src="/cennik/forest.webp"
        alt="Mroczny las w tle"
        fill
        className="object-cover opacity-40 z-0"
        quality={90}
        priority
      />

      {/* Nakładka przyciemniająca tło (dla lepszej czytelności tekstu) */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8 w-full">
        {/* Główne Logo NOVO ze wstawionymi zdjęciami */}
        <div className="relative w-full max-w-4xl h-[250px] md:h-[200px] lg:h-[300px]">
          <Image
            src="/logo-nova.webp"
            alt="Logo NOVO"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Opis tekstowy */}
        <p className="text-xl md:text-3xl 2xl:text-4xl whitespace-pre-line font-semibold leading-relaxed max-w-4xl text-white drop-shadow-md mt-4">
          {t("text")}
        </p>

        {/* Sekcja kart sportowych na dole */}
        <div className="mt-12 flex flex-col items-center gap-6 pb-8">
          {/* Karta FitProfit */}
          <div className="w-1/4 transform  -rotate-12 transition-transform duration-300 hover:scale-105 hover:-rotate-6">
            <Image
              src="/cennik/karty.png"
              alt="Karta FitProfit"
              layout="responsive"
              width={300}
              height={300}
              className="object-contain drop-shadow-2xl rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
