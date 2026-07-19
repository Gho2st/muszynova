import { Poppins } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Nav from "../UI/Nav/Nav";
import Footer from "../UI/Footer/Footer";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import CookieConsent from "../UI/CookieConsent";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
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
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>
      </head>
      <body className={`${font.className} pt-24`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Nav />
          <CookieConsent />
          <main>{children}</main>
          <Footer />
          <GoogleTagManager gtmId="GTM-TR69S642" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
