import Image from "next/image";
import Link from "next/link";

export default function Galeria() {
  return (
    <>
      <section className="px-6 xl:px-24 py-20 pb-32">
        <h1 className="text-6xl font-bold text-customGold text-center mb-20">
          Galeria
        </h1>
        <div className="flex justify-center gap-x-10">
          <Link
            className="w-1/3 hover:scale-105 transition-all ease-in-out duration-300"
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
            className="w-1/3 hover:scale-105 transition-all ease-in-out duration-300"
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
