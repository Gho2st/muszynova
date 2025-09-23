import Header from "@/app/UI/Header";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({
    locale,
    namespace: "metadata.polityka-cookies",
  });

  const path = routing.pathnames["/polityka-cookies"][locale];
  const canonicalUrl =
    locale === "pl"
      ? `https://triotravel.pl${path}`
      : `https://triotravel.pl/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function PolitykaCookies() {
  const t = useTranslations("polityka-cookies");
  const tWhich = useTranslations("polityka-cookies.which.list");
  const tAnalytics = useTranslations(
    "polityka-cookies.which.list.analytics.items"
  );
  const tAdvertising = useTranslations(
    "polityka-cookies.which.list.advertising.items"
  );
  const tHow = useTranslations("polityka-cookies.how.list");
  const tBrowsers = useTranslations("polityka-cookies.how.browsers.links");
  const tHowLong = useTranslations("polityka-cookies.howlong.list");
  const tTransfer = useTranslations("polityka-cookies.transfer.links");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header text={t("header")} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-6">{t("text")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            {t("which.header")}
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>{tWhich("essential.header")}</strong>:{" "}
              {tWhich("essential.text")}
            </li>
            <li>
              <strong>{tWhich("analytics.header")}</strong>:{" "}
              {tWhich("analytics.text")}
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>{tAnalytics("ga4")}</li>
              </ul>
            </li>
            <li>
              <strong>{tWhich("advertising.header")}</strong>:{" "}
              {tWhich("advertising.text")}
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>{tAdvertising("googleAds")}</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            {t("additional.header")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t("additional.text")}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            {t("how.header")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t("how.text")}</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>{tHow("acceptAll")}</li>
            <li>{tHow("rejectNonEssential")}</li>
            <li>{tHow("customize")}</li>
            <li>{tHow("manage")}</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            {t("how.browsers.text")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
            <li>
              <Link
                href={tBrowsers("chrome").match(/\((.*?)\)/)[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Chrome
              </Link>
            </li>
            <li>
              <Link
                href={tBrowsers("firefox").match(/\((.*?)\)/)[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Firefox
              </Link>
            </li>
            <li>
              <Link
                href={tBrowsers("safari").match(/\((.*?)\)/)[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Safari
              </Link>
            </li>
            <li>
              <Link
                href={tBrowsers("edge").match(/\((.*?)\)/)[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Microsoft Edge
              </Link>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            {t("howlong.header")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t("howlong.text")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>{tHowLong("essential")}</li>
            <li>{tHowLong("analytics")}</li>
            <li>{tHowLong("advertising")}</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            {t("transfer.header")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t("transfer.text")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <Link
                href={tTransfer("google").match(/\((.*?)\)/)[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google
              </Link>
            </li>
            <li>
              <Link
                href={tTransfer("microsoft").match(/\((.*?)\)/)[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Microsoft
              </Link>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            {t("change.header")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t("change.text")}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            {t("contact.header")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t("contact.text")}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <Link
                href="mailto:biuro@triotravel.eu"
                className="text-blue-600 hover:underline"
              >
                biuro@triotravel.eu
              </Link>
            </li>
            <li>
              <Link
                href="tel:+48881201205"
                className="text-blue-600 hover:underline"
              >
                +48 881 201 205
              </Link>
            </li>
            <li>ul. Kościuszki 23A, 34-500 Zakopane</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
