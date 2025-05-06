export default function Header({ text }) {
  return (
    <div className="bg-customGold px-6 md:px-24 py-8 md:py-16">
      <h1 className="text-4xl md:text-5xl 2xl:text-6xl text-white">{text}</h1>
    </div>
  );
}
