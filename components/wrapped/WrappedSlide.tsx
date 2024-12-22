"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

interface WrappedSlideProps {
  slideData: {
    title: string;
    value: string | number;
    description: string;
  };
}

export default function WrappedSlide({ slideData }: WrappedSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className=" flex items-center justify-center"
    >
      <Card className="max-w-sm h-[80vh] my-4 p-8 bg-gradient-to-br from-purple-900 to-pink-400 text-white border-none">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="text-3xl font-bold mb-4"
        >
          {slideData.title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
          className="text-6xl font-bold mb-4"
        >
          {slideData.value}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6 } }}
          className="text-lg text-gray-200"
        >
          {slideData.description}
        </motion.p>
      </Card>
    </motion.div>
  );
}
