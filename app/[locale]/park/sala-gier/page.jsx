import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { TbCrystalBall } from "react-icons/tb";
import { IoIosFootball } from "react-icons/io";
import { GiCyberEye } from "react-icons/gi";

export const metadata = {
  title: "Sala Gier Muszynova - Rozrywka w Muszynie",
  alternates: {
    canonical: "https://muszynova.pl/park/sala-gier",
  },

  description:
    "Sala Gier Muszynova w Muszynie – bilard, piłkarzyki, cymbergaj, tenis stołowy dla każdego. Aktywna rozrywka, rywalizacja i zabawa – odwiedź nas!",
};

export default function Gry() {
  return (
    <>
      {/* hero */}
      <div className="flex flex-col xl:flex-row gap-10 py-16 xl:py-20">
        <div className="xl:w-2/5 px-6 xl:p-16 ">
          <h1 className="text-4xl xl:text-6xl font-bold">Sala Gier </h1>
          <p className="mt-10">
            W Parku Muszynova pragnęliśmy stworzyć miejsce gdzie razem ze swoimi
            przyjaciółmi, możecie rywalizować i dobrze się bawić. <br></br>{" "}
            <br></br> Dla miłośników strategii i precyzji oferujemy
            profesjonalny stół bilardowy oraz stoły do tenisa stołowego, na
            których możecie poprawić swoje umiejętności koncentracji czy
            koordynacji wzrokowo-ruchowej. Dodatkowo, dla tych, którzy cenią
            szybkie i emocjonujące rozgrywki, przygotowaliśmy stół do
            piłkarzyków i air hockey’a. <br></br> <br></br> Przyjazna atmosfera,
            nowoczesne wyposażenie i doskonała rozrywka sprawią, że czas
            spędzony w Muszynova będzie nie tylko aktywny, ale także niezwykle
            przyjemny. Zapraszamy do odkrywania fascynującego świata na noVo.
          </p>
          <div className="mt-10">
            <Button text="Cennik" link="/cennik" />
          </div>
        </div>
        <div className="xl:w-3/5 flex justify-center items-center">
          <Image
            src="/park/sala-gier/s1.webp"
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
            <h3 className="text-4xl font-semibold">Sala Gier</h3>
            <p className="mt-10">
              W naszej sali gier znajdziesz atrakcje, które dostarczą
              niezapomnianych chwil zarówno indywidualnie, jak i w gronie
              przyjaciół czy rodziny. Profesjonalny stół do bilarda daje
              możliwość rywalizacji i doskonalenia swoich umiejętności, tworząc
              atmosferę sportowej pasji. Stoliki do piłkarzyków i air hockey’a,
              z kolei, przenoszą graczy w świat emocji i szybkiej akcji.
              <br></br>
              <br></br> W Muszynova kładziemy nacisk nie tylko na aktywność
              fizyczną, ale także na całościową przyjemność z czasu spędzonego w
              naszym centrum rekreacyjnym. Zapraszamy do odkrywania
              fascynującego świata gier i zabaw w Muszynova!
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<TbCrystalBall />}
              title={"Bilard"}
              buttonText={"Kontakt"}
              link=""
              bgColor="bg-black"
              text="Bilard to doskonała zabawa, ale także świetny sposób na rozwijanie koncentracji, precyzji i umiejętności strategicznego planowania. Gra w bilard umożliwia budowanie strategii i taktyki. Bez względu na poziom zaawansowania, bilard jest dostępny dla wszystkich, a jednocześnie może dostarczyć emocji zarówno amatorom, jak i zawodowcom."
            />
            <Card
              icon={<IoIosFootball />}
              title={"Piłkarzyki"}
              link=""
              buttonText={"Kontakt"}
              bgColor="bg-black"
              text="Piłkarzyki doskonale łączą elementy współzawodnictwa i zabawy, sprawiając, że każda rozgrywka staje się niezapomnianym doświadczeniem dla wszystkich uczestników."
            />
            <Card
              icon={<GiCyberEye />}
              title={"Cymbergaj"}
              buttonText={"Kontakt"}
              link=""
              bgColor="bg-black"
              text="Cymbergaj, znany także jako air hockey, to elektryzująca gra, która przenosi rywalizację na płaską powierzchnię stołu. Rozgrywana przy użyciu specjalnych krążków i rączek, oferuje szybkie tempo, refleksyjną grę oraz pełne emocji zmagania."
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <div className="relative w-full h-132">
            {/* Stała wysokość i pełna szerokość */}
            <Image
              src="/park/sala-gier/s1.webp"
              layout="fill" // Wypełnia kontener rodzica
              objectFit="cover" // Przycina obraz, aby wypełnić kontener
              alt="Mini kręgielnia - zdjęcie 1"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/sala-gier/s2.jpg"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/sala-gier/s3.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
            />
          </div>
          <div className="relative w-full h-132">
            <Image
              src="/park/sala-gier/s4.webp"
              layout="fill"
              objectFit="cover"
              alt="Mini kręgielnia - zdjęcie 2"
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
