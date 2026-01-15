"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FloatingImage({ src, alt, width, height }) {
  return (
    <motion.div
      animate={{
        y: [-15, 15, -15], // Płynny ruch góra-dół (większy zakres, ale wolniejszy)
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 6, // Bardzo wolno = luksusowo
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="w-full drop-shadow-2xl" // Mocny cień, żeby logo oderwało się od tła
    >
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    </motion.div>
  );
}
