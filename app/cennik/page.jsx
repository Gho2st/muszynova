import Image from "next/image";

export const metadata = {
  title: "",
  alternates: {
    canonical: "https://muszynova.pl/cennik",
  },

  description: "",
};

export default function Cennik() {
  return (
    <>
      <section className="py-20 bg-black xl:bg-white">
        <h1 className="text-5xl xl:text-6xl font-bold text-customGold text-center mb-20">
          Cennik
        </h1>
        <div className=" xl:px-24 flex justify-center">
          <div className="xl:w-2/3">
            <Image
              src="/cennik/cennik.webp"
              alt=""
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
        </div>
      </section>
    </>
  );
}
