import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Lista wszystkich obsługiwanych języków
  locales: ["pl", "en", "sk", "ua"],

  // Domyślny język, gdy żaden nie pasuje
  defaultLocale: "pl",
  localePrefix: "as-needed", // lub 'as-needed', w zależności od potrzeb
  // Tłumaczenie ścieżek dla każdego języka
  pathnames: {
    "/": {
      pl: "/",
      en: "/",
      sk: "/",
      // de: "/",
      ua: "/",
    },
    "/o-nas": {
      pl: "/o-nas",
      en: "/about-us",
      sk: "/o-nas",
      // de: "/uber-uns",
      ua: "/pro-nas",
    },
    "/park": {
      pl: "/park",
      en: "/park",
      sk: "/park",
      // de: "/park",
      ua: "/park",
    },
    "/park/silownia": {
      pl: "/park/silownia",
      en: "/park/gym",
      sk: "/park/posilnovna",
      // de: "/park/fitnessstudio",
      ua: "/park/trenazhernyi-zal",
    },
    "/park/fitness": {
      pl: "/park/fitness",
      en: "/park/fitness",
      sk: "/park/fitness",
      // de: "/park/fitness",
      ua: "/park/fitnes",
    },
    "/park/hala-sportowa": {
      pl: "/park/hala-sportowa",
      en: "/park/sports-hall",
      sk: "/park/sportova-hala",
      // de: "/park/sporthalle",
      ua: "/park/sportyvnyi-zal",
    },
    "/park/mini-kregielnia": {
      pl: "/park/mini-kregielnia",
      en: "/park/mini-bowling",
      sk: "/park/mini-kugeľna",
      // de: "/park/mini-bowling",
      ua: "/park/mini-boulinh",
    },
    "/park/scianka-wspinaczkowa": {
      pl: "/park/scianka-wspinaczkowa",
      en: "/park/climbing-wall",
      sk: "/park/lezecka-stena",
      // de: "/park/kletterwand",
      ua: "/park/skeledrom",
    },
    "/park/sala-zabaw": {
      pl: "/park/sala-zabaw",
      en: "/park/playroom",
      sk: "/park/herna-pre-deti",
      // de: "/park/spielzimmer",
      ua: "/park/dytiacha-ihrova-kimnata",
    },
    "/park/squash": {
      pl: "/park/squash",
      en: "/park/squash",
      sk: "/park/squash",
      // de: "/park/squash",
      ua: "/park/skvosh",
    },
    "/park/wypozyczalnia-rowerow": {
      pl: "/park/wypozyczalnia-rowerow",
      en: "/park/bike-rental",
      sk: "/park/požičovňa-bicyklov",
      // de: "/park/fahrradverleih",
      ua: "/park/prokat-velosypediv",
    },
    "/park/sala-gier": {
      pl: "/park/sala-gier",
      en: "/park/game-room",
      sk: "/park/herna",
      // de: "/park/spielhalle",
      ua: "/park/ihrova-zala",
    },
    "/park/sala-multimedialna": {
      pl: "/park/sala-multimedialna",
      en: "/park/multimedia-room",
      sk: "/park/multimedialna-miestnosť",
      // de: "/park/multimediaroom",
      ua: "/park/multymediyna-zala",
    },
    "/galeria": {
      pl: "/galeria",
      en: "/gallery",
      sk: "/galeria",
      // de: "/galerie",
      ua: "/halereya",
    },
    "/galeria/park": {
      pl: "/galeria/park",
      en: "/gallery/park",
      sk: "/galeria/park",
      // de: "/galerie/park",
      ua: "/halereya/park",
    },
    "/galeria/restauracja": {
      pl: "/galeria/restauracja",
      en: "/gallery/restaurant",
      sk: "/galeria/restauracia",
      // de: "/galerie/restaurant",
      ua: "/halereya/restoran",
    },
    "/restauracja": {
      pl: "/restauracja",
      en: "/restaurant",
      sk: "/restauracia",
      // de: "/restaurant",
      ua: "/restoran",
    },
    "/cennik": {
      pl: "/cennik",
      en: "/pricing",
      sk: "/cennik",
      // de: "/preisliste",
      ua: "/tsiny",
    },
    "/zajecia-grupowe": {
      pl: "/zajecia-grupowe",
      en: "/group-classes",
      sk: "/skupinove-aktivity",
      // de: "/gruppenkurse",
      ua: "/hrupovi-zanyattya",
    },
    "/kontakt": {
      pl: "/kontakt",
      en: "/contact",
      sk: "/kontakt",
      // de: "/kontakt",
      ua: "/kontakty",
    },
    "/partnerzy": {
      pl: "/partnerzy",
      en: "/partners",
      sk: "/partneri",
      // de: "/partner",
      ua: "/партнери",
    },
    "/blog": {
      pl: "/blog",
      en: "/blog",
      sk: "/blog",
      ua: "/блог",
    },
    "/blog/muszyna-10-najlepszych-atrakcji": {
      pl: "/blog/muszyna-10-najlepszych-atrakcji",
      en: "/blog/muszyna-10-best-attractions",
      sk: "/blog/muszyna-10-najlepsich-atrakcii",
      ua: "/блог/мушина-10-найкращих-атракцій",
    },
    "/blog/muszyna-najlepsze-szlaki-turystyczne": {
      pl: "/blog/muszyna-najlepsze-szlaki-turystyczne",
      en: "/blog/muszyna-best-hiking-trails",
      sk: "/blog/muszyna-najlepsie-turisticke-trasy",
      ua: "/блог/мушина-найкращі-туристичні-маршрути",
    },
    "/blog/jak-spedzic-weekend-w-muszynie": {
      pl: "/blog/jak-spedzic-weekend-w-muszynie",
      en: "/blog/how-to-spend-a-weekend-in-muszyna",
      sk: "/blog/ako-stravit-vikend-v-musyne",
      ua: "/блог/як-провести-вихідні-в-мушині",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
