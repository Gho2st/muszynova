import { Poppins } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Nav from "../UI/Nav/Nav";
import Footer from "../UI/Footer/Footer";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import CookieConsent from "../UI/CookieConsent";
import FacebookPixel from "../UI/FacebookPixel";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
export const metadata = {
  // Open Graph
  openGraph: {
    type: "website",
    url: "https://muszynova.pl/",
    title: "Muszynova",
    description: "Sport and Fun for young and old at a nOvy level",
    images: "https://muszynova.pl/opengraph-image.png",
  },
  other: {
    preload: `<link rel="preload" as="image" href="/Muszynova-hotel.webp" type="image/webp" />`,
  },
};

export default async function LocaleLayout({ children, params }) {
  // Upewnij się, że `params` jest obiektem, a nie Promise
  const locale = (await params).locale;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${font.className} pt-24`}>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <CookieConsent />
          <FacebookPixel />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
