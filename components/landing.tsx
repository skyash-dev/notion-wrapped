"use client";

import { motion } from "framer-motion";
import { ArrowDown, GithubIcon, Music2Icon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNotionAuth } from "@/hooks/use-notion-auth";
import WrappedCard from "./wrapped/WrappedCard";
import Link from "next/link";

let defaultNotionData = {
  streak: 69,
  pagesCreated: 24,
  universalRank: "Notion Ninja",
  mostActiveMonth: "July",
  minutesOfNotes: 1540,
  mostActiveHour: "11:00 PM",
  personalityCard: "Balanced Thinker",
  userData: {
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1667022736965906432/NEPFucvw_400x400.jpg",
    name: "skyash",
  },
  databaseCount: 0,
  mostProductiveDay: { productiveDay: "Tuesday", highestAverage: 12 },
  templates: [
    { name: "Daily Journal", usage: 127 },
    { name: "Project Tracker", usage: 89 },
    { name: "Meeting Notes", usage: 64 },
  ],
};

export function Landing() {
  const { handleAuth } = useNotionAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center space-y-16 pt-20"
    >
      <Card className="w-full max-w-lg p-8 bg-black/40 backdrop-blur-xl border-gray-800">
        <h1 className="text-4xl font-bold text-center text-gray-200">
          Notion Wrapped
        </h1>
        <p className="text-gray-400 text-center mt-4">
          Discover your notes journey in 2024
        </p>
        <Button
          size="lg"
          onClick={handleAuth}
          className="w-full mt-8 text-gray-800 bg-gray-200"
        >
          Connect with Notion
        </Button>
      </Card>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-gray-400"
      >
        {/* <span className="text-gray-200 font-bold">23,547</span> note takers
        discovered their journey */}
        See how far you&apos;ve come this year!
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center space-y-4 mt-12"
      >
        <p className="text-gray-400 text-sm">
          Built with 🤍 by{" "}
          <a
            href="https://twitter.com/_skyash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            skyash
          </a>
        </p>
        <div className="flex space-x-4">
          <a href="https://x.com/_skyash" target="_blank">
            <TwitterIcon className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
          </a>
          <a href="https://github.com/skyash-dev" target="_blank">
            <GithubIcon className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
          </a>
        </div>
      </motion.div>

      {/* Featured Wrapped */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col flex-wrap justify-center gap-4 mt-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-200 flex justify-center"
        >
          <div className="flex items-center gap-2 text-gray-300">
            2024 in Notes
            <ArrowDown className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
          </div>
        </motion.h2>
        <Card className="bg-black/20 backdrop-blur-xl transform transition-transform">
          <WrappedCard notionData={defaultNotionData} isLanding={true} />
        </Card>
      </motion.div>
      <div className="pb-16 text-gray-200 flex flex-col items-center gap-2 ">
        <a
          href="https://notionwrapped.features.vote/board"
          target="_blank"
          className="hover:underline hover:text-gray-100"
        >
          Request a feature ⚡️ or report a bug 🐛
        </a>
        <Link
          href="/privacy-policy"
          className="hover:underline hover:text-gray-100"
        >
          Privacy Policy 🔒
        </Link>
      </div>
    </motion.div>
  );
}
