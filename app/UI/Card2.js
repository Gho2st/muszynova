import Button from "./Buttons/Button";

export default function Card2({
  icon,
  bgColor = "bg-customGreen",
  title,
  text,
  text2,
  hours,
  buttonText,
  link,
}) {
  // Funkcja do renderowania tekstu z klikalnymi numerami telefonów
  const renderTextWithTelLinks = (textArray) => {
    return textArray.map((line, index) => {
      // Sprawdzamy, czy linia zawiera numer telefonu (format: +48 123 456 789)
      const phoneMatch = line.match(/(\+48 \d{3} \d{3} \d{3})/);
      if (phoneMatch) {
        const phoneNumber = phoneMatch[0]; // np. "+48 509 445 000"
        const phoneNumberClean = phoneNumber.replace(/\s/g, ""); // np. "+48509445000"
        const [beforePhone, afterPhone] = line.split(phoneNumber); // Dzielimy tekst na części przed i po numerze

        return (
          <span key={index}>
            {beforePhone}
            <a
              href={`tel:${phoneNumberClean}`}
              className="text-white underline hover:text-gray-400 duration-300 tranition-all"
            >
              {phoneNumber}
            </a>
            {afterPhone}
            {index < textArray.length - 1 && <br />}
          </span>
        );
      }
      return (
        <span key={index}>
          {line}
          {index < textArray.length - 1 && <br />}
        </span>
      );
    });
  };

  // Rozdzielamy tekst na linie (usuwamy puste linie)
  const textLines = text.split("<br />").filter((line) => line.trim() !== "");

  return (
    <div className={`flex flex-col justify-between ${bgColor} p-8 h-full`}>
      <div className="p-3 w-fit rounded-full text-5xl text-black bg-white flex items-center justify-center">
        {icon && icon}
      </div>
      <h2 className="text-xl xl:text-2xl mt-6 text-white">{title}</h2>
      <h3 className="mt-10 font-semibold text-gray-200">{hours}:</h3>
      <p className="mt-5 text-gray-300 font-light flex-grow">
        {renderTextWithTelLinks(textLines)}
      </p>
      <span></span>
      <div className="mt-10 flex justify-center">
        <Button text={buttonText} link={link} />
      </div>
    </div>
  );
}
