import Button from "../UI/Buttons/Button";
import { useTranslations } from "next-intl";

// Funkcja przycinająca tekst z dodaniem "..." jeśli za długi
function truncateText(text, maxLength = 180) {
  if (text.length <= maxLength) return text;

  const words = text.split(" ");
  let result = "";

  for (let word of words) {
    if ((result + word).length + 1 > maxLength) break;
    result += (result ? " " : "") + word;
  }

  return result.trim().replace(/[.,;!?]$/, "") + "...";
}

export default function BlogCard({ header, text, link, button }) {
  const t = useTranslations("blog");
  return (
    <article className="flex flex-col justify-between p-8 px-4 xl:px-6 h-full bg-grey-50 shadow-2xl transform transition-all duration-300 hover:scale-103">
      <h3 className="font-bold mb-10 text-2xl">{header}</h3>
      <p className="mb-10">{truncateText(text)}</p>
      <Button
        text={button}
        bgColor="bg-[#C4966C]"
        textColor="text-white"
        link={link}
      />
    </article>
  );
}
