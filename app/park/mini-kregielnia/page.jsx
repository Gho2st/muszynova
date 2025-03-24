import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TbBowling } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";

export const metadata = {
  title: "Mini Kręgielnia Muszynova - Muszyna",
  alternates: {
    canonical: "https://muszynova.pl/park-rekreacyjno-sportowy/mini-kregielnia",
  },

  description:
    "Mini Kręgielnia Muszynova w Muszynie – zabawa dla dzieci, dorosłych, grup. Urodziny, integracje, kręgle w przyjaznej atmosferze – sprawdź nas!",
};

export default function Kregielnia() {
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">Mini Kręgielnia</h1>
          <p className="mt-10">
            Mini kręgielnia to świetna forma rozrywki, która przynosi radość
            zarówno dzieciom, jak i dorosłym. Pomniejszone kręgle, mniejszy
            dystans, ale ta sama dawka zabawy – to wszystko czeka na entuzjastów
            mini kręgli w naszym centrum rekreacyjnym. Mini Kręgielnia nie
            wymaga specjalnych umiejętności, co sprawia, że jest dostępna dla
            każdego. To także świetna opcja na spędzenie czasu w gronie
            przyjaciół czy rodziny, zachęcając do zdrowej rywalizacji i
            wzajemnej zabawy.
          </p>
          <div className="mt-10">
            <Button
              text="Zarezerwuj"
              link="https://muszynova.oos.pl/reservations"
            />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/mini-kregielnia/k1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </div>
      </div>

      {/* more section */}
      <section className="px-6 xl:px-24 xl:py-20">
        <div className="flex flex-col-reverse xl:flex-row justify-between xl:mb-10">
          <div className="w-2/3 xl:w-1/5 mx-auto xl:mx-0">
            <Image
              src={"/logo2.webp"}
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex xl:w-3/4 justify-center items-center">
            <h2 className="text-4xl xl:text-6xl text-customGold text-center font-bold">
              Co nas wyróżnia?
            </h2>
          </div>
        </div>
        <div className="flex flex-col-reverse xl:flex-row">
          <div className="xl:w-1/4 pr-10 xl:mr-2 mt-20 xl:mt-0">
            <h3 className="text-4xl font-semibold">Mini Kręgielnia</h3>
            <p className="mt-10">
              W Muszynova serdecznie zapraszamy do naszej nowoczesnej kręgielni,
              gdzie doskonała atmosfera, nowoczesne zaplecze oraz entuzjastyczny
              personel tworzą idealne warunki do cieszenia się tą klasyczną, a
              jednocześnie emocjonującą grą. Niech każdy rzut stanie się
              pretekstem do uśmiechu i dobrej zabawy!
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<TbBowling />}
              title={"Kręgle dla dzieci"}
              buttonText={"Kontakt"}
              bgColor="bg-black"
              link="/o-nas"
              text="Kręgle to nie tylko gra dla dorosłych, ale także doskonała forma rozrywki dla najmłodszych. Kolorowe kręgle przyciągają uwagę dzieci, tworząc przy tym dynamiczną i radosną atmosferę. To świetna zabawa, i sposób na rozwijanie umiejętności motorycznych, precyzji oraz współpracy z rówieśnikami."
            />
            <Card
              icon={<LiaBirthdayCakeSolid />}
              title={"Urodziny"}
              buttonText={"Kontakt"}
              bgColor="bg-black"
              link="/kontakt"
              text="Kręgle to doskonały sposób na zorganizowanie aktywnego przyjęcia, które zadowoli zarówno maluchy, jak i starszych gości.
"
            />
            <Card
              icon={<FaPeopleGroup />}
              title={"Grupy"}
              buttonText={"Restauracja"}
              bgColor="bg-black"
              link="/restauracja"
              text="Oferujemy możliwość zorganizowania dynamicznych zajęć grupowych. To doskonała opcja dla firm, szkół, czy grup przyjaciół, poszukujących atrakcyjnej i integracyjnej formy spędzenia czasu.
"
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/mini-kregielnia/k1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/mini-kregielnia/k2.jpg"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/mini-kregielnia/k4.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 3"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/mini-kregielnia/k3.jpg"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 4"
            />
          </div>
        </section>
      </section>
      <section className="pt-20">
        <Map />
      </section>
    </>
  );
}
