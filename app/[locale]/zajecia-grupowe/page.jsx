import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.groupclasses",
  });

  const path = routing.pathnames["/zajecia-grupowe"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Zajecia() {
  const t = useTranslations("groupclasses");
  return (
    <>
      <section className="px-6 xl:px-24 py-16 xl:py-20">
        <h1 className="text-center text-4xl xl:text-6xl mb-16 xl:mb-20 font-bold text-customGold">
          {t("header")}
        </h1>
        <div className="flex justify-center">
          <iframe
            title="Kalendarz zajęć Muszynova"
            style={{
              width: "1600px",
              height: "800px",
              maxWidth: "100%",
              display: "inline-block",
            }}
            src="https://muszynova.oos.pl/calendar"
          />
        </div>
      </section>
    </>
  );
}
