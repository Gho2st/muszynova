import Hero from "../Homepage/Hero";
import About from "../Homepage/About";
import Services from "../Homepage/Services";
import Restaurant from "../Homepage/Restaurant";
import { getTranslations } from "next-intl/server";
import VirtualTour from "../Homepage/VirtualTour";
import Reviews from "../Homepage/Reviews";
import Blog from "../Homepage/Blog";
import FacebookPosts from "../Homepage/FacebookPosts";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.homepage" });

  const defaultLocale = "pl";
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
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Restaurant />
      <FacebookPosts />
      <Reviews />
      <Blog />
      <VirtualTour />
    </>
  );
}
