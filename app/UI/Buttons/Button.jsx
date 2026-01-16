import { Link } from "@/i18n/routing";

export default function Button({
  text,
  bgColor = "bg-[#C4966C]",
  textColor = "text-white",
  link,
}) {
  return (
    <div>
      <Link
        className={`
          ${textColor} 
          font-medium 
          flex justify-center items-center gap-2 
          clip-custom hover:clip-reverse 
          ${bgColor} 
          transition-all duration-300 transform hover:scale-105 hover:shadow-lg
          text-base sm:text-lg      
          p-3 sm:p-4             
        `}
        href={link}
      >
        <span>{text}</span>
      </Link>
    </div>
  );
}
