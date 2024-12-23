"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Gradient Background
export const GradientBackground = () => (
  <motion.div
    className="absolute inset-0 opacity-30"
    animate={{
      background: [
        "radial-gradient(circle at 30% 30%, rgba(44,44,44,0.8), transparent 70%)",
        "radial-gradient(circle at 70% 70%, rgba(44,44,44,0.8), transparent 70%)",
      ],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

// Particles Animation
export const ParticlesEffect = () => {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number }[]
  >([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
      }));
    };
    setParticles(generateParticles());
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gray-400"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
};

// Morphing Shape
export const MorphingShape = () => (
  <motion.div
    className="absolute w-96 h-96 max-w-[50vw] max-h-[50vw] opacity-10"
    style={{
      background:
        "radial-gradient(circle, rgba(44,44,44,1) 0%, transparent 70%)",
      filter: "blur(40px)",
    }}
    animate={{
      borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

// Line Animation
export const AnimatedLines = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px w-full bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"
        style={{ top: `${30 + i * 20}%` }}
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);

// Text Reveal Animation
interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextReveal = ({ text, className = "" }: TextRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.03 }}
      >
        {char}
      </motion.span>
    ))}
  </motion.div>
);

// Glowing Border
export const GlowingBorder = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="relative rounded-lg p-px overflow-hidden"
    style={{
      background:
        "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
    }}
    animate={{
      backgroundPosition: ["0% 0%", "100% 100%"],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <div className="bg-[rgba(44,44,44,1)] rounded-lg relative z-10">
      {children}
    </div>
  </motion.div>
);
