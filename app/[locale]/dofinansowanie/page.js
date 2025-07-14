import Image from "next/image";
import Header from "@/app/UI/Header";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.dofinansowanie",
  });

  const path = routing.pathnames["/dofinansowanie"][locale]; // Pobieramy ścieżkę dla języka
  // Jeśli locale to 'pl', pomijamy prefix języka, w przeciwnym razie go dodajemy
  const canonicalUrl =
    locale === "pl"
      ? `https://muszynova.pl${path}`
      : `https://muszynova.pl/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Dofinansowanie() {
  const t = useTranslations("dofinansowanie");

  return (
    <main className="">
      <section className="text-center px-6 py-20  max-w-6xl mx-auto">
        <Header text={t("header")} />
        <p className="text-2xl mt-20 mb-20">{t("title")}</p>

        <div className="flex justify-center items-center">
          <div className="w-1/3">
            <Image
              src={"/dofinansowanie/1.webp"}
              width={500}
              height={500}
              layout="responsive"
              alt="Fundusze Europejskie Program Regionalny"
            />
          </div>
          <div className="w-1/3">
            <Image
              src={"/dofinansowanie/2.webp"}
              width={500}
              height={500}
              layout="responsive"
              alt="Małopolska"
            />
          </div>
          <div className="w-1/3">
            <Image
              src={"/dofinansowanie/3.webp"}
              width={500}
              height={500}
              layout="responsive"
              alt="Unia Europejska Europejski Fundusz Rozwoju Regionalnego"
            />
          </div>
        </div>
        <div className="text-left mt-10 text-xl flex flex-col gap-4">
          <h3 className="font-bold">{t("list.1")}</h3>
          <p>{t("list.a1")}</p>
          <h3 className="font-bold">{t("list.2")}</h3>
          <p>{t("list.a2")}</p>
          <h4 className="font-bold">{t("list.3")}</h4>
          <p>{t("list.a3")}</p>
          <h3 className="font-bold">{t("list.4")}</h3>
          <p>{t("list.a4")}</p>
          <h4 className="font-bold">{t("list.5")}</h4>
          <p>{t("list.a5")}</p>
          <h4 className="font-bold">{t("list.6")}</h4>
          <p>{t("list.a6")}</p>
          <h4 className="font-bold">{t("list.7")}</h4>
          <p>{t("list.a7")}</p>
          <h3 className="font-bold">{t("list.8")}</h3>
          <p>{t("list.a8")}</p>
          <h3 className="font-bold">{t("list.9")}</h3>
          <p>{t("list.a9")}</p>
          <h3 className="font-bold">{t("list.10")}</h3>
          <p>{t("list.a10")}</p>
          <h3 className="font-bold">{t("list.11")}</h3>

          <p>{t("list.t1")}</p>
          <p>{t("list.t2")}</p>
        </div>
      </section>
    </main>
  );
}
