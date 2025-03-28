"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname(); // Pobieramy aktualną ścieżkę URL

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Unikalny klucz zmienia się przy każdej zmianie trasy
        initial={{ opacity: 0 }} // Stan początkowy (wejście)
        animate={{ opacity: 1 }} // Stan docelowy (po zamontowaniu)
        // exit={{ opacity: 0 }} // Stan przy odmontowaniu (wyjście)
        transition={{ ease: "easeInOut", duration: 0.75 }} // Ustawienia animacji
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
