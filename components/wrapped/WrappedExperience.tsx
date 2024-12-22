"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WrappedSlide from "./WrappedSlide";
import WrappedCard from "./WrappedCard";
import { SlidesType } from "@/lib/landing-slide-data";

interface props {
  slides: SlidesType;
}

export default function WrappedExperience({ slides }: props) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showFinalCard, setShowFinalCard] = useState(false);

  useEffect(() => {
    if (currentSlide < slides.length) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
      }, 3000); // Each slide shows for 3 seconds

      return () => clearTimeout(timer);
    } else if (!showFinalCard) {
      setShowFinalCard(true);
    }
  }, [currentSlide]);

  return (
    <AnimatePresence mode="wait">
      {!showFinalCard ? (
        <div className="flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text"
          >
            Your 2024 in Notes
          </motion.h2>
          <WrappedSlide
            key={currentSlide}
            slideData={slides[currentSlide - 1]}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center p-2"
        >
          <WrappedCard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
