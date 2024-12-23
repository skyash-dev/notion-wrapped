"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotionData } from "./WrappedCard";

export const ProfileSlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center">
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(44,44,44,1) 0%, rgba(25,25,25,1) 100%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="flex flex-col items-center gap-6 z-10">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full blur-lg transform scale-110" />
          <Avatar className="h-32 w-32 border-4 border-gray-700">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">John Doe</h2>
          <p className="text-xl text-gray-300">Your Year in Notion</p>
        </motion.div>
      </div>
    </div>
  );
};
