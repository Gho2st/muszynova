"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FloatingImage({ src, alt, width, height }) {
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
      },
      boxShadow: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div animate={floatAnimation} className="w-full">
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={width}
        height={height}
        priority // <- DODAJ!
      />
    </motion.div>
  );
}
