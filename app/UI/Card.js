import Button from "./Buttons/Button";
export default function Card({
  icon,
  bgColor = "bg-customGreen",
  title,
  text,
  buttonText,
  link,
}) {
  return (
    <div className={`flex flex-col justify-between ${bgColor} p-8 h-full`}>
      <div className="p-3 w-fit rounded-full text-5xl text-black bg-white flex items-center justify-center">
        {icon && icon}
      </div>
      <h4 className="text-2xl mt-6 text-white">{title}</h4>
      <p
        className="mt-10 text-gray-300 font-light flex-grow"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <div className="mt-10 flex justify-center">
        <Button text={buttonText} link={link} />
      </div>
    </div>
  );
}
