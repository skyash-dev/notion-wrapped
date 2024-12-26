"use client";

import { motion } from "framer-motion";
import { NotionData } from "./WrappedCard";

export const TopTemplatesSlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center overflow-hidden">
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
          <h2 className="text-3xl font-bold text-gray-200 mb-8">
            Most Used Templates 📑
          </h2>

          <div className="flex flex-col gap-4">
            {props.notionData.templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5 + index * 0.2 }}
                className="bg-[rgba(44,44,44,1)] p-4 rounded-lg"
              >
                <h3 className="text-xl font-bold text-gray-200">
                  {template.name}
                </h3>
                <p className="text-gray-400">{template.usage}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
