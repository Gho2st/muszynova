export default function TripProgram({ items, title }) {
  return (
    <div>
      <h3 className="text-2xl text-center text-customBlue font-bold mt-16 mb-10 ">
        {title}
      </h3>
      <ul className={`text-lg flex flex-col gap-2 md:w-3/4 mx-auto `}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
