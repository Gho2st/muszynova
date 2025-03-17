import Image from "next/image";
import Button from "@/app/UI/Buttons/Button";
import Map from "@/app/UI/Map/Map";
import Card from "@/app/UI/Card";
import { CiLocationOn } from "react-icons/ci";
import { LuSchool } from "react-icons/lu";
import { TbBowling } from "react-icons/tb";

export const metadata = {
  title: "Hala Sportowa Muszynova - Muszyna",
  alternates: {
    canonical: "https://muszynova.pl/park-rekreacyjno-sportowy/hala-sportowa",
  },

  description:
    "Hala Sportowa Muszynova w Muszynie – wynajem, gry zespołowe: koszykówka, siatkówka, badminton. Oferta dla szkół i pasjonatów sportu!",
};

export default function Hala() {
  return (
    <>
      {/* hero */}
      <div className="xl:flex pb-20">
        <div className="xl:w-1/3 px-6 xl:p-16 pt-20 xl:pl-16">
          <h1 className="text-4xl xl:text-6xl font-bold">Hala Sportowa</h1>
          <p className="mt-10">
            Nasza hala sportowa to miejsce, gdzie sport staje się pasją, a ruch
            to sposób na zdrowie i rozwijanie umiejętności. To przestrzeń, która
            oferuje doskonałe warunki do uprawiania różnorodnych dyscyplin
            sportowych, ale także inspiruje do aktywnego trybu życia i wspólnej
            rywalizacji. <br></br> <br></br> Hala sportowa jest obiektem, który
            posiada boisko mogące spełniać funkcje, boiska do koszykówki,
            siatkówki, badmintona czy piłki ręcznej. To miejsce, które tętni
            energią i stwarza doskonałe warunki dla zawodników, jak i amatorów
            sportu.
          </p>
          <div className="mt-10">
            <Button text="Kontakt" link="/kontakt" />
          </div>
        </div>
        <div className="mt-16 xl:mt-0 xl:w-2/3">
          <Image
            src="/park/hala-sportowa/h1.webp"
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
            <h3 className="text-4xl font-semibold">Hala Sportowa</h3>
            <p className="mt-10">
              W Muszynova serdecznie zapraszamy do skorzystania z naszej hali
              sportowej, gdzie ruch staje się przyjemnością, a sport to nie
              tylko aktywność fizyczna, ale także wspólna pasja. <br></br>
              <br></br> Dołącz do nas i odkryj radość z ruchu!
            </p>
          </div>
          <div className="xl:w-3/4 grid xl:grid-cols-3 gap-5 text-white">
            <Card
              icon={<CiLocationOn />}
              title={"Wynajem hali"}
              link="/cennik"
              buttonText={"Cennik"}
              bgColor="bg-black"
              text="Wynajem naszej hali sportowej to gwarancja profesjonalnej infrastruktury, elastyczności harmonogramu oraz wsparcia doświadczonych pracowników. Dbamy o to, aby każde wydarzenie odbyło się w przyjaznej atmosferze z zachowaniem wysokich standardów bezpieczeństwa i komfortu."
            />
            <Card
              icon={<TbBowling />}
              title={"Gry zespołowe"}
              link="/galeria"
              buttonText={"Galeria"}
              bgColor="bg-black"
              text="Nasza sala dostosowana jest do różnych dyscyplin sportowych, takich jak koszykówka, siatkówka, piłka ręczna, badminton. Elastyczność przestrzeni pozwala dostosować ustawienie sali do konkretnych potrzeb, co sprawia, że jesteśmy gotowi sprostać różnym oczekiwaniom."
            />
            <Card
              icon={<LuSchool />}
              link="/o-nas"
              title={"Oferta dla szkół"}
              buttonText={"O Nas"}
              bgColor="bg-black"
              text="Nasza hala sportowa została stworzona z myślą o wspieraniu aktywności fizycznej i zdrowego stylu życia wśród uczniów. Istnieje możliwość wynajęcia sali pod zajęcia szkolne lub poza lekcyjne."
            />
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 gap-10">
          <Image
            src="/park/hala-sportowa/h1.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/hala-sportowa/h2.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/hala-sportowa/h3.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
          <Image
            src="/park/hala-sportowa/h4.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </section>
      </section>
      <section className="pt-20">
        <Map />
      </section>
    </>
  );
}
