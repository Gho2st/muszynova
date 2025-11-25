"use client";
import { parse, format, isValid } from "date-fns";
import { pl, hu, enUS, arSA } from "date-fns/locale";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function RecentPosts({ blogPosts, layout = "column", locale }) {
  const t = useTranslations("blog.recentPosts");
  const locales = { pl, hu, en: enUS, ar: arSA };
  const dateLocale = locales[locale] || pl;

  if (!Array.isArray(blogPosts)) {
    return (
      <div className="py-8 p-4 md:p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl">
        <p className="text-gray-600 text-center text-lg font-medium">
          {t("error")}
        </p>
      </div>
    );
  }

  const recentPosts = [...blogPosts]
    .sort((a, b) => {
      const dateA = parse(a.date, "dd-MM-yyyy", new Date());
      const dateB = parse(b.date, "dd-MM-yyyy", new Date());
      return isValid(dateB) && isValid(dateA) ? dateB - dateA : 0;
    })
    .slice(0, 3);

  return (
    <div className="py-8 p-4 md:p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl">
      <h3 className="text-center text-2xl md:text-3xl font-semibold text-customBlue tracking-wide mb-8">
        {t("header")}
      </h3>
      <div
        className={`grid ${
          layout === "row"
            ? "grid-cols-1 md:grid-cols-3 gap-6 md:py-16"
            : "grid-cols-1 gap-8"
        }`}
      >
        {recentPosts.length > 0 ? (
          recentPosts.map((post) => {
            const parsedDate = parse(post.date, "dd-MM-yyyy", new Date());
            const formattedDate = isValid(parsedDate)
              ? format(parsedDate, "d MMMM yyyy", { locale: dateLocale })
              : "Invalid Date";

            return (
              <div
                key={post.id}
                className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-red-300"
              >
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm text-gray-500 font-medium block mb-3">
                  {formattedDate}
                </span>
                <h4 className="text-xl font-semibold mb-3">
                  {post.title || "No Title"}
                </h4>
                <Link
                  href={post.slug ? `/blog/${post.slug}` : `/blog`}
                  className="inline-block text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  {t("button")}
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-center text-lg font-medium">
            {t("error")}
          </p>
        )}
      </div>
    </div>
  );
}
