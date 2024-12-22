"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-[90vh]"
    >
      <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl border-gray-800">
        <div className="space-y-6">
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            Loading your notes...
          </h2>
          <p className="text-gray-400 text-center">
            Analyzing your Notion workspace
          </p>
          <Card className="px-8 py-4 bg-black/40 backdrop-blur-xl border-gray-800 text-gray-400 text-sm flex flex-col items-center gap-y-2">
            <span>🔒</span>
            <ul className="list-disc text-left flex flex-col gap-y-2">
              <li>
                We use your Notion data only during your session to create your
                Wrapped.
              </li>
              <li>No data is stored on our servers.</li>
              <li>
                OAuth tokens are securely managed and expire automatically.
              </li>
              <li>You can revoke access anytime via Notion.</li>
            </ul>
          </Card>
        </div>
      </Card>
    </motion.div>
  );
}
