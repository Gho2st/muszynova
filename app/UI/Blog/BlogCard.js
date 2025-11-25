import Button from "../Buttons/Button";
import { useTranslations } from "next-intl";

export default function BlogCard({ post }) {
  const t = useTranslations("blog");
  console.log(post);
  return (
    <article className="flex flex-col justify-between rounded-2xl p-8 px-4 xl:px-6 h-full bg-grey-50 shadow-2xl transform transition-all duration-300 hover:scale-103">
      <span className="text-gray-500 mb-2">{post.date}</span>
      <h3 className="font-bold mb-6 text-xl">{post.title || "No Title"}</h3>

      <p className="mb-6 2xl:text-lg text-gray-700 font-light">
        {post.subtitle}
      </p>

      <div className="flex">
        <Button text={t("readMoreButton")} link={`/blog/${post.slug}`} />
      </div>
    </article>
  );
}
