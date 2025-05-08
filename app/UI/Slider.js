"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Gallery({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 3, spacing: 16 },
    breakpoints: {
      "(max-width: 1334px)": { slides: { perView: 3, spacing: 16 } },
      "(max-width: 1150px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 800px)": { slides: { perView: 1, spacing: 12 } },
    },
    created(slider) {
      setSlideCount(slider.track.details.slides.length);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (!slider?.current) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        slider.current.next();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [slider, isPaused]);

  const pauseAutoplay = () => setIsPaused(true);

  return (
    <section className="relative bg-neutral-100 px-6 md:px-20 xl:px-32 2xl:px-44 py-16 md:py-20 2xl:py-24 overflow-x-hidden">
      <div className="relative mt-10">
        <button
          onClick={() => {
            slider.current?.prev();
            pauseAutoplay();
          }}
          className="hidden cursor-pointer md:flex absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 z-10 p-2 px-3 rounded-full bg-[#135042] hover:bg-green-600 text-white shadow-lg transition"
        >
          ◀
        </button>

        <div
          ref={sliderRef}
          className="keen-slider mx-auto"
          onMouseDown={pauseAutoplay}
          onTouchStart={pauseAutoplay}
        >
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="keen-slider__slide text-center rounded-xl  group flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
                  <Image
                    src={image.url}
                    alt={image.alt || "Gallery image"}
                    fill
                    priority={index < 2}
                    className="rounded-t-xl h-96 object-cover "
                    sizes="(max-width: 800px) 100vw, (max-width: 1150px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>

        <button
          onClick={() => {
            slider.current?.next();
            pauseAutoplay();
          }}
          className="hidden cursor-pointer md:flex absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 z-10 p-2 px-3 rounded-full bg-[#135042] hover:bg-green-600 text-white shadow-lg transition"
        >
          ▶
        </button>
      </div>

      <div className="flex justify-center mt-12 gap-2">
        {Array.from({ length: slideCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              slider.current?.moveToIdx(idx);
              pauseAutoplay();
            }}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-[#135042] scale-125" : "bg-gray-300"
            } transition-all`}
          />
        ))}
      </div>
    </section>
  );
}
