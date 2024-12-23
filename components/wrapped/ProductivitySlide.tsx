"use client";

import { motion } from "framer-motion";
import { NotionData } from "./WrappedCard";

export const ProductivitySlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center overflow-hidden">
      {/* Animated dots background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gray-600 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="text-center z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-gray-700 via-gray-300 to-gray-700 mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Peak Performance 🚀
          </h2>
          <p className="text-4xl font-bold text-gray-300 mb-2">127 Notes</p>
          <p className="text-gray-400">in a single day</p>
        </motion.div>
      </div>
    </div>
  );
};
