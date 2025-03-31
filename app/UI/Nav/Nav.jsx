"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import SalesButton from "../Buttons/SalesButton";
import { IoIosArrowDown } from "react-icons/io";
import SalesButton2 from "../Buttons/SalesButton2";
import LocaleSwitcher from "../LocaleSwitcher";
import { useTranslations } from "next-intl";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isParkDropdownOpen, setIsParkDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 95;
  const hideDelay = 10;
  const t = useTranslations("nav");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < scrollThreshold) {
        setIsVisible(true);
      } else if (scrollY > lastScrollY + hideDelay) {
        setIsVisible(false);
      } else if (scrollY < lastScrollY - hideDelay) {
        setIsVisible(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleMenuToggle = () => setIsOpen((prev) => !prev);
  const handleParkDropdownToggle = () => setIsParkDropdownOpen((prev) => !prev);

  const openParkDropdown = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsParkDropdownOpen(true);
  };

  const closeParkDropdown = () => {
    const id = setTimeout(() => setIsParkDropdownOpen(false), 500);
    setTimeoutId(id);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.25, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  const parkItems = [
    { href: "/park", label: t("parkItems.park") },
    { href: "/park/silownia", label: t("parkItems.gym") },
    { href: "/park/fitness", label: t("parkItems.fitness") },
    { href: "/park/hala-sportowa", label: t("parkItems.sportshall") },
    { href: "/park/mini-kregielnia", label: t("parkItems.minibowling") },
    { href: "/park/scianka-wspinaczkowa", label: t("parkItems.climbingwall") },
    { href: "/park/sala-zabaw", label: t("parkItems.playroom") },
    { href: "/park/squash", label: t("parkItems.squash") },
    { href: "/park/wypozyczalnia-rowerow", label: t("parkItems.bikerental") },
    { href: "/park/sala-gier", label: t("parkItems.gamesroom") },
    { href: "/park/sala-multimedialna", label: t("parkItems.multimediaroom") },
  ];

  return (
    <nav className="relative">
      {/* Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 xl:py-1 2xl:py-4 xl:px-8 bg-black transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Lewa strona: Logo Muszynova i Logo UE */}
        <div className="flex items-center">
          <Link href="/" className="relative h-24 w-24">
            <Image
              src="/Muszynova-mobile-logo.webp"
              fill
              alt="Logo Muszynova"
              className="object-contain"
              sizes="(max-width: 768px) 100px, 150px"
              priority
            />
          </Link>
          <div className="hidden xl:block relative h-12 w-24">
            <Image
              src="/unia.webp"
              fill
              alt="Logo Unii Europejskiej"
              className="object-contain"
            />
          </div>
        </div>

        {/* Prawa strona: Nawigacja, LocaleSwitcher, SalesButton, Hamburger */}
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden items-center font-light text-white xl:flex xl:gap-6">
            <NavLink href="/o-nas">{t("links.link1")}</NavLink>

            {/* Park Dropdown */}
            <div
              className="group relative"
              onMouseEnter={openParkDropdown}
              onMouseLeave={closeParkDropdown}
            >
              <div className="flex items-center">
                <NavLink href="/park">{t("links.park")}</NavLink>
                <button
                  onClick={handleParkDropdownToggle}
                  className="ml-1 focus:outline-none"
                  aria-label="Rozwiń menu Parku Rekreacyjno-Sportowego"
                >
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${
                      isParkDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <AnimatePresence>
                {isParkDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute left-0 top-full mt-2 w-60 rounded-md bg-black text-white shadow-lg"
                    onMouseEnter={openParkDropdown}
                    onMouseLeave={closeParkDropdown}
                  >
                    {parkItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-gray-800"
                        onClick={() => setIsParkDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/restauracja">{t("links.link2")}</NavLink>
            <NavLink href="/cennik">{t("links.link3")}</NavLink>
            <NavLink href="/zajecia-grupowe">{t("links.link4")}</NavLink>
            <NavLink href="/galeria">{t("links.link5")}</NavLink>
            <NavLink href="/partnerzy">{t("links.link7")}</NavLink>
            <NavLink href="/kontakt">{t("links.link6")}</NavLink>
            <LocaleSwitcher />
            <SalesButton
              text={t("button")}
              link="https://muszynova.oos.pl/customer/login"
            />
          </div>

          {/* Hamburger Button (Mobile) */}
          <div
            className={`flex items-center gap-5 xl:hidden ${
              isOpen ? "open" : ""
            }`}
          >
            <LocaleSwitcher />
            <button
              className="hamburger"
              onClick={handleMenuToggle}
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isOpen}
            >
              <span className="hamburger-top" />
              <span className="hamburger-middle" />
              <span className="hamburger-bottom" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-white text-black overflow-y-auto mt-16"
          >
            <div className="pt-20 px-10 pb-6 flex flex-col text-sm font-medium min-h-screen">
              <Link
                href="/o-nas"
                className="border-b border-gray-300 py-3"
                onClick={handleMenuToggle}
              >
                {t("links.link1")}
              </Link>

              {/* Mobile Park Dropdown */}
              <div className="w-full">
                <button
                  onClick={handleParkDropdownToggle}
                  className="flex w-full hover:text-[#C4966C] border-b border-gray-300 py-3"
                  aria-label="Rozwiń menu Parku Rekreacyjno-Sportowego"
                >
                  {t("links.park")}
                  <IoIosArrowDown
                    className={`ml-2 transition-transform duration-300 ${
                      isParkDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isParkDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="mt-3 pl-4 text-black"
                    >
                      {parkItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block border-b border-gray-300 py-3"
                          onClick={() => {
                            handleMenuToggle();
                            setIsParkDropdownOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                className="border-b border-gray-300 py-3"
                href="/restauracja"
                onClick={handleMenuToggle}
              >
                {t("links.link2")}
              </Link>
              <Link
                className="border-b border-gray-300 py-3"
                href="/cennik"
                onClick={handleMenuToggle}
              >
                {t("links.link3")}
              </Link>
              <Link
                className="border-b border-gray-300 py-3"
                href="/zajecia-grupowe"
                onClick={handleMenuToggle}
              >
                {t("links.link4")}
              </Link>
              <Link
                className="border-b border-gray-300 py-3"
                href="/galeria"
                onClick={handleMenuToggle}
              >
                {t("links.link5")}
              </Link>
              <Link
                className="border-b border-gray-300 py-3"
                href="/partnerzy"
                onClick={handleMenuToggle}
              >
                {t("links.link7")}
              </Link>
              <Link
                className="border-b border-gray-300 py-3 mb-6"
                href="/kontakt"
                onClick={handleMenuToggle}
              >
                {t("links.link6")}
              </Link>
              <SalesButton2 text={t("button")} link="/" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="whitespace-nowrap transition-colors duration-300 hover:text-[#C4966C]"
    >
      {children}
    </Link>
  );
}
