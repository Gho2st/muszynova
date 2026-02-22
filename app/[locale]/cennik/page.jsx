import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/app/UI/Header";

const TABLE_HEADER_STYLES =
  "hidden sm:grid grid-cols-4 bg-gray-100 text-gray-700 font-semibold text-sm sm:text-base py-3 px-4 rounded-t-lg";
const ROW_STYLES =
  "flex flex-col sm:grid sm:grid-cols-4 border-b border-gray-200 py-4 px-4 text-sm sm:text-base gap-2 sm:gap-0";
const SUBSECTION_STYLES =
  "bg-gray-50 font-bold text-customGreen px-4 py-3 border-b border-gray-200 text-base sm:text-lg";
const SECTION_TITLE_STYLES =
  "text-2xl sm:text-3xl font-semibold text-customGold mb-4 border-b border-gray-300 pb-2";
const CONTAINER_STYLES = "mx-auto px-4 sm:px-6 xl:px-24 max-w-7xl";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.pricing" });

  const path = routing.pathnames["/cennik"][locale];
  const canonicalUrl =
    locale === "pl"
      ? `https://muszynova.pl${path}`
      : `https://muszynova.pl/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: canonicalUrl },
  };
}

export default function PricingPage() {
  const t = useTranslations("pricing");

  const TableHeader = () => (
    <div className={TABLE_HEADER_STYLES}>
      <div className="capitalize">{t("sports.activity")}</div>
      <div className="capitalize">{t("sports.time")}</div>
      <div className="text-center">Pn–Pt</div>
      <div className="text-center">Sb–Nd</div>
    </div>
  );

  // Komponent wiersza tabeli
  const PricingRow = ({ name, time, weekday, weekend, price }) => (
    <div className={ROW_STYLES}>
      <div className="font-medium text-gray-900 sm:font-normal">{name}</div>
      <div className="text-gray-600">
        <span className="sm:hidden font-medium">{t("sports.time")} </span>
        {time}
      </div>
      {price ? (
        <div className="col-span-2 text-gray-700 sm:text-center">{price}</div>
      ) : (
        <>
          <div className="text-gray-700 sm:text-center">
            <span className="sm:hidden font-medium">Pn–Pt: </span>
            {weekday}
          </div>
          <div className="text-gray-700 sm:text-center">
            <span className="sm:hidden font-medium">Sb–Nd: </span>
            {weekend}
          </div>
        </>
      )}
    </div>
  );

  // Komponent podsekcji
  const SubSection = ({ title }) => (
    <div className={SUBSECTION_STYLES}>{title}</div>
  );

  // Komponent sekcji
  const Section = ({ title, children }) => (
    <div className="mb-12">
      <h2 className={SECTION_TITLE_STYLES}>{title}</h2>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <TableHeader />
        <div>{children}</div>
      </div>
    </div>
  );

  return (
    <>
      <Header text={t("header")} />
      <section className="py-12 sm:py-16 xl:py-20 bg-white text-gray-900">
        <div className={CONTAINER_STYLES}>
          {/* Sekcja Active Sport */}
          <Section title="Active Sport">
            <SubSection title={t("sports.hall.1")} />
            <PricingRow
              name={t("sports.hall.2")}
              time="1 h"
              weekday="120 zł"
              weekend="140 zł"
            />
            <PricingRow
              name={t("sports.hall.3")}
              time="1 h"
              weekday="50 zł"
              weekend="60 zł"
            />

            <SubSection title={t("sports.climbingwall.1")} />
            <PricingRow
              name={t("sports.climbingwall.2")}
              time="5x"
              price="200 zł"
            />
            <PricingRow
              name={t("sports.climbingwall.3")}
              time="1 h"
              price="250 zł"
            />

            <SubSection title="Squash" />
            <PricingRow
              name={t("sports.squash.1")}
              time="1 h"
              weekday="50 zł"
              weekend="55 zł"
            />
            <PricingRow
              name={t("sports.squash.2")}
              time="5 × 1 h"
              price="220 zł"
            />

            <SubSection title={t("sports.bikes.1")} />
            <PricingRow name={t("sports.bikes.2")} time="4 h" price="30 zł" />
            <PricingRow name={t("sports.bikes.2")} time="24 h" price="50 zł" />
            <PricingRow name={t("sports.bikes.2")} time="7d" price="250 zł" />
          </Section>

          {/* Sekcja Kids & Fun */}
          <Section title="Kids & Fun">
            <SubSection title={t("sports.kids.1")} />
            <PricingRow
              name={t("sports.kids.2")}
              time="0,5 h"
              weekday="15 zł"
              weekend="20 zł"
            />
            <PricingRow
              name={t("sports.kids.2")}
              time="1 h"
              weekday="25 zł"
              weekend="30 zł"
            />
            <PricingRow
              name={t("sports.kids.2")}
              time="2 h"
              weekday="35 zł"
              weekend="40 zł"
            />
            <PricingRow
              name={t("sports.kids.2")}
              time={t("sports.kids.4")}
              weekday="50 zł"
              weekend="60 zł"
            />
            <PricingRow
              name={t("sports.kids.3")}
              time="5x 1 h"
              weekday="100 zł"
              weekend="115 zł"
            />

            <SubSection title={t("sports.games.1")} />
            <PricingRow
              name={t("sports.games.2")}
              time="1 h"
              weekday="30 zł"
              weekend="35 zł"
            />
            <PricingRow
              name={t("sports.games.3")}
              time="1 h"
              weekday="20 zł"
              weekend="25 zł"
            />
            <PricingRow
              name={t("sports.games.4")}
              time="15 min"
              weekday="12 zł"
              weekend="13 zł"
            />
            <PricingRow
              name={t("sports.games.5")}
              time="15 min"
              weekday="12 zł"
              weekend="13 zł"
            />
            <PricingRow
              name={t("sports.games.6")}
              time="1 h"
              weekday="150 zł"
              weekend="170 zł"
            />

            <SubSection title={t("sports.bowling.1")} />
            <PricingRow
              name={t("sports.bowling.2")}
              time="1 h"
              weekday="45 zł"
              weekend="55 zł"
            />
            <PricingRow
              name={t("sports.bowling.2")}
              time={t("sports.bowling.4")}
              weekday="80 zł"
              weekend="100 zł"
            />
            <PricingRow
              name={t("sports.bowling.3")}
              time="5 * 1 h"
              price="210 zł"
            />
          </Section>

          {/* Sekcja Fitness Sport */}
          <Section title="Fitness Sport">
            <SubSection title={t("sports.fitness.gym")} />
            <PricingRow
              name={t("sports.fitness.1")}
              time="11:00 – 21:00"
              weekday="15 zł"
              weekend="20 zł"
            />
            <PricingRow
              name={t("sports.fitness.2")}
              time="08:00 – 21:00"
              price="59 zł"
            />
            <PricingRow
              name={t("sports.fitness.3")}
              time="08:00 – 11:00"
              price="69 zł"
            />
            <PricingRow
              name={t("sports.fitness.4")}
              time={t("sports.fitness.6")}
              price="129 zł"
            />
            <PricingRow
              name={t("sports.fitness.5")}
              time={t("sports.fitness.6")}
              price="109 zł"
            />

            <SubSection title="Fitness" />
            <PricingRow
              name={t("sports.fitness.1")}
              time="1 h"
              price="20 zł dzieci / 30 zł dorośli"
            />
            <PricingRow
              name={t("sports.fitness.8")}
              time="5 ×"
              price="80 zł dzieci / 135 zł dorośli"
            />
            <PricingRow
              name="OPEN"
              time={t("sports.fitness.7")}
              price="199 zł"
            />
          </Section>

          {/* Sekcja Wypożyczalnia */}
          <Section title={t("sports.rental.header")}>
            <PricingRow name={t("sports.rental.1")} time="1 h" price="10 zł" />
            <PricingRow name={t("sports.rental.2")} time="1 h" price="10 zł" />
            <PricingRow name={t("sports.rental.3")} time="1 h" price="5 zł" />
            <PricingRow name={t("sports.rental.4")} time="1 h" price="5 zł" />
            <PricingRow name={t("sports.rental.5")} time="1 h" price="5 zł" />
            <PricingRow name={t("sports.rental.6")} time="1 h" price="10 zł" />
            <PricingRow
              name={t("sports.rental.7")}
              time="1,5 h"
              price="15 zł"
            />
          </Section>

          {/* Uwagi i rabaty */}
          <div className="text-sm sm:text-base text-gray-600 mt-10 space-y-3 sm:space-y-2">
            <p>{t("info.1")}</p>
            <ul className="list-disc pl-6 space-y-2 sm:space-y-1">
              {[...Array(8)].map((_, i) => (
                <li key={i}>{t(`info.${i + 2}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
