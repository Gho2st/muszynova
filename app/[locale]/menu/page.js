// app/[locale]/menu/page.js
//
// Landing dla kodu QR "Menu" (QR koduje: https://muszynova.pl/menu, a /menu.pdf
// przekierowuje tutaj). Pokazuje WSZYSTKIE trzy wersje językowe.

import Header from "@/app/UI/Header";
import { ChevronRight, Languages } from "lucide-react";

export const metadata = {
  title: "Menu — Muszynova food & fun",
  description:
    "Wybierz wersję językową menu / Vyberte jazyk / Choose language.",
  robots: { index: false, follow: false }, // landing pod QR — nie indeksujemy
};

// Flagi jako inline SVG (lucide nie ma flag państw). Box ~10:7, zaokrąglany przez wrapper.
const FLAG = {
  pl: (
    <svg
      viewBox="0 0 20 14"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <rect width="20" height="7" fill="#ffffff" />
      <rect y="7" width="20" height="7" fill="#D4213D" />
    </svg>
  ),
  sk: (
    <svg
      viewBox="0 0 30 20"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <rect width="30" height="20" fill="#EE1C25" />
      <rect width="30" height="13.34" fill="#0B4EA2" />
      <rect width="30" height="6.67" fill="#ffffff" />
      {/* uproszczony herb (dwukrzyż na trójwzgórzu) */}
      <g transform="translate(3.5,3.6)">
        <path
          d="M0 0 H8 V6.5 Q8 9.4 4 11 Q0 9.4 0 6.5 Z"
          fill="#EE1C25"
          stroke="#ffffff"
          strokeWidth="0.7"
        />
        <rect x="3.55" y="1.5" width="0.9" height="7.2" fill="#ffffff" />
        <rect x="2.4" y="2.9" width="3.2" height="0.9" fill="#ffffff" />
        <rect x="1.9" y="4.8" width="4.2" height="0.9" fill="#ffffff" />
      </g>
    </svg>
  ),
  gb: (
    <svg
      viewBox="0 0 60 40"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#ffffff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <rect x="25" width="10" height="40" fill="#ffffff" />
      <rect y="15" width="60" height="10" fill="#ffffff" />
      <rect x="27" width="6" height="40" fill="#C8102E" />
      <rect y="17" width="60" height="6" fill="#C8102E" />
    </svg>
  ),
};

const MENUS = [
  {
    code: "pl",
    flag: "pl",
    label: "Polski",
    sub: "Menu po polsku",
    file: "/menu-pl.pdf",
  },
  {
    code: "sk",
    flag: "sk",
    label: "Slovenský",
    sub: "Menu v slovenčine",
    file: "/menu-sk.pdf",
  },
  {
    code: "en",
    flag: "gb",
    label: "English",
    sub: "Menu in English",
    file: "/menu-eng.pdf",
  },
];

function MenuLink({ flag, label, sub, href }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-[#B9875D]/30 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-[#B9875D] hover:bg-[#B9875D]/5 hover:shadow-md active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9875D]/50"
    >
      <span className="h-7 w-10 shrink-0 overflow-hidden rounded-[4px] ring-1 ring-black/10">
        {FLAG[flag]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-tight text-[#39524D]">
          {label}
        </span>
        <span className="block text-xs text-neutral-400">{sub}</span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-[#B9875D] transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function MenuLandingPage() {
  return (
    <>
      <Header text="Menu" />
      <div className="flex min-h-screen flex-col items-center px-6 py-16">
        <div className="mb-8 flex items-center gap-2 text-neutral-400">
          <Languages className="h-4 w-4" />
          <span className="text-sm">
            Wybierz język · Vyberte jazyk · Choose language
          </span>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-4">
          {MENUS.map((m) => (
            <MenuLink
              key={m.code}
              flag={m.flag}
              label={m.label}
              sub={m.sub}
              href={m.file}
            />
          ))}
        </div>
      </div>
    </>
  );
}
