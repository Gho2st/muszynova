"use client";

import { Link } from "@/i18n/routing";
import BlogCard from "../UI/Blog/BlogCard";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { blogPosts as rawBlogPosts } from "@/app/data/blogData";

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function BlogSection() {
  const t = useTranslations("blog");

  const mergedPosts = rawBlogPosts.map((post) => ({
    ...post,
    title: t(`blogPosts.${post.id}.title`) || post.title || "Brak tytułu",
    subtitle:
      t(`blogPosts.${post.id}.header2`) ||
      t(`blogPosts.${post.id}.excerpt`) ||
      post.subtitle ||
      post.excerpt ||
      "",
  }));

  // 3 najnowsze posty
  const latestPosts = mergedPosts.slice(0, 3);

  return (
    <section className="relative py-20 xl:py-28 bg-[#F8F9FA] overflow-hidden">
      {/* Tło: wzór kropek */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-8">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-sm font-bold tracking-widest text-customGold uppercase mb-3 block">
              {t("more")}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              {t("header")}
            </h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center text-lg font-semibold text-gray-600 hover:text-customGold transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-customGold/20"
          >
            {t("link")}
            <ArrowRight />
          </Link>
        </motion.div>

        {/* Grid kart */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        >
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
