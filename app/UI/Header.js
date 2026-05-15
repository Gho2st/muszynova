export default function Header({ text }) {
  return (
    <div className="bg-customGold px-6 md:px-24 py-8 2xl:pt-17">
      <h1 className="text-4xl 2xl:text-6xl text-white">{text}</h1>
    </div>
  );
}
