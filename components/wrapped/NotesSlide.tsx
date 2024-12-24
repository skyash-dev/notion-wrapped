"use client";

import { motion } from "framer-motion";
import { NotionData } from "./WrappedCard";

export const NotesSlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(44,44,44,0.4) 0%, transparent 50%)",
        }}
      />

      <div className="text-center z-10">
        <motion.div
          className="text-6xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          📄
        </motion.div>
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Total Notes Created 📝
          </h2>
          <p className="text-4xl font-bold text-gray-300 mb-2">
            {props.notionData.pagesCreated}
          </p>
          <p className="text-gray-400">thoughts captured</p>
        </motion.div>
      </div>
    </div>
  );
};
