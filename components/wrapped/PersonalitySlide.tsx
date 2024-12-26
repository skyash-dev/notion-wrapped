"use client";

import { motion } from "framer-motion";
import { Brain, Lightbulb, Scale } from "lucide-react";
import { GridPattern, GradientOrbs } from "../animations/BackgroundElement";
import { NotionData } from "./WrappedCard";

export const PersonalitySlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center p-8 overflow-hidden">
      <GridPattern />
      <GradientOrbs />

      <div className="max-w-2xl w-full z-10 text-center">
        <motion.div
          className="text-6xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🎴
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-gray-700 via-gray-300 to-gray-700 mb-12 mt-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-center gap-4 mb-8">
            {[Brain, Lightbulb, Scale].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="text-gray-200 relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gray-500/20 blur-xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <Icon className="w-8 h-8 relative z-10" />
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-200 mb-4">
            Your Notion Personality
          </h2>
          <p className="text-4xl font-bold text-gray-200 mb-4">
            {props.notionData.personalityCard}
          </p>
          <p className="text-xl text-gray-400">
            🎴 The perfect mix of order and inspiration
          </p>
        </motion.div>
      </div>
    </div>
  );
};
