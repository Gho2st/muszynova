"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Header from "@/app/UI/Header";
import BlogCard from "@/app/UI/Blog/BlogCard";
import Favourite from "@/app/UI/Blog/Favourite";
import RecentPosts from "@/app/UI/Blog/RecentPosts";
import LineHeader from "@/app/UI/LineHeader";
import { blogPosts } from "@/app/data/blogData";

export default function Blog({ locale }) {
  const t = useTranslations("blog");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const articlesRef = useRef(null);

  // 🔹 Połączenie metadanych (blogPosts) z tłumaczeniami
  const mergedPosts = blogPosts
    .map((post) => ({
      ...post,
      title: t(`blogPosts.${post.id}.title`),
      subtitle: t(`blogPosts.${post.id}.header2`),
      contentPart1: t(`blogPosts.${post.id}.text`),
    }))
    .toReversed();
  // 🔹 Filtrowanie wyszukiwania
  const filteredPosts = mergedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 🔹 Paginacja
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 👇 ZMIANA TUTAJ: Inteligentne przewijanie zamiast scrollIntoView
  useEffect(() => {
    if (articlesRef.current) {
      // 1. Obliczamy pozycję elementu względem góry dokumentu
      const elementPosition =
        articlesRef.current.getBoundingClientRect().top + window.scrollY;

      // 2. Ustalamy margines (np. 150px), żeby nie kleiło się do samej góry (miejsce na Header menu)
      const offset = 150;
      const targetPosition = elementPosition - offset;

      // 3. Przewijamy TYLKO wtedy, gdy użytkownik jest niżej niż początek listy
      // Dzięki temu strona nie skacze, jeśli jesteś na górze
      if (window.scrollY > targetPosition) {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentPage]); // Uruchamia się przy zmianie strony

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header text={t("header2")} />

      <section className="pb-8 px-[4%] 2xl:pb-20 bg-white">
        {/* Opis */}
        <p className="text-center max-w-3xl mx-auto mt-6 md:mt-10 text-lg xl:text-xl text-gray-600">
          {t("text")}
        </p>

        {/* Pole wyszukiwania */}
        <div className="relative max-w-2xl mx-auto mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Resetuj na stronę 1 przy szukaniu
              }}
              className="w-full p-4 pl-12 text-gray-700 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 cursor-text"
            />
            <span
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              aria-hidden="true"
            >
              🔍
            </span>
          </div>
        </div>

        {/* Sekcja artykułów */}
        <div className="flex flex-col lg:flex-row gap-16 py-16">
          {/* Artykuły */}
          <div className="w-4/4 lg:w-2/3 2xl:w-3/4">
            {/* REF przypisany do nagłówka listy */}
            <div ref={articlesRef}>
              <LineHeader text={t("header3")} />
            </div>

            {/* Karty artykułów */}
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 2xl:gap-10 my-10 2xl:mt-16">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>

            {/* Paginacja */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition-all duration-300`}
                >
                  {t("previousButton")}
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-all duration-300`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition-all duration-300`}
                >
                  {t("nextButton")}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-4/4 lg:w-1/3 2xl:1/4 flex flex-col gap-10">
            <Favourite blogPosts={mergedPosts} locale={locale} />
            <RecentPosts blogPosts={mergedPosts} locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
