"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SalesButton from "../Buttons/SalesButton";
import { IoIosArrowDown } from "react-icons/io";
import SalesButton2 from "../Buttons/SalesButton2";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isParkDropdownOpen, setIsParkDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Toggle handlers
  const handleMenuToggle = () => setIsOpen((prev) => !prev);
  const handleParkDropdownToggle = () => setIsParkDropdownOpen((prev) => !prev);

  // Dropdown hover handlers
  const openParkDropdown = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsParkDropdownOpen(true);
  };

  const closeParkDropdown = () => {
    const id = setTimeout(() => setIsParkDropdownOpen(false), 500);
    setTimeoutId(id);
  };

  // Body overflow control
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Animation variants
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

  // Park dropdown items
  const parkItems = [
    { href: "/park", label: "Park" },
    { href: "/park/silownia", label: "Siłownia" },
    { href: "/park/fitness", label: "Fitness" },
    { href: "/park/hala-sportowa", label: "Hala Sportowa" },
    { href: "/park/mini-kregielnia", label: "Mini Kręgielnia" },
    { href: "/park/scianka-wspinaczkowa", label: "Ścianka Wspinaczkowa" },
    { href: "/park/sala-zabaw", label: "Sala Zabaw" },
    { href: "/park/squash", label: "Squash" },
    { href: "/park/wypozyczalnia-rowerow", label: "Wypożyczalnia Rowerów" },
    { href: "/park/sala-gier", label: "Sala Gier" },
  ];

  return (
    <nav className="relative bg-black">
      {/* Top Bar with Logo and Hamburger */}
      <div className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 xl:py-4 xl:px-8 bg-black">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden items-center font-light text-white lg:flex lg:gap-6">
          <NavLink href="/o-nas">O Nas</NavLink>

          {/* Park Dropdown */}
          <div
            className="group relative"
            onMouseEnter={openParkDropdown}
            onMouseLeave={closeParkDropdown}
          >
            <div className="flex items-center">
              <NavLink href="/park">Park Rekreacyjno-Sportowy</NavLink>
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
                  className="absolute left-0 top-full mt-2 w-60 rounded-md bg-black text-white shadow-lg max-h-64 overflow-y-auto"
                  onMouseEnter={openParkDropdown}
                  onMouseLeave={closeParkDropdown}
                >
                  {parkItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink href="/restauracja">Restauracja</NavLink>
          <NavLink href="/cennik">Cennik</NavLink>
          <NavLink href="/zajecia-grupowe">Zajęcia Grupowe</NavLink>
          <NavLink href="/galeria">Galeria</NavLink>
          <NavLink href="/kontakt">Kontakt</NavLink>
          <SalesButton
            text="Strefa Klienta"
            link="https://muszynova.oos.pl/customer/login"
          />
        </div>

        {/* Hamburger Button */}
        <button
          className={`hamburger lg:hidden ${isOpen ? "open" : ""}`}
          onClick={handleMenuToggle}
          aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={isOpen}
        >
          <span className="hamburger-top" />
          <span className="hamburger-middle" />
          <span className="hamburger-bottom" />
        </button>
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
            <div className="pt-20 px-10 pb-6 flex flex-col  text-sm font-medium min-h-screen">
              <Link
                href="/o-nas"
                className="border-b border-gray-300 py-3"
                onClick={handleMenuToggle}
              >
                O Nas
              </Link>

              {/* Mobile Park Dropdown */}
              <div className="w-full">
                <button
                  onClick={handleParkDropdownToggle}
                  className="flex w-full hover:text-[#C4966C] border-b border-gray-300 py-3"
                  aria-label="Rozwiń menu Parku Rekreacyjno-Sportowego"
                >
                  Park Rekreacyjno-Sportowy
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
                      className="mt-3 pl-4   text-black"
                    >
                      {parkItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block border-b border-gray-300 py-3"
                          onClick={handleMenuToggle}
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
                Restauracja
              </Link>
              <Link
                className="border-b border-gray-300 py-3"
                href="/cennik"
                onClick={handleMenuToggle}
              >
                Cennik
              </Link>
              <Link
                className="border-b border-gray-300 py-3"
                href="/zajecia-grupowe"
                onClick={handleMenuToggle}
              >
                Zajęcia Grupowe
              </Link>
              <Link
                className="border-b border-gray-300 py-3"
                href="/galeria"
                onClick={handleMenuToggle}
              >
                Galeria
              </Link>
              <Link
                className="border-b border-gray-300 py-3 mb-6"
                href="/kontakt"
                onClick={handleMenuToggle}
              >
                Kontakt
              </Link>
              <SalesButton2 text="Strefa Klienta" link="/" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Reusable NavLink component
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
