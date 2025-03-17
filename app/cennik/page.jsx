import Image from "next/image";

export default function Cennik() {
  return (
    <>
      <section className="py-20">
        <h1 className="text-6xl font-bold text-customGold text-center mb-20">Cennik</h1>
        <div className="px-6 xl:px-24 flex justify-center">
          <div className="w-2/3">
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
