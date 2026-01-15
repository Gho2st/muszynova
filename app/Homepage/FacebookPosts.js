"use client";
import { useState, useEffect } from "react";
import { FaFacebook, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";

// 1. Komponent Skeleton (Szkielet ładowania)
const PostSkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
    <div className="h-64 w-full bg-gray-200 animate-pulse" /> {/* Obrazek */}
    <div className="p-6 flex-1 flex flex-col gap-3">
      <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />{" "}
      {/* Data */}
      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />{" "}
      {/* Tekst linia 1 */}
      <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />{" "}
      {/* Tekst linia 2 */}
      <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded" />{" "}
      {/* Tekst linia 3 */}
      <div className="mt-auto h-8 w-32 bg-gray-200 animate-pulse rounded-full" />{" "}
      {/* Przycisk */}
    </div>
  </div>
);

export default function FacebookPosts() {
  const t = useTranslations("facebook");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const timestamp = Date.now(); // Date.now() jest szybsze i czyystsze
      try {
        const res = await fetch(`/api/facebook/${timestamp}`, {
          headers: { "Cache-Control": "no-cache" },
        });
        const data = await res.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error("Błąd FB:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-16 xl:py-24 px-4 xl:px-20 2xl:px-44 bg-[#F8F9FA]">
      {/* NAGŁÓWEK */}
      <div className="flex flex-col items-center text-center mb-12 xl:mb-16">
        <div className="bg-[#1877F2]/10 p-3 rounded-full mb-4">
          <FaFacebook className="text-[#1877F2] text-3xl" />
        </div>
        <h2 className="text-3xl xl:text-5xl font-bold text-gray-900 mb-6">
          {t("header")}{" "}
          <span className="text-[#1877F2] relative whitespace-nowrap">
            {t("span")}
            {/* Ozdobne podkreślenie */}
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-[#1877F2]/20"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </span>{" "}
          {t("header2")}
        </h2>

        <a
          href="https://www.facebook.com/Parkmuszynova/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-full font-medium transition-all hover:bg-[#1464C9] hover:shadow-lg hover:shadow-blue-500/30"
        >
          <span>{t("cta")}</span>
          <FaExternalLinkAlt className="text-sm transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* GRID POSTÓW */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {isLoading ? (
          // Wyświetlamy 3 szkielety podczas ładowania
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500">{t("error")}</p>
          </div>
        ) : (
          posts.slice(0, 3).map((post) => {
            // Limitujemy do 3 postów dla estetyki siatki
            const imageUrl =
              post.attachments?.data?.[0]?.media?.image?.src ?? null;
            // Bezpieczniejsze parsowanie ID (czasem API FB zwraca dziwne formaty)
            const ids = post.id.split("_");
            const pageId = ids[0];
            const postId = ids[1] || ids[0];
            const postUrl = `https://www.facebook.com/${pageId}/posts/${postId}`;

            // Formatowanie daty
            const date = new Date(post.created_time).toLocaleDateString(
              "pl-PL",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            );

            return (
              <article
                key={post.id}
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* OBRAZEK */}
                <div className="relative w-full h-64 xl:h-72 overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Facebook Post"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-300">
                      <FaFacebook size={48} />
                    </div>
                  )}
                  {/* Badge FB w rogu zdjęcia */}
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10">
                    <FaFacebook className="text-[#1877F2]" />
                  </div>
                </div>

                {/* TREŚĆ */}
                <div className="p-6 xl:p-8 flex-1 flex flex-col">
                  {/* Data */}
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">
                    {date}
                  </span>

                  <p className="text-gray-700 font-medium leading-relaxed mb-6 line-clamp-4 flex-grow">
                    {post.message || t("error2")}
                  </p>

                  {/* Footer karty */}
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-400 group-hover:text-[#1877F2] transition-colors">
                      Park Muszynova
                    </span>

                    <a
                      href={postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-300"
                      aria-label={t("cta2")}
                    >
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
