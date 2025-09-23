import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ButtonGreen from "@/app/UI/Buttons/ButtonGreen";
import Header from "@/app/UI/Header";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "metadata.pricing" });

  const path = routing.pathnames["/cennik"][locale];
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

export default function Cennik() {
  const t = useTranslations("pricing");

  const TableHeader = () => (
    <div className="hidden sm:grid grid-cols-4 bg-gray-100 text-gray-700 font-semibold text-sm sm:text-base py-3 px-4 rounded-t-lg">
      <div>Usługa</div>
      <div>Czas</div>
      <div className="text-center">Pn–Pt</div>
      <div className="text-center">Sb–Nd</div>
    </div>
  );

  const Row = ({ name, time, weekday, weekend, price }) => (
    <div className="flex flex-col sm:grid sm:grid-cols-4 border-b border-gray-200 py-4 px-4 text-sm sm:text-base gap-2 sm:gap-0">
      {/* Mobile: Stack name, time, and prices vertically with clear labels */}
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
            <span className="sm:hidden font-medium ">Pn–Pt: </span>
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

  const SubSection = ({ title }) => (
    <div className="bg-gray-50 font-bold text-customGreen px-4 py-3 border-b border-gray-200 text-base sm:text-lg">
      {title}
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-customGold mb-4 border-b border-gray-300 pb-2">
        {title}
      </h2>
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
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12 sm:mb-16">
          <ButtonGreen text={t("button")} link="/seniorzy.pdf" />
          <ButtonGreen text={t("button2")} link="/szkoly-przedszkola.pdf" />
        </div>

        <div className="mx-auto px-4 sm:px-6 xl:px-24 max-w-7xl">
          {/* Active Sport */}
          <Section title="Active Sport">
            <SubSection title="Hala sportowa" />
            <Row
              name="Sporty drużynowe"
              time="1 h"
              weekday="120 zł"
              weekend="140 zł"
            />
            <Row
              name="Badminton / Tenis"
              time="1 h"
              weekday="50 zł"
              weekend="60 zł"
            />

            <SubSection title="Ścianka wspinaczkowa" />
            <Row
              name="Karnet 5x na dowolne zajęcia"
              time="5 wejść"
              price="200 zł"
            />
            <Row
              name="Zajęcia grupowe z operatorem"
              time="1 h"
              price="250 zł"
            />

            <SubSection title="Squash" />
            <Row name="Bilet" time="1 h" weekday="50 zł" weekend="55 zł" />
            <Row name="Karnet 5x" time="5 × 1 h" price="220 zł" />

            <SubSection title="Wypożyczalnia rowerów" />
            <Row name="Rower górski + osprzęt" time="4 h" price="30 zł" />
            <Row name="Rower górski + osprzęt" time="doba" price="50 zł" />
            <Row name="Rower górski + osprzęt" time="tydzień" price="250 zł" />
          </Section>

          {/* Kids & Fun */}
          <Section title="Kids & Fun">
            <SubSection title="Sala zabaw + Sala multimedialna" />
            <Row
              name="Bilet wstępu"
              time="0,5 h"
              weekday="15 zł"
              weekend="20 zł"
            />
            <Row
              name="Bilet wstępu"
              time="1 h"
              weekday="25 zł"
              weekend="30 zł"
            />
            <Row
              name="Bilet wstępu"
              time="2 h"
              weekday="35 zł"
              weekend="40 zł"
            />
            <Row
              name="Bilet wstępu"
              time="bez limitu"
              weekday="50 zł"
              weekend="60 zł"
            />
            <Row
              name="Karnet 5 wejść po 1 h (dowolność wykorzystania)"
              time="5x 1 h"
              weekday="100 zł"
              weekend="115 zł"
            />

            <SubSection title="Sala gier" />
            <Row name="Bilard" time="1 h" weekday="30 zł" weekend="35 zł" />
            <Row
              name="Tenis stołowy"
              time="1 h"
              weekday="20 zł"
              weekend="25 zł"
            />
            <Row
              name="Air Hockey"
              time="15 min"
              weekday="12 zł"
              weekend="13 zł"
            />
            <Row
              name="Piłkarzyki"
              time="15 min"
              weekday="12 zł"
              weekend="13 zł"
            />
            <Row
              name="Sala gier – wyłączność"
              time="1 h"
              weekday="150 zł"
              weekend="170 zł"
            />

            <SubSection title="Mini kręgielnia" />
            <Row name="1 tor" time="1 h" weekday="45 zł" weekend="55 zł" />
            <Row
              name="1 tor"
              time="2 h (lub 2 tory * 1 h)"
              weekday="80 zł"
              weekend="100 zł"
            />
            <Row name="Karnet 5 wejść po 1 h" time="5 * 1 h" price="210 zł" />
          </Section>

          {/* Fitness Sport */}
          <Section title="Fitness Sport">
            <SubSection title="Siłownia" />
            <Row
              name="Bilet jednorazowy"
              time="11:00 – 21:00"
              weekday="15 zł"
              weekend="20 zł"
            />
            <Row name="Karnet 5x OPEN" time="08:00 – 21:00" price="59 zł" />
            <Row name="Karnet poranny" time="08:00 – 11:00" price="69 zł" />
            <Row
              name="Karnet miesięczny OPEN"
              time="bez limitów"
              price="129 zł"
            />
            <Row
              name="Karnet uczeń/student/senior OPEN"
              time="bez limitów"
              price="109 zł"
            />

            <SubSection title="Fitness" />
            <Row
              name="Bilet jednorazowy"
              time="1 h"
              price="20 zł dzieci / 30 zł dorośli"
            />
            <Row
              name="Karnet 5 wejść"
              time="5 ×"
              price="80 zł dzieci / 135 zł dorośli"
            />
            <Row name="OPEN" time="3 × / tydz" price="199 zł" />
          </Section>

          {/* Wypożyczalnia */}
          <Section title="Wypożyczalnia">
            <Row name="Piłka (gry zespołowe)" time="1 h" price="10 zł" />
            <Row name="Komplet do badmintona" time="1 h" price="10 zł" />
            <Row name="Komplet do tenisa stołowego" time="1 h" price="5 zł" />
            <Row name="Piłka do Squash" time="1 h" price="5 zł" />
            <Row name="Rakieta do Squash" time="1 h" price="5 zł" />
            <Row name="Komplet do Squash" time="1 h" price="10 zł" />
            <Row name="Buty wspinaczkowe" time="1,5 h" price="15 zł" />
          </Section>

          {/* Notes: Increased font size and spacing for mobile */}
          <div className="text-sm sm:text-base text-gray-600 mt-10 space-y-3 sm:space-y-2">
            <p>
              <strong>RABAT:</strong> 10 zł za kontynuację karnetów
            </p>
            <p>
              <strong>RABAT:</strong> 10 % dla Klubowiczów posiadających kartę
              MUSZYNOVA
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
                minimum 4 os
              </li>
              <li>
                Zajęcia na ściance (indywidualnie i sekcja) odbywają się według
                ustalonego harmonogramu - minimum 2 os
              </li>
              <li>
                Limit osób na zajęcia grupowe - 10, Dopłata za każdą osobę +15
                zł, Dopłata za dodatkowego operatora
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
