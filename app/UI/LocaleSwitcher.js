"use client";

import { useState } from "react";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  function changeLocale(nextLocale) {
    router.replace({ pathname }, { locale: nextLocale });
    setIsOpen(false); // Zamknij dropdown po wybraniu języka
  }

  const localeFlags = {
    pl: "🇵🇱", // Polska
    en: "🇬🇧", // Angielski
    de: "🇩🇪", // Niemiecki
    ua: "🇺🇦", // Ukraiński
    sk: "🇸🇰", // Słowacki
  };

  return (
    <div className="relative">
      {/* Przycisk otwierający dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center border border-gray-300 p-1 xl:p-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center">
          {localeFlags[locale]}{" "}
          <span className="ml-1">{locale.toUpperCase()}</span>
        </span>
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown z językami */}
      {isOpen && (
        <div className="absolute top-full mt-1 w-24 rounded-lg bg-white shadow-lg border border-gray-200 z-10">
          {routing.locales.map((cur) => (
            <button
              key={cur}
              onClick={() => changeLocale(cur)}
              className={`flex items-center w-full px-3 py-2 text-black hover:bg-gray-100 ${
                locale === cur ? "bg-gray-100" : ""
              }`}
            >
              <span className="flex items-center">
                {localeFlags[cur]}{" "}
                <span className="ml-2">{cur.toUpperCase()}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
