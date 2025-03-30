import PartnerItem from "@/app/UI/PartnerItem";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.partners",
  });

  const path = routing.pathnames["/partnerzy"][locale]; // Pobieramy ścieżkę dla języka
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

export default function Partners() {
  const t = useTranslations("partners");
  // Tablica linków dla partnerów
  const partnerLinks = {
    muszyna: "https://muszyna.pl",
    academy: "https://www.topkids-muszyna.pl/",
    alpina: "https://www.alpinasport.pl/",
    kolejarz: "https://www.dwkolejarz.pl/",
    hospital: "https://20wszur.pl/",
    artur: "https://trenerodadoz.pl/",
    activ: "https://activ-vital.pl/",
    relaks: "https://muszyna-domnawzgorzu.pl/",
    revita: "https://sanatorium-revita.pl/",
    aquapark: "https://www.aquaparklipany.eu/language/pl/home-1/",
    krynica: "https://www.krynica-zdroj.pl/",
    hotel: "https://hotelmuszyna.eu/",
  };

  return (
    <section className="px-6 md:px-20 xl:px-44 py-16 xl:py-24">
      <h1 className="text-center text-3xl xl:text-5xl mb-16 md:mb-24 xl:mb-32 font-bold text-customGold break-words">
        {t("title")}
      </h1>
      <div className="mt-16 flex flex-col gap-32">
        {[
          "muszyna",
          "academy",
          "alpina",
          "kolejarz",
          "hospital",
          "artur",
          "activ",
          "relaks",
          "revita",
          "aquapark",
          "krynica",
          "hotel",
        ].map((partner, index) => (
          <PartnerItem
            key={partner} // zostaje dla reacta
            partner={partner}
            f={t}
            t={t.raw(partner)}
            index={index}
            link={partnerLinks[partner]} // Przekazujemy link
          />
        ))}
      </div>
    </section>
  );
}
