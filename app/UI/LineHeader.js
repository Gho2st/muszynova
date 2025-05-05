export default function LineHeader({ text }) {
  return (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      <div className="h-1 bg-customGold w-full"></div>
      <h2 className="uppercase text-green-900 text-3xl md:text-4xl text-center font-bold md:whitespace-nowrap">
        {text}
      </h2>
      <div className="h-1 bg-customGold w-full"></div>
    </div>
  );
}
