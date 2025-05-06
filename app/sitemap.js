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
          // de: `${baseUrl}/de`,
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
          // de: `${baseUrl}/de/uber-uns`,
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
          // de: `${baseUrl}/de/park`,
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
          // de: `${baseUrl}/de/park/fitnessstudio`,
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
          // de: `${baseUrl}/de/park/fitness`,
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
          // de: `${baseUrl}/de/park/sporthalle`,
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
          // de: `${baseUrl}/de/park/mini-bowling`,
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
          // de: `${baseUrl}/de/park/kletterwand`,
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
          // de: `${baseUrl}/de/park/spielzimmer`,
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
          // de: `${baseUrl}/de/park/squash`,
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
          // de: `${baseUrl}/de/park/fahrradverleih`,
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
          // de: `${baseUrl}/de/park/spielhalle`,
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
          // de: `${baseUrl}/de/park/multimediaroom`,
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
          // de: `${baseUrl}/de/galerie`,
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
          // de: `${baseUrl}/de/galerie/park`,
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
          // de: `${baseUrl}/de/galerie/restaurant`,
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
          // de: `${baseUrl}/de/restaurant`,
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
          // de: `${baseUrl}/de/preisliste`,
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
          // de: `${baseUrl}/de/gruppenkurse`,
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
          // de: `${baseUrl}/de/kontakt`,
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
          // de: `${baseUrl}/de/partner`,
          ua: `${baseUrl}/ua/партнери`,
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
          ua: `${baseUrl}/ua/блог`,
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
          ua: `${baseUrl}/ua/блог/мушина-10-найкращих-атракцій`,
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
          ua: `${baseUrl}/ua/блог/мушина-найкращі-туристичні-маршрути`,
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
          ua: `${baseUrl}/ua/блог/як-провести-вихідні-в-мушині`,
        },
      },
    },
  ];
}
