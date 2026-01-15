"use client";
import { parse, format, isValid } from "date-fns";
import { pl, hu, enUS, arSA } from "date-fns/locale";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Ikony (Zegar i Kalendarz)
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-customGold"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 mr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
    />
  </svg>
);

export default function RecentPosts({ blogPosts, layout = "column", locale }) {
  const t = useTranslations("blog.recentPosts");
  const locales = { pl, hu, en: enUS, ar: arSA };
  const dateLocale = locales[locale] || pl;

  // Wspólny stan pusty/błąd
  if (!Array.isArray(blogPosts)) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">{t("error")}</p>
      </div>
    );
  }

  // Sortowanie i limitowanie postów
  const recentPosts = [...blogPosts]
    .sort((a, b) => {
      const dateA = parse(a.date, "dd-MM-yyyy", new Date());
      const dateB = parse(b.date, "dd-MM-yyyy", new Date());
      return isValid(dateB) && isValid(dateA) ? dateB - dateA : 0;
    })
    .slice(0, 3);

  const isRow = layout === "row";

  return (
    <section
      className={`
      ${
        isRow
          ? "py-12"
          : "p-6 xl:p-8 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50"
      }
    `}
    >
      {/* NAGŁÓWEK */}
      <div
        className={`flex items-center gap-3 mb-6 ${
          !isRow && "pb-2 border-b border-gray-100"
        }`}
      >
        <div
          className={`p-2 bg-customGold/10 rounded-lg ${
            isRow ? "hidden" : "block"
          }`}
        >
          <ClockIcon />
        </div>
        <h3
          className={`${
            isRow ? "text-3xl md:text-4xl text-center w-full mb-8" : "text-xl"
          } font-bold text-gray-900`}
        >
          {t("header")}
        </h3>
      </div>

      {/* GRID / LISTA */}
      <div
        className={`grid ${
          isRow
            ? "grid-cols-1 md:grid-cols-3 gap-8" // Styl dla layout="row"
            : "grid-cols-1 gap-4" // Styl dla layout="column"
        }`}
      >
        {recentPosts.length > 0 ? (
          recentPosts.map((post) => {
            const parsedDate = parse(post.date, "dd-MM-yyyy", new Date());
            const formattedDate = isValid(parsedDate)
              ? format(parsedDate, "d MMMM yyyy", { locale: dateLocale })
              : "Invalid Date";

            return (
              <Link
                key={post.id}
                href={post.slug ? `/blog/${post.slug}` : `/blog`}
                className="group relative block h-full"
              >
                <article
                  className={`
                    h-full transition-all duration-300 border border-transparent
                    ${
                      isRow
                        ? "bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 border-gray-100" // Wygląd karty w rzędzie
                        : "bg-gray-50 rounded-xl p-4 hover:bg-white hover:border-gray-200 hover:shadow-md" // Wygląd elementu listy w kolumnie
                    }
                  `}
                >
                  {/* Data */}
                  <div className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    <CalendarIcon />
                    {formattedDate}
                  </div>

                  {/* Tytuł */}
                  <h4
                    className={`font-bold text-gray-800 group-hover:text-customGold transition-colors duration-300 ${
                      isRow ? "text-xl line-clamp-2" : "text-base leading-snug"
                    }`}
                  >
                    {post.title || "No Title"}
                  </h4>

                  {/* Przycisk "Czytaj dalej" (tylko w wersji ROW dla estetyki, w wersji Column zbędny clutter) */}
                  {isRow && (
                    <span className="inline-block mt-4 text-sm font-medium text-gray-500 underline decoration-gray-300 group-hover:decoration-customGold group-hover:text-customGold transition-all">
                      {t("button")}
                    </span>
                  )}
                </article>
              </Link>
            );
          })
        ) : (
          <p className="col-span-full text-gray-500 text-center py-4">
            {t("error")}
          </p>
        )}
      </div>
    </section>
  );
}
