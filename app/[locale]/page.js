import Hero from "../Homepage/Hero";
import About from "../Homepage/About";
import Services from "../Homepage/Services";
import Restaurant from "../Homepage/Restaurant";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import VirtualTour from "../Homepage/VirtualTour";
import Reviews from "../Homepage/Reviews";
import Blog from "../Homepage/Blog";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.homepage" });

  const defaultLocale = "pl"; // Ustaw domyślny język
  const canonicalUrl =
    locale === defaultLocale
      ? "https://muszynova.pl"
      : `https://muszynova.pl/${locale}`;

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
  const tblog = useTranslations("blog");
  const tservices = useTranslations("services");
  const trestaurant = useTranslations("restaurant");

  return (
    <>
      <Hero t={thero} />
      <About t={tabout} />
      <Services t={tservices} />
      <Reviews />
      <Restaurant t={trestaurant} />
      <Blog t={tblog} />
      <VirtualTour />
    </>
  );
}
