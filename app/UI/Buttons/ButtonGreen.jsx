import { Link } from "@/i18n/routing";

export default function ButtonGreen({ text, link }) {
  return (
    <div>
      <button>
        <Link
          className={` text-white text-lg font-medium whitespace-nowrap flex justify-center items-center gap-2 p-4 clip-custom hover:clip-reverse bg-green-900 
          transition-all duration-300 transform hover:scale-105 hover:shadow-lg`} // Animacja i efekty na hover
          href={link}
        >
          {text}
        </Link>
      </button>
    </div>
  );
}
