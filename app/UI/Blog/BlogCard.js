"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Button from "../Buttons/Button";
import { motion } from "framer-motion";

export default function BlogCard({ post, index = 0 }) {
  const t = useTranslations("blog");

  if (!post) return null;

  const title = post.title || "";
  const subtitle = post.subtitle || "";
  const date = post.date || "";
  const href = post.slug ? `/blog/${post.slug}` : "/blog";

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Link na całą kartę */}
      <Link href={href} className="absolute inset-0 z-10" aria-label={title} />

      {/* Dekoracyjny gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-customGold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative flex flex-col flex-grow p-6 xl:p-8 z-20 pointer-events-none">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-customGold bg-customGold/10 rounded-full">
              Blog
            </span>
          </div>
          <span className="text-xs font-medium text-gray-400">{date}</span>
        </div>

        {/* BODY */}
        <h3 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-customGold transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-500 font-normal leading-relaxed mb-6 line-clamp-3 flex-grow text-sm xl:text-base">
          {subtitle}
        </p>

        {/* FOOTER */}
        <div className="pt-6 border-t border-gray-50 mt-auto">
          <div className="flex justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="pointer-events-none">
                <Button
                  text={t("readMoreButton")}
                  link="#"
                  className="!w-auto px-6"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
