import { Link } from "@/i18n/routing";

export default function Button({
  text,
  bgColor = "bg-[#C4966C]", // Kolor tła
  textColor = "text-white", // Kolor tekstu
  link,
}) {
  return (
    <div>
      <button>
        <Link
          className={` ${textColor} text-lg font-medium whitespace-nowrap flex justify-center items-center gap-2 p-4 clip-custom hover:clip-reverse ${bgColor} 
          transition-all duration-300 transform hover:scale-105 hover:shadow-lg`} // Animacja i efekty na hover
          href={link}
        >
          {text}
        </Link>
      </button>
    </div>
  );
}
