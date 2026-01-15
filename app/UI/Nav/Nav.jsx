"use client";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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

  // Logika widoczności nawigacji
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Pokaż, jeśli jesteśmy na samej górze (< 100px) LUB scrollujemy w górę
    if (latest < 100 || latest < previous) {
      setIsVisible(true);
    } else if (latest > 100 && latest > previous) {
      // Ukryj, jeśli scrollujemy w dół i nie jesteśmy na górze
      setIsVisible(false);
    }
  });

  const t = useTranslations("nav");

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

  // Blokada scrollowania body, gdy menu mobilne jest otwarte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Warianty animacji dla kontenera menu (Stagger Effect)
  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.08, // Opóźnienie między elementami
      },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  // Warianty dla pojedynczych elementów menu mobilnego
  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { y: 20, opacity: 0 },
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
      {/* Top Bar - Glassmorphism */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-6 xl:py-1 2xl:py-4 xl:px-8 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Lewa strona: Logo Muszynova i Logo UE */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="relative h-24 w-24 hover:opacity-90 transition-opacity"
          >
            <Image
              src="/Muszynova-mobile-logo.webp"
              fill
              alt={t("alt.2")}
              className="object-contain"
              sizes="(max-width: 768px) 100px, 150px"
              priority
            />
          </Link>
          <Link href={"/dofinansowanie"}>
            <div className="hidden xl:block relative h-12 w-24 hover:opacity-90 transition-opacity">
              <Image
                src="/unia.webp"
                fill
                alt={t("alt.1")}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Prawa strona: Nawigacja Desktop */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center font-light text-white xl:flex xl:gap-1 2xl:gap-4">
            <NavLink href="/o-nas">{t("links.link1")}</NavLink>
            <NavLink href="/blog">{t("links.link8")}</NavLink>

            {/* Park Dropdown Desktop */}
            <div
              className="group relative"
              onMouseEnter={openParkDropdown}
              onMouseLeave={closeParkDropdown}
            >
              <div className="flex items-center cursor-pointer">
                <NavLink href="/park">
                  <span className="flex items-center gap-1">
                    {t("links.park")}
                    <IoIosArrowDown
                      className={`transition-transform duration-300 text-xs ${
                        isParkDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </NavLink>
              </div>
              <AnimatePresence>
                {isParkDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute left-0 top-full mt-0 w-64 rounded-b-md bg-black/95 backdrop-blur-xl border border-white/10 text-white shadow-2xl overflow-hidden"
                  >
                    <div className="py-2">
                      {parkItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 text-sm hover:bg-white/10 hover:text-[#C4966C] transition-colors"
                          onClick={() => setIsParkDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
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

            <div className="ml-2 flex items-center gap-4">
              <LocaleSwitcher />
              <SalesButton
                text={t("button")}
                link="https://muszynova.oos.pl/customer/login"
              />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-5 xl:hidden">
            <LocaleSwitcher />
            <button
              className="hamburger z-50 relative"
              onClick={handleMenuToggle}
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isOpen}
            >
              {/* Upewnij się, że masz CSS dla klasy .hamburger, .hamburger-top itp. zdefiniowany globalnie lub użyj tu tailwinda bezpośrednio */}
              <span className={`hamburger-top ${isOpen ? "open" : ""}`} />
              <span className={`hamburger-middle ${isOpen ? "open" : ""}`} />
              <span className={`hamburger-bottom ${isOpen ? "open" : ""}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-white text-black overflow-y-auto"
          >
            <div className="pt-28 px-8 pb-10 flex flex-col text-lg font-medium min-h-screen">
              <motion.div variants={itemVariants}>
                <Link
                  href="/o-nas"
                  className="block border-b border-gray-100 py-4 hover:text-[#C4966C] transition-colors"
                  onClick={handleMenuToggle}
                >
                  {t("links.link1")}
                </Link>
              </motion.div>

              {/* Mobile Park Dropdown */}
              <motion.div
                variants={itemVariants}
                className="w-full border-b border-gray-100"
              >
                <button
                  onClick={handleParkDropdownToggle}
                  className="flex w-full justify-between items-center py-4 hover:text-[#C4966C] transition-colors"
                >
                  {t("links.park")}
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${
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
                      className="overflow-hidden bg-gray-50 rounded-lg mb-2"
                    >
                      {parkItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 text-base text-gray-600 hover:text-[#C4966C] border-b border-gray-100 last:border-0"
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
              </motion.div>

              {[
                { href: "/restauracja", label: t("links.link2") },
                { href: "/cennik", label: t("links.link3") },
                { href: "/zajecia-grupowe", label: t("links.link4") },
                { href: "/galeria", label: t("links.link5") },
                { href: "/blog", label: t("links.link8") },
                { href: "/partnerzy", label: t("links.link7") },
                { href: "/kontakt", label: t("links.link6") },
              ].map((link) => (
                <motion.div variants={itemVariants} key={link.href}>
                  <Link
                    className="block border-b border-gray-100 py-4 hover:text-[#C4966C] transition-colors"
                    href={link.href}
                    onClick={handleMenuToggle}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="mt-8">
                <SalesButton2 text={t("button")} link="/" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Ulepszony komponent NavLink z animowanym podkreśleniem
function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative px-3 py-4 flex items-center justify-center overflow-hidden"
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[#C4966C]">
        {children}
      </span>
      {/* Animowana linia */}
      <span className="absolute bottom-2 left-0 h-[1px] w-full origin-right scale-x-0 bg-[#C4966C] transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}
