import Link from "next/link";

export default function SubmitButton({
  bgColor = "bg-[#C4966C]", // Kolor tła
  textColor = "text-white", // Kolor tekstu
  isSending,
}) {
  return (
    <button
      type="submit"
      disabled={isSending}
      className={` ${textColor} text-lg cursor-pointer font-medium whitespace-nowrap flex justify-center items-center gap-2 p-4 clip-custom hover:clip-reverse ${bgColor} 
          transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
    >
      {isSending ? "Wysyłanie..." : "Wyślij wiadomość!"}
    </button>
  );
}
