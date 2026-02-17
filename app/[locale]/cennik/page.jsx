import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ButtonGreen from "@/app/UI/Buttons/ButtonGreen";
import Header from "@/app/UI/Header";

// Stałe dla stylów Tailwind
const TABLE_HEADER_STYLES =
  "hidden sm:grid grid-cols-4 bg-gray-100 text-gray-700 font-semibold text-sm sm:text-base py-3 px-4 rounded-t-lg";
const ROW_STYLES =
  "flex flex-col sm:grid sm:grid-cols-4 border-b border-gray-200 py-4 px-4 text-sm sm:text-base gap-2 sm:gap-0";
const SUBSECTION_STYLES =
  "bg-gray-50 font-bold text-customGreen px-4 py-3 border-b border-gray-200 text-base sm:text-lg";
const SECTION_TITLE_STYLES =
  "text-2xl sm:text-3xl font-semibold text-customGold mb-4 border-b border-gray-300 pb-2";
const CONTAINER_STYLES = "mx-auto px-4 sm:px-6 xl:px-24 max-w-7xl";

// Generowanie metadanych dla strony
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

// Główny komponent strony cennika
export default function PricingPage() {
  const t = useTranslations("pricing");

  // Komponent nagłówka tabeli
  const TableHeader = () => (
    <div className={TABLE_HEADER_STYLES}>
      <div>Usługa</div>
      <div>Czas</div>
      <div className="text-center">Pn–Pt</div>
      <div className="text-center">Sb–Nd</div>
    </div>
  );

  // Komponent wiersza tabeli
  const PricingRow = ({ name, time, weekday, weekend, price }) => (
    <div className={ROW_STYLES}>
      <div className="font-medium text-gray-900 sm:font-normal">{name}</div>
      <div className="text-gray-600">
        <span className="sm:hidden font-medium">Czas: </span>
        {time}
      </div>
      {price ? (
        <div className="col-span-2 text-gray-700 sm:text-center">
          <span className="sm:hidden font-medium">Cena: </span>
          {price}
        </div>
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
            <SubSection title="Hala sportowa" />
            <PricingRow
              name="Sporty drużynowe"
              time="1 h"
              weekday="120 zł"
              weekend="140 zł"
            />
            <PricingRow
              name="Badminton / Tenis"
              time="1 h"
              weekday="50 zł"
              weekend="60 zł"
            />

            <SubSection title="Ścianka wspinaczkowa" />
            <PricingRow
              name="Karnet 5x na dowolne zajęcia"
              time="5 wejść"
              price="200 zł"
            />
            <PricingRow
              name="Zajęcia grupowe z operatorem"
              time="1 h"
              price="250 zł"
            />

            <SubSection title="Squash" />
            <PricingRow
              name="Bilet"
              time="1 h"
              weekday="50 zł"
              weekend="55 zł"
            />
            <PricingRow name="Karnet 5x" time="5 × 1 h" price="220 zł" />

            <SubSection title="Wypożyczalnia rowerów" />
            <PricingRow
              name="Rower górski + osprzęt"
              time="4 h"
              price="30 zł"
            />
            <PricingRow
              name="Rower górski + osprzęt"
              time="doba"
              price="50 zł"
            />
            <PricingRow
              name="Rower górski + osprzęt"
              time="tydzień"
              price="250 zł"
            />
          </Section>

          {/* Sekcja Kids & Fun */}
          <Section title="Kids & Fun">
            <SubSection title="Sala zabaw + Sala multimedialna" />
            <PricingRow
              name="Bilet wstępu"
              time="0,5 h"
              weekday="15 zł"
              weekend="20 zł"
            />
            <PricingRow
              name="Bilet wstępu"
              time="1 h"
              weekday="25 zł"
              weekend="30 zł"
            />
            <PricingRow
              name="Bilet wstępu"
              time="2 h"
              weekday="35 zł"
              weekend="40 zł"
            />
            <PricingRow
              name="Bilet wstępu"
              time="bez limitu"
              weekday="50 zł"
              weekend="60 zł"
            />
            <PricingRow
              name="Karnet 5 wejść po 1 h (dowolność wykorzystania)"
              time="5x 1 h"
              weekday="100 zł"
              weekend="115 zł"
            />

            <SubSection title="Sala gier" />
            <PricingRow
              name="Bilard"
              time="1 h"
              weekday="30 zł"
              weekend="35 zł"
            />
            <PricingRow
              name="Tenis stołowy"
              time="1 h"
              weekday="20 zł"
              weekend="25 zł"
            />
            <PricingRow
              name="Air Hockey"
              time="15 min"
              weekday="12 zł"
              weekend="13 zł"
            />
            <PricingRow
              name="Piłkarzyki"
              time="15 min"
              weekday="12 zł"
              weekend="13 zł"
            />
            <PricingRow
              name="Sala gier – wyłączność"
              time="1 h"
              weekday="150 zł"
              weekend="170 zł"
            />

            <SubSection title="Mini kręgielnia" />
            <PricingRow
              name="1 tor"
              time="1 h"
              weekday="45 zł"
              weekend="55 zł"
            />
            <PricingRow
              name="1 tor"
              time="2 h (lub 2 tory * 1 h)"
              weekday="80 zł"
              weekend="100 zł"
            />
            <PricingRow
              name="Karnet 5 wejść po 1 h"
              time="5 * 1 h"
              price="210 zł"
            />
          </Section>

          {/* Sekcja Fitness Sport */}
          <Section title="Fitness Sport">
            <SubSection title="Siłownia" />
            <PricingRow
              name="Bilet jednorazowy"
              time="11:00 – 21:00"
              weekday="15 zł"
              weekend="20 zł"
            />
            <PricingRow
              name="Karnet 5x OPEN"
              time="08:00 – 21:00"
              price="59 zł"
            />
            <PricingRow
              name="Karnet poranny"
              time="08:00 – 11:00"
              price="69 zł"
            />
            <PricingRow
              name="Karnet miesięczny OPEN"
              time="bez limitów"
              price="129 zł"
            />
            <PricingRow
              name="Karnet uczeń/student/senior OPEN"
              time="bez limitów"
              price="109 zł"
            />

            <SubSection title="Fitness" />
            <PricingRow
              name="Bilet jednorazowy"
              time="1 h"
              price="20 zł dzieci / 30 zł dorośli"
            />
            <PricingRow
              name="Karnet 5 wejść"
              time="5 ×"
              price="80 zł dzieci / 135 zł dorośli"
            />
            <PricingRow name="OPEN" time="3 × / tydz" price="199 zł" />
          </Section>

          {/* Sekcja Wypożyczalnia */}
          <Section title="Wypożyczalnia">
            <PricingRow name="Piłka (gry zespołowe)" time="1 h" price="10 zł" />
            <PricingRow name="Komplet do badmintona" time="1 h" price="10 zł" />
            <PricingRow
              name="Komplet do tenisa stołowego"
              time="1 h"
              price="5 zł"
            />
            <PricingRow name="Piłka do Squash" time="1 h" price="5 zł" />
            <PricingRow name="Rakieta do Squash" time="1 h" price="5 zł" />
            <PricingRow name="Komplet do Squash" time="1 h" price="10 zł" />
            <PricingRow name="Buty wspinaczkowe" time="1,5 h" price="15 zł" />
          </Section>

          {/* Uwagi i rabaty */}
          <div className="text-sm sm:text-base text-gray-600 mt-10 space-y-3 sm:space-y-2">
            <p>
              <strong>RABAT:</strong> 10 zł za kontynuację karnetów
            </p>
            <ul className="list-disc pl-6 space-y-2 sm:space-y-1">
              <li>
                Czas wszystkich atrakcji liczony jest z chwilą wejścia na
                konkretną salę i uwzględnia czas na przebranie
              </li>
              <li>
                Ścianka wspinaczkowa otwarta jest w określonych dniach i
                godzinach uwzględnionych w harmonogramie
              </li>
              <li>
                Wszystkie karnety czasowe są imienne i nie ma możliwości
                wymiennego korzystania
              </li>
              <li>Karnety ilościowe mogą być używane przez różne osoby</li>
              <li>
                Jednorazowa opłata za wydanie karty klubowej MUSZYNOVA - 20 zł
              </li>
              <li>
                Zajęcia fitness odbywają się według ustalonego harmonogramu -
                minimum 6 os
              </li>
              <li>
                Zajęcia na ściance (indywidualnie i sekcja) odbywają się według
                ustalonego harmonogramu - minimum 4 os
              </li>
    
                 <li>
                Na jednym torze do kręgli może grać jednorazowo maksymalnie 8 osób.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
