"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Gallery({ images = [] }) {
  const [gallery, setGallery] = useState(images);

  useEffect(() => {
    setGallery(images);
  }, [images]);

  const carouselSettings = {
    infinite: true,
    speed: 6000, // Dłuższy czas przejścia dla płynniejszego efektu
    lazyLoad: "ondemand",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Ustaw na 0, aby ruch był ciągły
    cssEase: "linear", // Linearne przejście dla stałej prędkości
    initialSlide: 0,
    centerMode: true,
    dots: false,
    arrows: true,
    pauseOnHover: false, // Wyłącza zatrzymywanie przy najechaniu
    responsive: [
      {
        breakpoint: 1334,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  if (!gallery || gallery.length === 0) {
    return (
      <div className="mb-20 mt-10 text-center">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Slider {...carouselSettings} className="mx-auto">
        {gallery.map((image, index) => (
          <div
            key={image.id || index}
            className="relative w-full h-[300px] md:h-[500px]"
          >
            <Image
              src={image.url || image}
              alt={image.alt || `Gallery Image ${index}`}
              fill
              className="md:rounded-xl object-cover focus:outline-none"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
