import Hero from "../Homepage/Hero";
import About from "../Homepage/About";
import Services from "../Homepage/Services";
import Restaurant from "../Homepage/Restaurant";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import VirtualTour from "../Homepage/VirtualTour";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.homepage" });

  const path = routing.pathnames["/kontakt"][locale]; // Pobieramy ścieżkę dla języka
  const canonicalUrl = `https://muszynova.pl/${locale}`; // Dodajemy prefix języka
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Home() {
  const thero = useTranslations("hero");
  const tabout = useTranslations("about");
  const tservices = useTranslations("services");
  const trestaurant = useTranslations("restaurant");
  const tvirtual = useTranslations("virtualtour");

  return (
    <>
      <Hero t={thero} />
      <About t={tabout} />
      <Services t={tservices} />
      <Restaurant t={trestaurant} />
      <VirtualTour t={tvirtual} />
    </>
  );
}
