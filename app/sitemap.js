import { prisma } from "@/lib/prisma";
import { routing } from "@/i18n/routing";

const baseUrl = "https://muszynova.pl";

export const revalidate = 86400;

export default async function sitemap() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    include: { translations: true },
    orderBy: { publishedAt: "desc" },
  });

  const postUrl = (locale, slug) =>
    locale === routing.defaultLocale
      ? `${baseUrl}/blog/${slug}`
      : `${baseUrl}/${locale}/blog/${slug}`;

  const blogPostEntries = posts.flatMap((post) => {
    const valid = post.translations.filter((t) =>
      routing.locales.includes(t.locale),
    );
    if (valid.length === 0) return [];

    const fallback =
      valid.find((t) => t.locale === routing.defaultLocale) ?? valid[0];

    const languages = {};
    valid.forEach((t) => {
      languages[t.locale] = postUrl(t.locale, t.slug);
    });
    languages["x-default"] = postUrl(fallback.locale, fallback.slug);

    return valid.map((t) => ({
      url: postUrl(t.locale, t.slug),
      lastModified:
        t.updatedAt ?? post.updatedAt ?? post.publishedAt ?? new Date(),
      alternates: { languages },
    }));
  });
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "x-default": `${baseUrl}`,
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
          "x-default": `${baseUrl}/o-nas`,
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
          "x-default": `${baseUrl}/park`,
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
          "x-default": `${baseUrl}/park/silownia`,
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
          "x-default": `${baseUrl}/park/fitness`,
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
          "x-default": `${baseUrl}/park/hala-sportowa`,
          en: `${baseUrl}/en/park/sports-hall`,
          sk: `${baseUrl}/sk/park/sportova-hala`,
          ua: `${baseUrl}/ua/park/sportyvnyi-zal`,
          de: `${baseUrl}/de/park/sporthalle`,
        },
      },
    },
    {
      url: `${baseUrl}/park/mini-kregielnia`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "x-default": `${baseUrl}/park/mini-kregielnia`,
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
          "x-default": `${baseUrl}/park/scianka-wspinaczkowa`,
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
          "x-default": `${baseUrl}/park/sala-zabaw`,
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
          "x-default": `${baseUrl}/park/squash`,
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
          "x-default": `${baseUrl}/park/wypozyczalnia-rowerow`,
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
          "x-default": `${baseUrl}/park/sala-gier`,
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
          "x-default": `${baseUrl}/park/sala-multimedialna`,
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
          "x-default": `${baseUrl}/galeria`,
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
          "x-default": `${baseUrl}/galeria/park`,
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
          "x-default": `${baseUrl}/galeria/restauracja`,
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
          "x-default": `${baseUrl}/restauracja`,
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
          "x-default": `${baseUrl}/cennik`,
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
          "x-default": `${baseUrl}/zajecia-grupowe`,
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
          "x-default": `${baseUrl}/kontakt`,
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
          "x-default": `${baseUrl}/partnerzy`,
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
          "x-default": `${baseUrl}/dofinansowanie`,
          en: `${baseUrl}/en/funding`,
          sk: `${baseUrl}/sk/financovanie`,
          ua: `${baseUrl}/ua/finansuvannia`,
          de: `${baseUrl}/de/foerderung`,
        },
      },
    },
    {
      url: `${baseUrl}/polityka-cookies`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "x-default": `${baseUrl}/polityka-cookies`,
          en: `${baseUrl}/en/cookie-policy`,
          sk: `${baseUrl}/sk/prawidla-cookies`,
          ua: `${baseUrl}/ua/fayliv-cookie`,
          de: `${baseUrl}/de/cookie-richtlinie`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "x-default": `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
          sk: `${baseUrl}/sk/blog`,
          ua: `${baseUrl}/ua/blog`,
          de: `${baseUrl}/de/blog`,
        },
      },
    },

    ...blogPostEntries,
  ];
}
