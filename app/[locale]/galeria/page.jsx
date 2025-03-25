import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Galeria - Muszynova",
  alternates: {
    canonical: "https://muszynova.pl/galeria",
  },
  description:
    "Zapraszamy do galerii Muszynova! Zobacz zdjęcia parku i restauracji, które ukazują piękno i wyjątkowy klimat naszego miejsca.",
};

export default function Galeria() {
  return (
    <>
      <section className="px-6 xl:px-24 py-16 xl:py-20 ">
        <h1 className="text-5xl xl:text-6xl font-bold text-customGold text-center mb-16 xl:mb-20">
          Galeria
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-x-10 gap-y-10 sm:gap-y-0">
          <Link
            className="w-3/3 sm:w-1/3 hover:scale-105 transition-all ease-in-out duration-300"
            href={"/galeria/park"}
          >
            <div>
              <Image
                src="/galeria/park.webp"
                width={100}
                height={100}
                layout="responsive"
                alt=""
              />
            </div>
          </Link>
          <Link
            className="w-3/3 sm:w-1/3 hover:scale-105 transition-all ease-in-out duration-300"
            href={"/galeria/restauracja"}
          >
            <div>
              <Image
                src="/galeria/restauracja.webp"
                width={100}
                height={100}
                layout="responsive"
                alt=""
              />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
