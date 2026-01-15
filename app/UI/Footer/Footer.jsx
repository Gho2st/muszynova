"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// Ikony
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCircle,
} from "react-icons/fa";
import { IoLogoGoogle, IoIosArrowUp } from "react-icons/io";

export default function Footer() {
  const [showArrow, setShowArrow] = useState(false);
  const [isParkOpen, setIsParkOpen] = useState(false);
  const [isGymOpen, setIsGymOpen] = useState(false);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);

  const t = useTranslations("footer");

  const checkStatuses = () => {
    const hour = new Date().getHours();

    setIsParkOpen(hour >= 11 && hour < 21);
    setIsGymOpen(hour >= 8 && hour < 21);
    setIsRestaurantOpen(hour >= 12 && hour < 21);
  };

  useEffect(() => {
    checkStatuses();

    const handleFocus = () => {
      checkStatuses();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SocialLink = ({ href, icon: Icon }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-customGold hover:border-customGold text-white transition-all duration-300"
    >
      <Icon className="w-4 h-4" />
    </Link>
  );

  return (
    <footer className="bg-customGreen text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* MARKA */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{t("header")}</h2>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              {t("text")}
            </p>

            <div className="flex gap-3 pt-2">
              <SocialLink
                href="https://www.facebook.com/Parkmuszynova"
                icon={FaFacebookF}
              />
              <SocialLink
                href="https://www.instagram.com/muszynova/"
                icon={FaInstagram}
              />
              <SocialLink
                href="https://www.tiktok.com/@park.muszynova"
                icon={FaTiktok}
              />
              <SocialLink href="https://g.co/kgs/YAoG1YE" icon={IoLogoGoogle} />
            </div>
          </div>

          {/* KONTAKT */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-customGold mb-6">
              {t("info.header")}
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-2 rounded-lg text-customGold">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase font-semibold mb-1">
                    {t("info.address")}
                  </span>
                  <span className="text-sm text-gray-200 leading-relaxed">
                    Muszyna ul. Złockie 77c, 33-370
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-customGold">
                  <FaPhoneAlt />
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase font-semibold mb-1">
                    {t("info.phone")}
                  </span>
                  <Link
                    href="tel:48509445000"
                    className="text-base font-medium hover:text-customGold transition-colors"
                  >
                    +48 509 445 000
                  </Link>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-customGold">
                  <FaEnvelope />
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase font-semibold mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:biuro@muszynova.pl"
                    className="text-base font-medium hover:text-customGold transition-colors"
                  >
                    biuro@muszynova.pl
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* GODZINY OTWARCIA - GLASSMORPHISM */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-customGold">
                {t("hours.header")}
              </h3>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                <span className="text-gray-300"> {t("hours.1")}</span>
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                  <FaCircle
                    className={`w-2.5 h-2.5 ${
                      isParkOpen ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span className="font-medium">11:00 – 21:00</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                <span className="text-gray-300"> {t("hours.2")}</span>
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                  <FaCircle
                    className={`w-2.5 h-2.5 ${
                      isGymOpen ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span className="font-medium">8:00 – 21:00</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <span className="text-gray-300"> {t("hours.3")}</span>
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                  <FaCircle
                    className={`w-2.5 h-2.5 ${
                      isRestaurantOpen ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span className="font-medium">12:00 – 21:00</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center sm:text-left">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-customGold hover:text-white transition-colors font-medium text-sm"
              >
                {t("hours.button")} →
              </Link>
            </div>
          </div>
        </div>

        {/* DOLNY PASEK */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/dofinansowanie"
            className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/unia.webp"
              height={40}
              width={40}
              className="rounded grayscale group-hover:grayscale-0 transition-all"
              alt="UE Logo"
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                {t("eu.header")}
              </span>
              <span className="text-xs font-bold text-gray-300">
                {t("eu.text")}
              </span>
            </div>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-gray-400">
            <span>© {new Date().getFullYear()} Muszynova</span>
            <div className="flex gap-6">
              <Link
                href="/polityka-prywatnosci"
                className="hover:text-white transition-colors"
              >
                {t("links.1")}
              </Link>
              <Link
                href="/kontakt"
                className="hover:text-white transition-colors"
              >
                {t("links.2")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-customGold text-white shadow-xl hover:bg-[#b0855e] transition-all duration-300 ${
          showArrow
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <IoIosArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
