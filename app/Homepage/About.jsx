import Image from "next/image";
import Button from "../UI/Buttons/Button";

export default function About() {
  return (
    <section className="py-20 px-6">
      <div className="xl:flex">
        <div className="xl:w-1/2 xl:p-16">
          <Image
            src={"/about.jpg"}
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </div>
        <div className="mt-12 xl:mt-0 xl:w-1/2 xl:p-16">
          <h1 className="text-customGold font-bold text-3xl xl:text-4xl">
            Sport i Fun dla małych i dużych na nOvym poziomie
          </h1>
          <p className="my-10 text-lg font-light">
            Czy istnieje obiekt, w którym każdy może być sobą i spędzać czas
            tak, jak lubi? Taka myśl przyświecała nam, gdy projektowaliśmy
            Muszynova. Aby każdy czuł się komfortowo. Z myślą o najmłodszych,
            nastolatkach i dorosłych, rodzinach i singlach, przyjezdnych i
            mieszkańcach oraz grupach zorganizowanych powstał nasz Park
            Rekreacyjno – Sportowy. Otwieramy drzwi do rozrywki i aktywności na
            nowym poziomie jakości.
          </p>
          <Button
            text="Wirtualny Spacer"
            bgColor="bg-[#C4966C]"
            textColor="text-white"
            link=""
          />
        </div>
      </div>
    </section>
  );
}
