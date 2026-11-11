import ReservationForm from "./ReservationForm";

export const metadata = {
  title: "Rezerwacja stolika | Restauracja Muszynova",
  description:
    "Zarezerwuj stolik w restauracji Muszynova online. Wybierz termin, godzinę i stolik.",
  alternates: {
    canonical: "https://muszynova.pl/restauracja/rezerwacja",
  },
  // Do czasu uruchomienia rezerwacji strona nie jest indeksowana
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="px-6 xl:px-16 2xl:px-44 pt-16 xl:pt-20 pb-24">
      <h1 className="text-4xl xl:text-5xl font-bold">Zarezerwuj stolik</h1>
      <p className="mt-6 mb-10 max-w-2xl text-neutral-700">
        Wybierz termin, godzinę i stolik. Po wysłaniu prośby restauracja
        potwierdzi rezerwację mailowo.
      </p>
      <ReservationForm />
    </div>
  );
}
