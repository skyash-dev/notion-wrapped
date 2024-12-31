"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";

export function ErrorCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-screen"
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
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Error
          </h2>
          <p className="text-gray-400 text-center flex flex-col">
            <span>Error: Notion token is missing.</span>
            <a
              href={`https://www.notion.so/install-integration?response_type=code&client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&redirect_uri=https%3A%2F%2Fwww.notionwrapped.tech%2Fapi%2Fauth%2Fcallback&owner=user`}
            >
              <Button size="lg" className=" mt-8 text-gray-800 bg-gray-200">
                Retry
              </Button>
            </a>
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
