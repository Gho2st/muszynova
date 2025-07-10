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
        },
      },
    },
  ];
}
