"use client";
import { useState, useEffect } from "react";
import { FaFacebook, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// Warianty animacji dla kontenera (siatki)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Każde dziecko pojawi się 0.2s po poprzednim
    },
  },
};

// Warianty animacji dla pojedynczego posta
const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Start: niewidoczny, przesunięty w dół
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 }, // Sprężysty ruch
  },
};

const PostSkeleton = () => (
  <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
    <div className="h-64 xl:h-72 w-full bg-gray-200 animate-pulse" />
    <div className="p-6 flex-1 flex flex-col gap-4">
      <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="mt-auto pt-4 flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full" />
      </div>
    </div>
  </div>
);

export default function FacebookPosts() {
  const t = useTranslations("facebook");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const timestamp = Date.now();
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
      {/* NAGŁÓWEK - Animacja wejścia */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-12 xl:mb-16"
      >
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="bg-[#1877F2]/10 p-3 rounded-full mb-4 cursor-pointer"
        >
          <FaFacebook className="text-[#1877F2] text-3xl" />
        </motion.div>

        <h2 className="text-3xl xl:text-5xl font-bold text-gray-900 mb-6">
          {t("header")}{" "}
          <span className="text-[#1877F2] relative whitespace-nowrap">
            {t("span")}
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

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.facebook.com/Parkmuszynova/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-full font-medium shadow-md shadow-blue-500/20"
        >
          <span>{t("cta")}</span>
          <FaExternalLinkAlt className="text-sm transition-transform group-hover:translate-x-1" />
        </motion.a>
      </motion.div>

      {/* GRID POSTÓW */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
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
            const imageUrl =
              post.attachments?.data?.[0]?.media?.image?.src ?? null;
            const ids = post.id.split("_");
            const pageId = ids[0];
            const postId = ids[1] || ids[0];
            const postUrl = `https://www.facebook.com/${pageId}/posts/${postId}`;
            const date = new Date(post.created_time).toLocaleDateString(
              "pl-PL",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            );

            return (
              <motion.article
                key={post.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 h-full"
              >
                {/* OBRAZEK */}
                <div className="relative w-full h-64 xl:h-72 2xl:h-96  overflow-hidden bg-gray-100">
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

                  {/* Badge FB - dodajemy małą animację pulse na hover */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10 text-[#1877F2]"
                  >
                    <FaFacebook />
                  </motion.div>
                </div>

                {/* TREŚĆ */}
                <div className="p-6 xl:p-8 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">
                    {date}
                  </span>

                  <p className="text-gray-700 font-medium leading-relaxed mb-6 line-clamp-4 flex-grow">
                    {post.message || t("error2")}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-400 group-hover:text-[#1877F2] transition-colors font-medium">
                      Park Muszynova
                    </span>

                    <motion.a
                      href={postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#1877F2",
                        color: "#fff",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-[#1877F2] transition-colors duration-300"
                      aria-label={t("cta2")}
                    >
                      <FaExternalLinkAlt size={12} />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            );
          })
        )}
      </motion.div>
    </section>
  );
}
