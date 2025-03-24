import Image from "next/image";

export default function Restaurant() {
  return (
    <section className="bg-[#C4966C] px-6 xl:px-44 py-20 text-white overflow-x-hidden">
      <h2 className="text-4xl xl:text-5xl text-center font-extrabold text-white mb-6">
        Restauracja Muszynova
      </h2>
      <div className="text-white text-center xl:w-4/5 mx-auto">
        <p className="text-lg xl:text-xl font-semibold mb-6">
          Stawiamy na novą jakość, na odkrywanie beskidzkich smaków na novo
        </p>
        <p className="font-light xl:text-lg">
          Restauracja oferująca zdrowe i lekkie menu. Niewielka karta, z
          regionalnymi akcentami w daniach przybliży kuchnię beskidzką. Lekko?
          Tak! Komfortowo? Również pizza nie jest nam obca. Dla każdego coś
          miłego, dbamy o dzieci, młodzież, jak ale i dorosłych, zapraszając na
          drinka.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 mt-24 gap-16">
        {/* left container */}
        <div className="lg:text-right flex flex-col gap-16">
          {/* lokalne skladniki */}
          <div className="xl:translate-x-[4rem]">
            <div className="flex items-center lg:justify-end gap-5 md:gap-10">
              <Image
                src={"/restauracja/mleko-ser.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">Lokalne Składniki</h3>
            </div>
            <p className="font-light mt-5 ">
              Promujemy smaki beskidziej kuchni. Odkrywamy na nOvo dodając
              współczesnego twistu.
            </p>
          </div>
          {/* dzieciece smaki */}
          <div>
            <div className="flex items-center lg:justify-end gap-5 md:gap-10">
              <Image
                src={"/restauracja/lody.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">Dziecięce Smaki</h3>
            </div>
            <p className="font-light mt-5 ">
              Myślimy o najmłodszych, aby mieli frajdę z czasu u nas. Wybawione
              chętniej zjedzą posiłek. Ulubione frytki? A czemu by nie z
              batatów. Rozpieszczamy kubki smakowe i uczymy dobrych nawyków. Na
              zdrowie.
            </p>
          </div>
          {/* NOve standardy */}
          <div className="xl:translate-x-[4rem]">
            <div className="flex items-center lg:justify-end gap-5 md:gap-10">
              <Image
                src={"/restauracja/5gwiazdek.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">NOve standardy</h3>
            </div>
            <p className="font-light mt-5 ">
              Pyszne jedzenie, zdrowszy wybór, ale i komfortowa atmosfera.
              Przyjemność odkrywana na nOvo także z przebywania w pięknym
              wnętrzu o loftowym charakterze.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/restauracja/salatka-2.webp"
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </div>
        {/* PRAWO */}
        <div className="text-right flex flex-col gap-16">
          {/* zdrowszy wybor */}
          <div className="xl:translate-x-[-4rem]">
            <div className="flex items-center flex-row-reverse gap-5 md:gap-10">
              <Image
                src={"/restauracja/pizza.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">Zdrowszy wybór</h3>
            </div>
            <p className="font-light mt-5 ">
              Pizza może być zdrowszym wyborem, jeśli postawimy na
              pełnoziarnistą mąkę. Nie tylko jedz, smakuj, ale i Odżywiaj się z
              nami.
            </p>
          </div>
          {/* dla doroslych */}
          <div>
            <div className="flex items-center flex-row-reverse gap-5 md:gap-10">
              <Image
                src={"/restauracja/kawa.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">Dla dorosłych</h3>
            </div>
            <p className="font-light mt-5 ">
              Pyszna kawa, ale i co nieco z procentami. Lekka sałatka, a może
              przyjemny kawałek domowego deseru. Idealne miejsce do posiedzenia
              przy książce, czy też miłego spędzenia wieczoru z ukochaną osobą.
            </p>
          </div>
          {/* imprezy okolicznosciowe*/}
          <div className="xl:translate-x-[-4rem]">
            <div className="flex items-center flex-row-reverse gap-5 md:gap-10">
              <Image
                src={"/restauracja/tort.webp"}
                width={100}
                height={100}
                alt=""
              />
              <h3 className="text-3xl font-semibold">
                Imprezy okolicznościowe
              </h3>
            </div>
            <p className="font-light mt-5 ">
              Osobna sala na zorganizowanie przyjęcia z atrakcjami dla
              najmłodszych. W końcu dorośli porozmawiają przy stole, a dzieci…
              obiecujemy, że dla wszystkich zapewniamy food & fun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
