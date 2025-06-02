import FloatingImage from "./FloatingImage";
import Image from "next/image";

export default function Hero({ t }) {
  return (
    <div className="relative min-h-screen max-h-screen overflow-hidden">
      {/* Optymalizowany obraz tła z Next.js Image */}
      <Image
        src="/Muszynova-hotel.webp"
        alt="Muszynova Hotel Background"
        fill
        priority
        className="object-cover z-0"
        quality={80} // zmień, jeśli obraz jest duży
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#13322B]/30 z-10" />

      {/* Treść */}
      <div className="relative z-20 flex flex-col items-center min-h-screen text-white gap-4 px-3 pt-20">
        <span className="mb-6 mt-4 md:mt-10 text-3xl md:text-5xl xl:w-1/2 xl:leading-snug font-extrabold text-center uppercase">
          {t("welcome")}
        </span>
        <div className="md:w-1/2 2xl:w-3/5">
          <FloatingImage
            src="/logo-nova.webp"
            alt="Muszynova Logo"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
