"use client";
import { parse, format, isValid } from "date-fns";
import { pl, hu, enUS, arSA } from "date-fns/locale";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Proste ikonki SVG (Gwiazdka i Strzałka)
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-customGold"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
    />
  </svg>
);

export default function Favourite({ blogPosts, locale }) {
  const t = useTranslations("blog.favourites");
  const locales = { pl, hu, en: enUS, ar: arSA };
  const dateLocale = locales[locale] || pl;

  // Wspólny wrapper dla błędu i pustej listy, aby zachować spójność wyglądu
  const EmptyState = () => (
    <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
      <p className="text-gray-500 font-medium">{t("error")}</p>
    </div>
  );

  if (!Array.isArray(blogPosts)) return <EmptyState />;

  const favouritePosts = blogPosts.filter((post) => post.favourite).slice(0, 3);

  return (
    // Zmiana: Zamiast gradientu blue-50, używamy czystego, nowoczesnego tła (np. białego z obramowaniem lub szarego)
    <div className="flex flex-col gap-6 p-6 xl:p-8 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50">
      {/* NAGŁÓWEK SEKCJI */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100 mb-2">
        <div className="p-2 bg-customGold/10 rounded-lg">
          <StarIcon />
        </div>
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          {t("header")}
        </h3>
      </div>

      {favouritePosts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {favouritePosts.map((post) => {
            const parsedDate = parse(post.date, "dd-MM-yyyy", new Date());
            const formattedDate = isValid(parsedDate)
              ? format(parsedDate, "d MMMM yyyy", { locale: dateLocale })
              : "Invalid Date";

            return (
              <Link
                key={post.id}
                href={post.slug ? `/blog/${post.slug}` : `/blog`}
                className="group relative block"
              >
                <article className="p-4 rounded-xl bg-gray-50 border border-transparent transition-all duration-300 hover:bg-white hover:border-gray-200 hover:shadow-md">
                  {/* Data */}
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
                    {formattedDate}
                  </span>

                  {/* Tytuł */}
                  <h4 className="text-base font-bold text-gray-800 leading-snug mb-3 group-hover:text-customGold transition-colors">
                    {post.title}
                  </h4>

                  {/* Link "Button" - teraz jako tekst na dole */}
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                    {t("button")}
                    <ArrowRightIcon />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
