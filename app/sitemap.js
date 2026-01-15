export default function sitemap() {
  const baseUrl = "https://muszynova.pl";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sk: `${baseUrl}/sk`,
          ua: `${baseUrl}/ua`,
          de: `${baseUrl}/de`,
        },
      },
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/about-us`,
          sk: `${baseUrl}/sk/o-nas`,
          ua: `${baseUrl}/ua/pro-nas`,
          de: `${baseUrl}/de/ueber-uns`,
        },
      },
    },
    {
      url: `${baseUrl}/park`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park`,
          sk: `${baseUrl}/sk/park`,
          ua: `${baseUrl}/ua/park`,
          de: `${baseUrl}/de/park`,
        },
      },
    },
    {
      url: `${baseUrl}/park/silownia`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/gym`,
          sk: `${baseUrl}/sk/park/posilnovna`,
          ua: `${baseUrl}/ua/park/trenazhernyi-zal`,
          de: `${baseUrl}/de/park/fitnessstudio`,
        },
      },
    },
    {
      url: `${baseUrl}/park/fitness`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/fitness`,
          sk: `${baseUrl}/sk/park/fitness`,
          ua: `${baseUrl}/ua/park/fitnes`,
          de: `${baseUrl}/de/park/fitness`,
        },
      },
    },
    {
      url: `${baseUrl}/park/hala-sportowa`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/sports-hall`,
          sk: `${baseUrl}/sk/park/sportova-hala`,
          ua: `${baseUrl}/ua/park/sportyvnyi-zal`,
          de: `${baseUrl}/de/park/sporthalle`,
        },
      },
    },
    {
      url: `${baseUrl}/pl/park/mini-kregielnia`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/mini-bowling`,
          sk: `${baseUrl}/sk/park/mini-kugeľna`,
          ua: `${baseUrl}/ua/park/mini-boulinh`,
          de: `${baseUrl}/de/park/mini-bowling`,
        },
      },
    },
    {
      url: `${baseUrl}/park/scianka-wspinaczkowa`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/climbing-wall`,
          sk: `${baseUrl}/sk/park/lezecka-stena`,
          ua: `${baseUrl}/ua/park/skeledrom`,
          de: `${baseUrl}/de/park/kletterwand`,
        },
      },
    },
    {
      url: `${baseUrl}/park/sala-zabaw`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/playroom`,
          sk: `${baseUrl}/sk/park/herna-pre-deti`,
          ua: `${baseUrl}/ua/park/dytiacha-ihrova-kimnata`,
          de: `${baseUrl}/de/park/spieleraum`,
        },
      },
    },
    {
      url: `${baseUrl}/park/squash`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/squash`,
          sk: `${baseUrl}/sk/park/squash`,
          ua: `${baseUrl}/ua/park/skvosh`,
          de: `${baseUrl}/de/park/squash`,
        },
      },
    },
    {
      url: `${baseUrl}/park/wypozyczalnia-rowerow`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/bike-rental`,
          sk: `${baseUrl}/sk/park/požičovňa-bicyklov`,
          ua: `${baseUrl}/ua/park/prokat-velosypediv`,
          de: `${baseUrl}/de/park/fahrradverleih`,
        },
      },
    },
    {
      url: `${baseUrl}/park/sala-gier`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/game-room`,
          sk: `${baseUrl}/sk/park/herna`,
          ua: `${baseUrl}/ua/park/ihrova-zala`,
          de: `${baseUrl}/de/park/spieleraum`,
        },
      },
    },
    {
      url: `${baseUrl}/park/sala-multimedialna`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/park/multimedia-room`,
          sk: `${baseUrl}/sk/park/multimedialna-miestnosť`,
          ua: `${baseUrl}/ua/park/multymediyna-zala`,
          de: `${baseUrl}/de/park/multimediasaal`,
        },
      },
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/gallery`,
          sk: `${baseUrl}/sk/galeria`,
          ua: `${baseUrl}/ua/halereya`,
          de: `${baseUrl}/de/galerie`,
        },
      },
    },
    {
      url: `${baseUrl}/galeria/park`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/gallery/park`,
          sk: `${baseUrl}/sk/galeria/park`,
          ua: `${baseUrl}/ua/halereya/park`,
          de: `${baseUrl}/de/galerie/park`,
        },
      },
    },
    {
      url: `${baseUrl}/galeria/restauracja`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/gallery/restaurant`,
          sk: `${baseUrl}/sk/galeria/restauracia`,
          ua: `${baseUrl}/ua/halereya/restoran`,
          de: `${baseUrl}/de/galerie/restaurant`,
        },
      },
    },
    {
      url: `${baseUrl}/restauracja`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/restaurant`,
          sk: `${baseUrl}/sk/restauracia`,
          ua: `${baseUrl}/ua/restoran`,
          de: `${baseUrl}/de/restaurant`,
        },
      },
    },
    {
      url: `${baseUrl}/cennik`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/pricing`,
          sk: `${baseUrl}/sk/cennik`,
          ua: `${baseUrl}/ua/tsiny`,
          de: `${baseUrl}/de/preise`,
        },
      },
    },
    {
      url: `${baseUrl}/zajecia-grupowe`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/group-classes`,
          sk: `${baseUrl}/sk/skupinove-aktivity`,
          ua: `${baseUrl}/ua/hrupovi-zanyattya`,
          de: `${baseUrl}/de/gruppenkurse`,
        },
      },
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact`,
          sk: `${baseUrl}/sk/kontakt`,
          ua: `${baseUrl}/ua/kontakty`,
          de: `${baseUrl}/de/kontakt`,
        },
      },
    },
    {
      url: `${baseUrl}/partnerzy`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/partners`,
          sk: `${baseUrl}/sk/partneri`,
          ua: `${baseUrl}/ua/partneri`,
          de: `${baseUrl}/de/partner`,
        },
      },
    },
    {
      url: `${baseUrl}/dofinansowanie`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/funding`,
          sk: `${baseUrl}/sk/financovanie`,
          ua: `${baseUrl}/ua/finansuvannia`,
          de: `${baseUrl}/de/foerderung`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          sk: `${baseUrl}/sk/blog`,
          ua: `${baseUrl}/ua/blog`,
          de: `${baseUrl}/de/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/muszyna-10-najlepszych-atrakcji`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/muszyna-10-best-attractions`,
          sk: `${baseUrl}/sk/blog/muszyna-10-najlepsich-atrakcii`,
          ua: `${baseUrl}/ua/blog/mushyna-10-naikrashchykh-atraktsii`,
          de: `${baseUrl}/de/blog/muszyna-10-beste-attraktionen`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/muszyna-najlepsze-szlaki-turystyczne`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/muszyna-best-hiking-trails`,
          sk: `${baseUrl}/sk/blog/muszyna-najlepsie-turisticke-trasy`,
          ua: `${baseUrl}/ua/blog/mushyna-naikrashchi-turystychni-marshruty`,
          de: `${baseUrl}/de/blog/muszyna-beste-wanderwege`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/jak-spedzic-weekend-w-muszynie`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/how-to-spend-a-weekend-in-muszyna`,
          sk: `${baseUrl}/sk/blog/ako-stravit-vikend-v-musyne`,
          ua: `${baseUrl}/ua/blog/iak-provesty-vykhidni-v-mushyni`,
          de: `${baseUrl}/de/blog/wie-man-ein-wochenende-in-muszyna-verbringt`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/aktywny-wypoczynek-w-beskidzie-sadeckim`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/active-holiday-in-beskid-sadecki`,
          sk: `${baseUrl}/sk/blog/aktivna-dovolenka-v-beskydach-sadeckych`,
          ua: `${baseUrl}/ua/blog/aktyvnyi-vidpochynok-v-beskydi-sadetskomu`,
          de: `${baseUrl}/de/blog/aktive-erholung-im-beskid-sadecki`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/historia-squasha`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/history-of-squash`,
          sk: `${baseUrl}/sk/blog/historia-squasha`,
          ua: `${baseUrl}/ua/blog/istoriia-skvoshu`,
          de: `${baseUrl}/de/blog/geschichte-des-squash`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/rowerem-przez-muszyne`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/cycling-through-muszyna`,
          sk: `${baseUrl}/sk/blog/na-bicykli-cez-muszynu`,
          ua: `${baseUrl}/ua/blog/na-velosypedi-cherez-muzhynu`,
          de: `${baseUrl}/de/blog/mit-dem-rad-durch-muszyna`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/muszyna-wody-mineralne`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/mineral-waters-of-muszyna`,
          sk: `${baseUrl}/sk/blog/mineralne-vody-v-muszyni`,
          ua: `${baseUrl}/ua/blog/mineralni-vody-u-muzhyni`,
          de: `${baseUrl}/de/blog/mineralwaesser-von-muszyna`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/lokalne-legendy-i-historie`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/local-legends-and-stories`,
          sk: `${baseUrl}/sk/blog/miestne-legendy-a-príbehy`,
          ua: `${baseUrl}/ua/blog/mistsevi-lehendy-ta-istoriyi`,
          de: `${baseUrl}/de/blog/lokale-legenden-und-geschichten`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/krynica-15-najlepszych-atrakcji`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/krynica-zdroj-15-best-attractions`,
          sk: `${baseUrl}/sk/blog/krynica-15-najlepsich-atrakcii`,
          ua: `${baseUrl}/ua/blog/krynytsya-15-naikrashchykh-atraktsii`,
          de: `${baseUrl}/de/blog/krynica-zdroj-15-beste-attraktionen`,
        },
      },
    },
    {
      url: `${baseUrl}/blog/odkryj-drewniane-cerkwie-rowerem-w-muszynie`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/discover-wooden-churches-by-bike-in-muszyna`,
          sk: `${baseUrl}/sk/blog/objavte-drevene-chramy-na-bicykli-v-muszyna`,
          ua: `${baseUrl}/ua/blog/vidkryi-dereviani-tserkvy-na-velosypedi-v-mushyni`,
          de: `${baseUrl}/de/blog/entdecken-sie-holzkirchen-mit-dem-rad-in-muszyna`,
        },
      },
    },
    {
      url: `${baseUrl}/polityka-cookies`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/cookie-policy`,
          sk: `${baseUrl}/sk/pravidla-cookies`,
          ua: `${baseUrl}/ua/fayliv-cookie`,
          de: `${baseUrl}/de/cookie-richtlinie`,
        },
      },
    },
  ];
}
