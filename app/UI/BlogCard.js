import Button from "../UI/Buttons/Button";
import { useTranslations } from "next-intl";

export default function BlogCard({ header, text, link }) {
  const t = useTranslations("blog");
  return (
    <article className="flex flex-col justify-between p-8 px-4 h-full bg-grey-50 shadow-2xl transform transition-all duration-300 hover:scale-103">
      <h3 className="font-bold mb-10 text-2xl">{header}</h3>
      <p className="mb-10">{text}</p>
      <Button
        text={t("button")}
        bgColor="bg-[#C4966C]"
        textColor="text-white"
        link={link}
      />
    </article>
  );
}
