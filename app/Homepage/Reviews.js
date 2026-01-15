"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Stars from "../UI/Stars";
import { useTranslations } from "next-intl";
import { FaQuoteRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Reviews() {
  const t = useTranslations("reviews");

  const reviews = [
    { text: "cards.1.text", nameKey: "cards.1.name" },
    { text: "cards.2.text", nameKey: "cards.2.name" },
    { text: "cards.3.text", nameKey: "cards.3.name" },
    { text: "cards.4.text", nameKey: "cards.4.name" },
    { text: "cards.5.text", nameKey: "cards.5.name" },
    { text: "cards.6.text", nameKey: "cards.6.name" },
    { text: "cards.7.text", nameKey: "cards.7.name" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-out", // Nieco płynniejsza animacja niż linear
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }, // Ukrywamy strzałki na mobile
      },
    ],
  };

  // Funkcja pomocnicza do pobierania inicjału
  const getInitial = (nameKey) => {
    const name = t(nameKey);
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <section
      className="py-20 xl:py-28 bg-[#F9FAFB] overflow-hidden"
      id="opinie"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* TRUST BADGE GOOGLE */}
        <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
          <FcGoogle className="text-2xl" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {t("google")}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900">4.8</span>
              <div className="flex text-yellow-400 text-xs">★★★★★</div>
            </div>
          </div>
        </div>

        {/* NAGŁÓWEK */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {t("header")}
          <span className="text-customGold italic"> {t("header2")}</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-16 leading-relaxed">
          {t("text")}
        </p>

        {/* SLIDER */}
        <div className="relative">
          <Slider {...settings} className="pb-12">
            {reviews.map((review, index) => (
              <div key={index} className="h-full p-4">
                {/* KARTA OPINII */}
                <div className="group relative bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-customGold/20">
                  {/* Dekoracyjny cudzysłów w tle */}
                  <FaQuoteRight className="absolute top-6 right-6 text-gray-100 text-5xl transition-colors group-hover:text-customGold/10" />

                  {/* Gwiazdki */}
                  <div className="mb-6 scale-90 flex">
                    <Stars />
                  </div>

                  {/* Treść Opinii */}
                  <p className="text-gray-600 italic leading-relaxed mb-8 flex-grow relative z-10">
                    &quot;{t(review.text)}&quot;
                  </p>

                  {/* Separator */}
                  <div className="w-12 h-1 bg-gray-100 rounded-full mb-6 group-hover:bg-customGold/30 transition-colors"></div>

                  {/* Autor z Avatarem (Inicjał) */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 font-bold flex items-center justify-center border border-white shadow-inner group-hover:from-customGold group-hover:to-yellow-500 group-hover:text-white transition-all duration-300">
                      {getInitial(review.nameKey)}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900 text-sm">
                        {t(review.nameKey)}
                      </p>
                      <p className="text-xs text-gray-400">{t("opinion")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
