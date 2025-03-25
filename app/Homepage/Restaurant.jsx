import Image from "next/image";

export default function Restaurant({ t }) {
  return (
    <section className="bg-[#C4966C] px-6 xl:px-44 py-20 text-white overflow-x-hidden">
      <h2 className="text-4xl xl:text-5xl text-center font-extrabold text-white mb-6">
        {t("header")}
      </h2>
      <div className="text-white text-center xl:w-4/5 mx-auto">
        <p className="text-lg xl:text-xl font-semibold mb-6">{t("header2")}</p>
        <p className="font-light xl:text-lg">{t("text")}</p>
      </div>
      <div className="grid lg:grid-cols-3 mt-24 gap-16">
        {/* left container */}
        <div className="lg:text-right flex flex-col gap-16">
          {/* lokalne skladniki */}
          <div className="xl:translate-x-[4rem]">
            <div className="flex items-center lg:justify-end gap-5 md:gap-10">
              <Image
                src={"/restauracja/mleko-ser.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">
                {t("items.item1.header")}
              </h3>
            </div>
            <p className="font-light mt-5 ">{t("items.item1.text")}</p>
          </div>
          {/* dzieciece smaki */}
          <div>
            <div className="flex items-center lg:justify-end gap-5 md:gap-10">
              <Image
                src={"/restauracja/lody.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">
                {t("items.item2.header")}
              </h3>
            </div>
            <p className="font-light mt-5 ">{t("items.item2.text")}</p>
          </div>
          {/* NOve standardy */}
          <div className="xl:translate-x-[4rem]">
            <div className="flex items-center lg:justify-end gap-5 md:gap-10">
              <Image
                src={"/restauracja/5gwiazdek.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">
                {t("items.item3.header")}
              </h3>
            </div>
            <p className="font-light mt-5 ">{t("items.item3.text")}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/restauracja/salatka-2.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </div>
        {/* PRAWO */}
        <div className="text-right flex flex-col gap-16">
          {/* zdrowszy wybor */}
          <div className="xl:translate-x-[-4rem]">
            <div className="flex items-center flex-row-reverse gap-5 md:gap-10">
              <Image
                src={"/restauracja/pizza.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">
                {t("items.item4.header")}
              </h3>
            </div>
            <p className="font-light mt-5 ">{t("items.item4.text")}</p>
          </div>
          {/* dla doroslych */}
          <div>
            <div className="flex items-center flex-row-reverse gap-5 md:gap-10">
              <Image
                src={"/restauracja/kawa.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">
                {t("items.item5.header")}
              </h3>
            </div>
            <p className="font-light mt-5 ">{t("items.item5.text")}</p>
          </div>
          {/* imprezy okolicznosciowe*/}
          <div className="xl:translate-x-[-4rem]">
            <div className="flex items-center flex-row-reverse gap-5 md:gap-10">
              <Image
                src={"/restauracja/tort.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">
                {t("items.item6.header")}
              </h3>
            </div>
            <p className="font-light mt-5 ">{t("items.item6.text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
