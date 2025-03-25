export default function Zajecia() {
  return (
    <>
      <section className="px-6 xl:px-24 py-16 xl:py-20">
        <h1 className="text-center text-5xl xl:text-6xl mb-16 xl:mb-20 font-bold text-customGold">
          Grafik zajęć
        </h1>
        <div className="flex justify-center">
          <iframe
            title="Kalendarz zajęć Muszynova"
            style={{
              width: "1600px",
              height: "800px",
              maxWidth: "100%",
              display: "inline-block",
            }}
            src="https://muszynova.oos.pl/calendar"
          />
        </div>
      </section>
    </>
  );
}
