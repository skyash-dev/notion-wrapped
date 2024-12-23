"use client";

import { motion } from "framer-motion";

export const FloatingDots = () => (
  <>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-gray-600 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </>
);

export const GradientOrbs = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(44,44,44,0.8) 0%, transparent 70%)`,
          width: "40vw",
          height: "40vw",
          left: `${20 + i * 30}%`,
          top: `${20 + i * 20}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 2,
        }}
      />
    ))}
  </>
);

export const GridPattern = () => (
  <motion.div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: `radial-gradient(circle at center, rgba(44,44,44,0.5) 1px, transparent 1px)`,
      backgroundSize: "30px 30px",
    }}
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
    }}
  />
);

export const WavyLine = () => (
  <motion.div
    className="absolute w-full h-px bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700"
    style={{
      top: "50%",
    }}
    animate={{
      y: [-50, 50, -50],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);
