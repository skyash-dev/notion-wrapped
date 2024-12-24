"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { NotionData } from "./WrappedCard";

export const ProductiveDaySlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(44,44,44,0.4) 0%, transparent 50%)",
        }}
      />

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
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Calendar className="w-12 h-12 text-gray-300" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Most Productive Day 📅
          </h2>
          <p className="text-4xl font-bold text-gray-300 mb-2">
            {props.notionData.mostProductiveDay.productiveDay}
          </p>
          <p className="text-gray-400">
            averaging {props.notionData.mostProductiveDay.highestAverage} notes
            per Tuesday
          </p>
        </motion.div>
      </div>
    </div>
  );
};
