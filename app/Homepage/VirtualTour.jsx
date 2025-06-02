"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const VirtualTour = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const t = useTranslations("virtualtour");

  const handleLoadIframe = () => {
    setIsIframeLoaded(true);
  };

  return (
    <section id="virtual-tour" className="px-6 xl:px-44 py-16 xl:py-20">
      <h2 className="text-4xl xl:text-6xl font-extrabold mb-16 xl:mb-24 text-center">
        {t("header")}
      </h2>
      <div className="relative h-[430px] lg:h-[600px] xl:h-[750px]">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-gray-200"
          style={{
            backgroundImage: "url('/virtual.webp')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay - adjust opacity with bg-black/[0.5] */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          {isIframeLoaded ? (
            <iframe
              src="/virtual-tour/index.html"
              className="h-full w-full"
              title={t("header")}
              loading="lazy"
            />
          ) : (
            <button
              onClick={handleLoadIframe}
              className="text-lg font-medium whitespace-nowrap flex justify-center items-center gap-2 p-4 bg-customGold cursor-pointer text-white clip-custom hover:clip-reverse transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {t("button")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
