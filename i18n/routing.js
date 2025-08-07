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
      ua: "/",
    },
    "/o-nas": {
      pl: "/o-nas",
      en: "/about-us",
      sk: "/o-nas",
      ua: "/pro-nas",
    },
    "/park": {
      pl: "/park",
      en: "/park",
      sk: "/park",
      ua: "/park",
    },
    "/park/silownia": {
      pl: "/park/silownia",
      en: "/park/gym",
      sk: "/park/posilnovna",
      ua: "/park/trenazhernyi-zal",
    },
    "/park/fitness": {
      pl: "/park/fitness",
      en: "/park/fitness",
      sk: "/park/fitness",
      ua: "/park/fitnes",
    },
    "/park/hala-sportowa": {
      pl: "/park/hala-sportowa",
      en: "/park/sports-hall",
      sk: "/park/sportova-hala",
      ua: "/park/sportyvnyi-zal",
    },
    "/park/mini-kregielnia": {
      pl: "/park/mini-kregielnia",
      en: "/park/mini-bowling",
      sk: "/park/mini-kugeľna",
      ua: "/park/mini-boulinh",
    },
    "/park/scianka-wspinaczkowa": {
      pl: "/park/scianka-wspinaczkowa",
      en: "/park/climbing-wall",
      sk: "/park/lezecka-stena",
      ua: "/park/skeledrom",
    },
    "/park/sala-zabaw": {
      pl: "/park/sala-zabaw",
      en: "/park/playroom",
      sk: "/park/herna-pre-deti",
      ua: "/park/dytiacha-ihrova-kimnata",
    },
    "/park/squash": {
      pl: "/park/squash",
      en: "/park/squash",
      sk: "/park/squash",
      ua: "/park/skvosh",
    },
    "/park/wypozyczalnia-rowerow": {
      pl: "/park/wypozyczalnia-rowerow",
      en: "/park/bike-rental",
      sk: "/park/požičovňa-bicyklov",
      ua: "/park/prokat-velosypediv",
    },
    "/park/sala-gier": {
      pl: "/park/sala-gier",
      en: "/park/game-room",
      sk: "/park/herna",
      ua: "/park/ihrova-zala",
    },
    "/park/sala-multimedialna": {
      pl: "/park/sala-multimedialna",
      en: "/park/multimedia-room",
      sk: "/park/multimedialna-miestnosť",
      ua: "/park/multymediyna-zala",
    },
    "/galeria": {
      pl: "/galeria",
      en: "/gallery",
      sk: "/galeria",
      ua: "/halereya",
    },
    "/galeria/park": {
      pl: "/galeria/park",
      en: "/gallery/park",
      sk: "/galeria/park",
      ua: "/halereya/park",
    },
    "/galeria/restauracja": {
      pl: "/galeria/restauracja",
      en: "/gallery/restaurant",
      sk: "/galeria/restauracia",
      ua: "/halereya/restoran",
    },
    "/restauracja": {
      pl: "/restauracja",
      en: "/restaurant",
      sk: "/restauracia",
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
      ua: "/hrupovi-zanyattya",
    },
    "/kontakt": {
      pl: "/kontakt",
      en: "/contact",
      sk: "/kontakt",
      ua: "/kontakty",
    },
    "/partnerzy": {
      pl: "/partnerzy",
      en: "/partners",
      sk: "/partneri",
      ua: "/partneri",
    },

    "/dofinansowanie": {
      pl: "/dofinansowanie",
      en: "/funding",
      sk: "/financovanie",
      ua: "/finansuvannia",
    },
    "/blog": {
      pl: "/blog",
      en: "/blog",
      sk: "/blog",
      ua: "/blog",
    },
    "/blog/muszyna-10-najlepszych-atrakcji": {
      pl: "/blog/muszyna-10-najlepszych-atrakcji",
      en: "/blog/muszyna-10-best-attractions",
      sk: "/blog/muszyna-10-najlepsich-atrakcii",
      ua: "/blog/muszyna-10-naykrashchykh-atraktsiy",
    },
    "/blog/muszyna-najlepsze-szlaki-turystyczne": {
      pl: "/blog/muszyna-najlepsze-szlaki-turystyczne",
      en: "/blog/muszyna-best-hiking-trails",
      sk: "/blog/muszyna-najlepsie-turisticke-trasy",
      ua: "/blog/muszyna-naykrashchi-turystychni-marshruty",
    },
    "/blog/jak-spedzic-weekend-w-muszynie": {
      pl: "/blog/jak-spedzic-weekend-w-muszynie",
      en: "/blog/how-to-spend-a-weekend-in-muszyna",
      sk: "/blog/ako-stravit-vikend-v-musyne",
      ua: "/blog/yak-provesty-vykhidni-v-muszyni",
    },
    "/blog/aktywny-wypoczynek-w-beskidzie-sadeckim": {
      pl: "/blog/aktywny-wypoczynek-w-beskidzie-sadeckim",
      en: "/blog/active-holiday-in-beskid-sadecki",
      sk: "/blog/aktivna-dovolenka-v-beskydach-sadeckych",
      ua: "/blog/aktyvnyi-vidpochynok-v-beskydi-sadetskomu",
    },
    "/blog/historia-squasha": {
      pl: "/blog/historia-squasha",
      en: "/blog/history-of-squash",
      sk: "/blog/historia-squasha",
      ua: "/blog/istoriia-skvoshu",
    },
    "/blog/rowerem-przez-muszyne": {
      pl: "/blog/rowerem-przez-muszyne",
      en: "/blog/cycling-through-muszyna",
      sk: "/blog/na-bicykli-cez-muszynu",
      ua: "/blog/na-velosypedi-cherez-muzhynu",
    },
    "/blog/muszyna-wody-mineralne": {
      pl: "/blog/muszyna-wody-mineralne",
      en: "/blog/mineral-waters-of-muszyna",
      sk: "/blog/mineralne-vody-v-muszyni",
      ua: "/blog/mineralni-vody-u-muzhyni",
    },
    "/blog/lokalne-legendy-i-historie": {
      pl: "/blog/lokalne-legendy-i-historie",
      en: "/blog/local-legends-and-stories",
      sk: "/blog/miestne-legendy-a-príbehy",
      ua: "/blog/mistsevi-lehendy-ta-istoriyi",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
