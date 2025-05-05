import BlogCard from "../UI/BlogCard";

export default function Blog({ t }) {
  return (
    <section className="px-6 md:px-16 2xl:px-20 py-16 xl:py-20 ">
      <div className="flex flex-col">
        <div className="mb-10 xl:mb-24">
          <h2 className="text-customGold font-bold text-3xl md:text-4xl">
            {t("header")}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-20">
          <BlogCard
            header={t("posts.1.header")}
            text={t("posts.1.text")}
            link="/blog/muszyna-10-najlepszych-atrakcji"
          />
          <BlogCard
            header={t("posts.2.header")}
            text={t("posts.2.text")}
            link="/blog/muszyna-najlepsze-szlaki-turystyczne"
          />
          <BlogCard
            header={t("posts.3.header")}
            text={t("posts.3.text")}
            link="/blog/jak-spedzic-weekend-w-muszynie"
          />
        </div>
      </div>
    </section>
  );
}
