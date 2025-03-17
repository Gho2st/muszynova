import Image from "next/image";
import Button from "../UI/Buttons/Button";
import Restaurant from "../Homepage/Restaurant";
import Card from "../UI/Card";
import { BiSolidParty } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export const metadata = {
  title: "Restauracja Muszynova - Smaki Beskidu w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/restauracja",
  },

  description:
    "Restauracja Muszynova w Muszynie – regionalna kuchnia beskidzka, pizza, napoje, imprezy, konferencje. Smacznie i nowocześnie – odwiedź nas!",
};

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="p-16 pt-20">
          <h1 className="text-6xl font-bold">Restauracja Muszynova</h1>
          <p className="mt-10">
            Stawiamy na jakość, na odkrywanie smaków na novo. <br></br>{" "}
            <br></br>
            Restauracja oferująca zdrowe i lekkie menu. Niewielka karta, z
            regionalnymi akcentami w daniach przybliży kuchnię beskidzką. Lekko?
            Tak! Komfortowo? Również pizza nie jest nam obca. Dla każdego coś
            miłego, dbamy o dzieci, młodzież, jak ale i dorosłych, zapraszając
            na drinka.
          </p>
        </div>
        <div>
          <Image
            src={"/restauracja/r1.webp"}
            height={100}
            width={100}
            layout="responsive"
            alt=""
          />
        </div>
      </div>
      {/* 2 */}
      <div className="grid grid-cols-2">
        <div>
          <Image
            src={"/restauracja/r2.webp"}
            height={100}
            width={100}
            layout="responsive"
            alt=""
          />
        </div>
        <div className="p-16 pt-20">
          <h2 className="text-6xl text-center font-bold">Tu poznasz Menu</h2>
          <div className="flex flex-col gap-10 justify-center items-center mt-20">
            <Button text="Karta Menu" link="/menu.pdf" />
            <Button text="Karta Napojów" link="/karta-napojów.pdf" />
          </div>
        </div>
      </div>
      <Restaurant />
      <section className="px-6 xl:px-44 py-20">
        <h2 className="text-6xl font-bold text-center mb-20">
          Zorganizuj z nami na novo
        </h2>
        <div className="grid grid-cols-3 gap-10">
          <Card
            icon={<BiSolidParty />}
            title="Imprezy, jubileusze, spotkania"
            buttonText="Kontakt"
            link="/kontakt"
            text="Restauracja Muszynova – odkrywaj smaki, ale i miej dobry fun. Dbamy o połączenie idealne, dobry czas, dobre towarzystwo, w dobrym miejscu. Zapewniamy komfortowe miejsce na organizację imprez i eventów – spotkania rodzinne i towarzyskie, jubileusze i rocznice, bankiety firmowe, integracyjne, czy tez komunie oraz wesela organizuj z nami. Odkryj novą jakość."
          />

          <Card
            icon={<FaRegCalendar />}
            title={"Pokazy, wystawy, targi"}
            buttonText={"Galeria"}
            link="/galeria"
            text="Posiadamy komfortove dwie sale o łącznej powierzchni ponad 250 m. Na obydwóch salach mogą się odbywać dwie niezależne imprezy. Dodatkowo do dyspozycji mamy jeszcze halę sportową, na której organizujemy wydarzenia sportowe, ale także wystawy, pokazy, targi czy też koncerty. To miejsce do odkrycia przez Ciebie."
          />
          <Card
            icon={<FaPeopleGroup />}
            title={"Konferencje, spotkania biznesowe"}
            buttonText={"Restauracja"}
            link="/restauracja"
            text="Klientów biznesowych zapraszamy do organizowania konferencji. Obok restauracji mamy salę Novą – novoczesną i klimatyzowaną. Znajduje się w niej rzutniki wyświetlający obraz o powierzchni nawet 15 m kw. Osprzęt posiada w pełni profesjonalne okablowanie audio-video co daje możliwość szybkiej i sprawnej instalacji z urządzeniem zewnętrznym. Komfortovo, novocześnie."
          />
        </div>
      </section>
    </>
  );
}
