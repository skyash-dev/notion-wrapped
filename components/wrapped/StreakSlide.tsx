"use client";

import { motion } from "framer-motion";
import { NotionData } from "./WrappedCard";

export const StreakSlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(44,44,44,0.3) 0%, transparent 10%)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="text-center z-10 ">
        <motion.h2
          className="text-6xl origin-bottom"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-5, 5, -5],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🔥
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-gray-700 via-gray-300 to-gray-700 mb-8 mt-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <h2 className="text-3xl font-bold text-gray-200 mb-4">
            Longest Streak ⚡️
          </h2>
          <p className="text-4xl font-bold text-gray-200 mb-2">
            {props.notionData.streak} Days
          </p>
          <p className="text-gray-400">of consistent note-taking</p>
        </motion.div>
      </div>
    </div>
  );
};
