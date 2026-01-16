"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";

const CookieConsent = () => {
  const t = useTranslations("polityka-cookies.banner");
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    ad_Storage: "denied",
    analytics_Storage: "denied",
  });

  // Funkcja obsługująca zgodę dla GTM
  const handleGTMConsent = (consentState) => {
    if (typeof window !== "undefined") {
      if (consentState.analytics_Storage === "granted") {
        // console.log("CookieConsent: Loading GTM script");
        const existingScript = document.getElementById("gtm-script");
        if (existingScript) {
          existingScript.remove();
        }
        const script = document.createElement("script");
        script.id = "gtm-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-TR69S642`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        // console.log("CookieConsent: GTM initialized");
      } else {
        // console.log(
        //   "CookieConsent: Analytics consent denied, removing GTM script"
        // );
        const existingScript = document.getElementById("gtm-script");
        if (existingScript) {
          existingScript.remove();
        }
        if (window.dataLayer) {
          window.dataLayer = [];
        }
      }
    }
  };

  // Sprawdzenie istniejącej zgody
  useEffect(() => {
    // console.log("CookieConsent: Checking localStorage for consent");
    const storedConsent = localStorage.getItem("consent");
    if (storedConsent) {
      // console.log("CookieConsent: Found stored consent:", storedConsent);
      const parsedConsent = JSON.parse(storedConsent);
      setConsent(parsedConsent);
      handleGTMConsent(parsedConsent);
      setShowBanner(false);
    } else {
      // console.log("CookieConsent: No stored consent, showing banner");
      setShowBanner(true);
    }
  }, []);

  // Zapis zgody i aktualizacja GTM
  const saveConsent = (newConsent) => {
    // console.log("CookieConsent: Saving consent:", newConsent);
    setConsent(newConsent);
    localStorage.setItem("consent", JSON.stringify(newConsent));
    handleGTMConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  // Obsługa przycisku "Zaakceptuj wszystkie"
  const handleAcceptAll = () => {
    const newConsent = {
      ad_Storage: "granted",
      analytics_Storage: "granted",
    };
    saveConsent(newConsent);
  };

  // Obsługa przycisku "Odrzuć wszystkie"
  const handleRejectAll = () => {
    const newConsent = {
      ad_Storage: "denied",
      analytics_Storage: "denied",
    };
    saveConsent(newConsent);
  };

  // Obsługa zapisu ustawień niestandardowych
  const handleSaveSettings = () => {
    saveConsent(consent);
  };

  // Przełączanie zgód
  const toggleConsent = (key) => {
    setConsent((prev) => ({
      ...prev,
      [key]: prev[key] === "granted" ? "denied" : "granted",
    }));
  };

  if (!showBanner) {
    // console.log("CookieConsent: Banner hidden due to showBanner being false");
    return null;
  }

  // console.log("CookieConsent: Rendering banner");
  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:mx-4 bg-gray-900 text-white p-4 md:p-6 rounded-t-lg md:rounded-lg shadow-xl z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 tracking-tight">
          {t("header")}
        </h2>
        <p className="mb-3 md:mb-4 text-xs md:text-sm leading-relaxed text-gray-300">
          {t("text")}
        </p>
        <Link
          href="/polityka-cookies"
          className="text-blue-400 hover:underline text-xs md:text-sm inline-block mb-3 md:mb-4"
        >
          {t("link")}
        </Link>

        {showSettings && (
          <div className="mt-3 md:mt-4 flex flex-col gap-2 md:gap-3 bg-gray-800 p-3 md:p-4 rounded-md transition-all duration-300">
            <h3 className="text-base md:text-lg font-semibold tracking-tight">
              {t("settings.header")}
            </h3>
            <p className="text-xs md:text-sm text-gray-300 mb-2 md:mb-3">
              {t("settings.text")}
            </p>
            <label className="flex items-center gap-2 md:gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.analytics_Storage === "granted"}
                onChange={() => toggleConsent("analytics_Storage")}
                className="h-4 w-4 md:h-5 md:w-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-xs md:text-sm">
                {t("settings.analytics.label")}
              </span>
            </label>
            <label className="flex items-center gap-2 md:gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.ad_Storage === "granted"}
                onChange={() => toggleConsent("ad_Storage")}
                className="h-4 w-4 md:h-5 md:w-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-xs md:text-sm">
                {t("settings.advertising.label")}
              </span>
            </label>
            <div className="flex justify-center gap-2 md:gap-4 mt-2 md:mt-3">
              <button
                onClick={handleSaveSettings}
                className="relative bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-blue-500 transition-all duration-200 text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {t("settings.buttons.save")}
                <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 bg-gray-300 transition-opacity duration-200" />
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="relative bg-gray-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-gray-600 transition-all duration-200 text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {t("settings.buttons.cancel")}
                <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 bg-gray-300 transition-opacity duration-200" />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-row justify-center gap-2 md:gap-4 mt-3 md:mt-4">
          <button
            onClick={handleAcceptAll}
            className="relative bg-green-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-green-500 transition-all duration-200 text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {t("buttons.acceptAll")}
            <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 bg-gray-300 transition-opacity duration-200" />
          </button>
          <button
            onClick={handleRejectAll}
            className="relative bg-red-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-red-500 transition-all duration-200 text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {t("buttons.rejectAll")}
            <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 bg-gray-300 transition-opacity duration-200" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="relative bg-gray-700 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-gray-600 transition-all duration-200 text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {t("buttons.customize")}
            <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 bg-gray-300 transition-opacity duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
