"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SalesButton from "../Buttons/SalesButton";
import { IoIosArrowDown } from "react-icons/io";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isParkDropdownOpen, setIsParkDropdownOpen] = useState(false);
  const [isOfferDropdownOpen, setIsOfferDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // Dodajemy stan do śledzenia timeoutu

  const handleMenuToggle = () => setIsOpen(!isOpen);

  const handleParkDropdownToggle = () =>
    setIsParkDropdownOpen(!isParkDropdownOpen);

  const handleOfferDropdownToggle = () =>
    setIsOfferDropdownOpen(!isOfferDropdownOpen);

  // Funkcje do obsługi hover
  const openParkDropdown = () => {
    if (timeoutId) clearTimeout(timeoutId); // Czyścimy timeout, jeśli istnieje
    setIsParkDropdownOpen(true);
  };

  const closeParkDropdown = () => {
    const id = setTimeout(() => setIsParkDropdownOpen(false), 500); // Zwiększamy opóźnienie do 500ms
    setTimeoutId(id);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      y: -20,
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

  return (
    <nav className="relative mx-auto bg-black">
      <div className="flex px-6 xl:px-24 2xl:px-24 xl:pb-2 items-center justify-between">
        <Link href="/">
          <div className="w-2/3 xl:w-2/6">
            <Image
              src="/Muszynova-mobile-logo.webp"
              width={50}
              height={50}
              layout="responsive"
              alt="Logo Muszynova"
              className="block"
            />
          </div>
        </Link>
        <div className="hidden space-x-8 text-white text-md font-light lg:flex items-center">
          <Link
            className="hover:text-[#C4966C] transition-colors duration-300 ease-in-out"
            href="/o-nas"
          >
            O Nas
          </Link>

          {/* Dropdown dla Parku Rekreacyjno-Sportowego */}
          <div
            className="relative group"
            onMouseEnter={openParkDropdown}
            onMouseLeave={closeParkDropdown}
          >
            <div className="flex items-center">
              <Link
                href="/park-rekreacyjno-sportowy"
                className="hover:text-[#C4966C] transition-colors duration-300 ease-in-out whitespace-nowrap"
              >
                Park Rekreacyjno-Sportowy
              </Link>
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
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={dropdownVariants}
                  className="absolute left-0 mt-2 w-60 bg-black text-white rounded-md shadow-lg z-40 top-full"
                  onMouseEnter={openParkDropdown} // Utrzymuje dropdown otwarty, gdy kursor jest nad nim
                  onMouseLeave={closeParkDropdown} // Zamyka z opóźnieniem po opuszczeniu
                >
                  <Link
                    href="/park-rekreacyjno-sportowy/silownia"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Siłownia
                  </Link>
                  <Link
                    href="/park-rekreacyjno-sportowy/fitness"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Fitness
                  </Link>
                  <Link
                    href="/park-rekreacyjno-sportowy/hala-sportowa"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Hala Sportowa
                  </Link>
                  <Link
                    href="/park-rekreacyjno-sportowy/mini-kregielnia"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Mini Kręgielnia
                  </Link>
                  <Link
                    href="/park-rekreacyjno-sportowy/scianka-wspinaczkowa"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Ścianka Wspinaczkowa
                  </Link>
                  <Link
                    href="/park-rekreacyjno-sportowy/sala-zabaw"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Sala Zabaw
                  </Link>
                  <Link
                    href="/park-rekreacyjno-sportowy/squash"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Squash
                  </Link>
                  <Link
                    href="/park-rekreacyjno-sportowy/wypozyczalnia-rowerow"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Wypożyczalnia Rowerów
                  </Link>

                  <Link
                    href="/park-rekreacyjno-sportowy/sala-gier"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Sala Gier
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            className="hover:text-[#C4966C] transition-colors duration-300 ease-in-out"
            href="/restauracja"
          >
            Restauracja
          </Link>
          <Link
            className="hover:text-[#C4966C] transition-colors duration-300 ease-in-out"
            href="/cennik"
          >
            Cennik
          </Link>
          <Link
            className="hover:text-[#C4966C] transition-colors duration-300 ease-in-out"
            href="/zajecia-grupowe"
          >
            Zajęcia Grupowe
          </Link>
          <Link
            className="hover:text-[#C4966C] transition-colors duration-300 ease-in-out"
            href="/galeria"
          >
            Galeria
          </Link>
          <Link
            className="hover:text-[#C4966C] transition-colors duration-300 ease-in-out"
            href="/kontakt"
          >
            Kontakt
          </Link>
          <SalesButton
            text="Strefa Klienta"
            link="https://muszynova.oos.pl/customer/login"
          />
        </div>
        <button
          id="menu-btn"
          className={`block hamburger lg:hidden focus:outline-none ${
            isOpen ? "open" : ""
          }`}
          type="button"
          aria-label={
            isOpen ? "Zamknij menu nawigacyjne" : "Otwórz menu nawigacyjne"
          }
          aria-expanded={isOpen}
          onClick={handleMenuToggle}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            id="menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute p-6 pt-4 bg-black w-full h-screen text-white top-20 z-30"
          >
            <div className="flex flex-col items-center justify-center w-full text-lg space-y-6 font-semibold">
              <Link href="/o-nas">O Nas</Link>
              <div className="w-full text-center">
                <button
                  onClick={handleParkDropdownToggle}
                  className="flex items-center justify-center w-full hover:text-[#C4966C]"
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
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={dropdownVariants}
                      className="w-full mt-2 space-y-4 text-white"
                    >
                      <Link
                        href="/park-rekreacyjno-sportowy/atrakcje"
                        className="block"
                      >
                        Park
                      </Link>
                      <Link
                        href="/park-rekreacyjno-sportowy/godziny"
                        className="block"
                      >
                        Godziny Otwarcia
                      </Link>
                      <Link
                        href="/park-rekreacyjno-sportowy/regulamin"
                        className="block"
                      >
                        Regulamin
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/restauracja">Restauracja</Link>
              <Link href="/cennik">Cennik</Link>
              <div className="h-[0.1rem] w-full bg-gray-300"></div>
              <SalesButton text="Strefa Klienta" link="/" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
