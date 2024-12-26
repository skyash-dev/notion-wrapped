"use client";

import { motion } from "framer-motion";

export const YearSlide = () => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center overflow-hidden">
      {/* Background wave animation */}
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700"
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: "rotate(30deg) scale(5)",
        }}
      />

      {/* Year text animations */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-8xl font-bold text-gray-200 opacity-80"
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: `translateX(${index * 20}px)`,
            zIndex: 6 - index,
          }}
        >
          2024
        </motion.div>
      ))}
    </div>
  );
};
