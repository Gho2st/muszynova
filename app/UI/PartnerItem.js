import Image from "next/image";
import Link from "next/link";

export default function PartnerItem({ t, index, partner, link }) {
  const image = `${partner}.webp`;
//   console.log(image);
  return (
    <article
      className={`flex flex-col md:flex-row justify-between items-center gap-16 xl:gap-24 ${
        index % 2 === 1 ? "xl:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-3/5">
        <Link href={link} className=" ">
          <h2 className="text-xl font-medium  inline-block hover:text-yellow-600 duration-300 transition-all md:text-2xl mb-10 underline md:underline-offset-[1rem]">
            {t.header}
          </h2>
        </Link>
        <p className="font-light">{t.text}</p>
      </div>
      <div className="w-3/5 sm:w-2/5 md:w-1/5">
        <Image
          src={`/partnerzy/${image}`}
          width={100}
          height={100}
          layout="responsive"
          alt={t.header}
        />
      </div>
    </article>
  );
}
