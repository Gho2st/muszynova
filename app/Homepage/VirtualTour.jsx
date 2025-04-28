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
      <div className="h-[430px] lg:h-[600px] xl:h-[750px] flex items-center justify-center bg-gray-200">
        {isIframeLoaded ? (
          <iframe
            src="/virtual-tour/index.htm"
            className="h-full w-full"
            title={t("header")}
            loading="lazy"
          />
        ) : (
          <button
            onClick={handleLoadIframe}
            className="px-6 py-3 bg-customGold cursor-pointer text-white font-semibold rounded-lg ransition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {t("button")}
          </button>
        )}
      </div>
    </section>
  );
};

export default VirtualTour;
