"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Stars from "../UI/Stars";
import { useTranslations } from "next-intl";

export default function Reviews() {
  const t = useTranslations("reviews");

  // Tablica recenzji
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
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    dots: true,
    responsive: [
      {
        breakpoint: 1224,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 680, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="py-16 xl:py-24 px-6 xl:px-32" id="opinie">
      <div className="mx-auto text-center">
        <h2 className="text-3xl xl:text-4xl font-bold">
          {t("header2")} <span className="text-customGold">166</span>{" "}
          {t("header")} <span className="text-customGold">4.8/5!</span>
        </h2>
        <p className="mt-10 xl:mt-12 xl:text-lg leading-relaxed">{t("text")}</p>

        <div className="mt-12 xl:mt-14">
          <Slider {...settings} className="w-[90%] xl:w-[100%] mx-auto">
            {reviews.map((review, index) => (
              <div key={index} className="p-3 xl:p-4">
                <div className="bg-white p-6 shadow-lg rounded-xl text-center flex flex-col items-center">
                  <div className="flex">
                    <Stars />
                  </div>
                  <p className="mt-4 text-gray-700">
                    &quot;{t(review.text)}&quot;
                  </p>
                  <div className="w-full h-px bg-gray-300 my-4"></div>
                  <p className="font-bold text-black">{t(review.nameKey)}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
