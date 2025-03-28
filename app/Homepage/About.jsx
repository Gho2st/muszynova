import Image from "next/image";
import Button from "../UI/Buttons/Button";

export default function About({ t }) {
  return (
    <section className="py-20 px-6">
      <div className="xl:flex">
        <div className="xl:w-1/2 xl:p-16">
          <Image
            src={"/about.jpg"}
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </div>
        <div className="mt-12 xl:mt-0 xl:w-1/2 xl:p-16">
          <h1 className="text-customGold font-bold text-3xl xl:text-4xl">
            {t("header")}
          </h1>
          <p className="my-10 text-lg font-light">{t("text")}</p>
          <Button
            text={t("button")}
            bgColor="bg-[#C4966C]"
            textColor="text-white"
            link="/#virtual-tour"
          />
        </div>
      </div>
    </section>
  );
}
