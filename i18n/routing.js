import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Lista wszystkich obsługiwanych języków
  locales: ["pl", "en", "sk", "ua", "de"],

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
      de: "/",
    },
    "/o-nas": {
      pl: "/o-nas",
      en: "/about-us",
      sk: "/o-nas",
      ua: "/pro-nas",
      de: "/ueber-uns",
    },
    "/park": {
      pl: "/park",
      en: "/park",
      sk: "/park",
      ua: "/park",
      de: "/park",
    },
    "/park/silownia": {
      pl: "/park/silownia",
      en: "/park/gym",
      sk: "/park/posilnovna",
      ua: "/park/trenazhernyi-zal",
      de: "/park/fitnessstudio",
    },
    "/park/fitness": {
      pl: "/park/fitness",
      en: "/park/fitness",
      sk: "/park/fitness",
      ua: "/park/fitnes",
      de: "/park/fitness",
    },
    "/park/hala-sportowa": {
      pl: "/park/hala-sportowa",
      en: "/park/sports-hall",
      sk: "/park/sportova-hala",
      ua: "/park/sportyvnyi-zal",
      de: "/park/sporthalle",
    },
    "/park/mini-kregielnia": {
      pl: "/park/mini-kregielnia",
      en: "/park/mini-bowling",
      sk: "/park/mini-kugeľna",
      ua: "/park/mini-boulinh",
      de: "/park/mini-bowling",
    },
    "/park/scianka-wspinaczkowa": {
      pl: "/park/scianka-wspinaczkowa",
      en: "/park/climbing-wall",
      sk: "/park/lezecka-stena",
      ua: "/park/skeledrom",
      de: "/park/kletterwand",
    },
    "/park/sala-zabaw": {
      pl: "/park/sala-zabaw",
      en: "/park/playroom",
      sk: "/park/herna-pre-deti",
      ua: "/park/dytiacha-ihrova-kimnata",
      de: "/park/spieleraum",
    },
    "/park/squash": {
      pl: "/park/squash",
      en: "/park/squash",
      sk: "/park/squash",
      ua: "/park/skvosh",
      de: "/park/squash",
    },
    "/park/wypozyczalnia-rowerow": {
      pl: "/park/wypozyczalnia-rowerow",
      en: "/park/bike-rental",
      sk: "/park/požičovňa-bicyklov",
      ua: "/park/prokat-velosypediv",
      de: "/park/fahrradverleih",
    },
    "/park/sala-gier": {
      pl: "/park/sala-gier",
      en: "/park/game-room",
      sk: "/park/herna",
      ua: "/park/ihrova-zala",
      de: "/park/spieleraum",
    },
    "/park/sala-multimedialna": {
      pl: "/park/sala-multimedialna",
      en: "/park/multimedia-room",
      sk: "/park/multimedialna-miestnosť",
      ua: "/park/multymediyna-zala",
      de: "/park/multimediasaal",
    },
    "/galeria": {
      pl: "/galeria",
      en: "/gallery",
      sk: "/galeria",
      ua: "/halereya",
      de: "/galerie",
    },
    "/galeria/park": {
      pl: "/galeria/park",
      en: "/gallery/park",
      sk: "/galeria/park",
      ua: "/halereya/park",
      de: "/galerie/park",
    },
    "/galeria/restauracja": {
      pl: "/galeria/restauracja",
      en: "/gallery/restaurant",
      sk: "/galeria/restauracia",
      ua: "/halereya/restoran",
      de: "/galerie/restaurant",
    },
    "/restauracja": {
      pl: "/restauracja",
      en: "/restaurant",
      sk: "/restauracia",
      ua: "/restoran",
      de: "/restaurant",
    },
    "/cennik": {
      pl: "/cennik",
      en: "/pricing",
      sk: "/cennik",
      ua: "/tsiny",
      de: "/preise",
    },
    "/zajecia-grupowe": {
      pl: "/zajecia-grupowe",
      en: "/group-classes",
      sk: "/skupinove-aktivity",
      ua: "/hrupovi-zanyattya",
      de: "/gruppenkurse",
    },
    "/kontakt": {
      pl: "/kontakt",
      en: "/contact",
      sk: "/kontakt",
      ua: "/kontakty",
      de: "/kontakt",
    },
    "/partnerzy": {
      pl: "/partnerzy",
      en: "/partners",
      sk: "/partneri",
      ua: "/partneri",
      de: "/partner",
    },
    "/dofinansowanie": {
      pl: "/dofinansowanie",
      en: "/funding",
      sk: "/financovanie",
      ua: "/finansuvannia",
      de: "/foerderung",
    },
    "/blog": {
      pl: "/blog",
      en: "/blog",
      sk: "/blog",
      ua: "/blog",
      de: "/blog",
    },
    "/polityka-cookies": {
      pl: "/polityka-cookies",
      en: "/cookie-policy",
      sk: "/pravidla-cookies",
      ua: "/fayliv-cookie",
      de: "/cookie-richtlinie",
    },
    "/admin": {
      pl: "/admin",
    },
    "/restauracja/rezerwacja": {
      pl: "/restauracja/rezerwacja",
    },
    "/restauracja/admin": {
      pl: "/restauracja/admin",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
