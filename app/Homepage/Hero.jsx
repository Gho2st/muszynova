import Image from "next/image";

export default function Hero() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Muszynova-hotel.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#13322B]/55 z-10" />

      {/* Treść i obraz w jednym kontenerze */}
      <div className="relative z-20 flex flex-col items-center xl:justify-center min-h-screen text-white gap-4">
        <span className="mb-6 mt-32 xl:mt-0 text-3xl md:text-5xl xl:w-1/2 xl:leading-snug font-extrabold text-center uppercase">
          Witaj w Muszynova! Food & Fun do odkrycia na
        </span>
        <div className="w-1/2">
          <Image
            src="/logo-nova.webp"
            alt="Muszynova Logo"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
