"use client";

import { motion } from "framer-motion";
import { Database } from "lucide-react";
import { NotionData } from "./WrappedCard";

export const DatabasesSlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center overflow-hidden">
      {/* Animated database icons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-600"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Database className="w-8 h-8" />
        </motion.div>
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
            Total Databases Created 🗄️
          </h2>
          <p className="text-4xl font-bold text-gray-300 mb-2">24</p>
          <p className="text-gray-400">organized collections</p>
        </motion.div>
      </div>
    </div>
  );
};
