"use client";

import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { toPng } from "html-to-image";

import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Avatar, AvatarImage } from "../ui/avatar";

export type NotionData = {
  streak: number;
  pagesCreated: number;
  universalRank: string;
  mostActiveMonth: string;
  minutesOfNotes: number;
  mostActiveHour: string;
  personalityCard: string;
  databaseCount: number;
  mostProductiveDay: { productiveDay: string; highestAverage: number };
  userData: { name: string; avatarUrl: string };
  templates: Array<{ name: string; usage: number }>;
};

export default function WrappedCard(props: {
  notionData: NotionData;
  isLanding: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        // Generate the image
        const dataUrl = await toPng(cardRef.current, { cacheBust: true });
        // Create a link element
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "notion-wrapped.png";
        // Trigger the download
        link.click();
      } catch (error) {
        console.error("Failed to generate image:", error);
      }
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "My Notion Wrapped 2024",
        text: "Check out my Notion Wrapped!",
        url: window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const items = [
    // Streak
    {
      header: (
        <div className="flex-1 flex-col gap-10 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-10 md:p-0">
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
          <div className="mx-4">
            <h3 className="font-bold text-2xl py-2">
              {props.notionData.streak} Days
            </h3>
            <p className="text-gray-200">in a row, you&apos;re on fire!</p>
          </div>
        </div>
      ),
    },

    // Pages Created
    {
      header: (
        <div className="flex-1 flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-10 md:p-0">
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
          <div className="mx-4">
            <h3 className="font-bold text-2xl py-2">
              {props.notionData.pagesCreated} Pages
            </h3>
            <p className="text-gray-200">created — a creator in action!</p>
          </div>
        </div>
      ),
    },

    // Universal Rank
    {
      header: (
        <div className="flex-1 flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-10 md:p-0">
          <motion.div
            className="text-6xl"
            animate={{
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🏆
          </motion.div>
          <div className="mx-4">
            <h3 className="font-bold text-2xl py-2">
              {props.notionData.universalRank}
            </h3>
            <p className="text-gray-200">
              Rising through the ranks like a star!
            </p>
          </div>
        </div>
      ),
    },

    // Most Active Month
    {
      header: (
        <div className="flex-1 flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-10 md:p-0">
          <motion.div
            className="text-6xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            📅
          </motion.div>
          <div className="mx-4">
            <h3 className="font-bold text-2xl py-2">
              {props.notionData.mostActiveMonth}
            </h3>
            <p className="text-gray-200">was your most productive month!</p>
          </div>
        </div>
      ),
    },

    // Minutes of Notes
    {
      header: (
        <div className="flex-1 flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-10 md:p-0">
          <motion.div
            className="text-6xl"
            animate={{
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🗒️
          </motion.div>
          <div className="mx-4">
            <h3 className="font-bold text-2xl py-2">
              {props.notionData.minutesOfNotes} Minutes
            </h3>
            <p className="text-gray-200">spent taking notes of brilliance.</p>
          </div>
        </div>
      ),
    },

    // Most Active Hour
    {
      header: (
        <div className="flex-1 flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-10 md:p-0">
          <motion.div
            className="text-6xl"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⏰
          </motion.div>
          <div className="mx-4">
            <h3 className="font-bold text-2xl py-2">
              {props.notionData.mostActiveHour}
            </h3>
            <p className="text-gray-200">was your magic hour!</p>
          </div>
        </div>
      ),
    },

    // Personality Card
    {
      header: (
        <div className="flex-1 flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-10 md:p-0">
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
          <div className="mx-4">
            <h3 className="font-bold text-2xl py-2">
              {props.notionData.personalityCard}
            </h3>
            <p className="text-gray-200">Harmony of creativity and logic!</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card
        ref={cardRef}
        className="w-[90vw] sm:w-[80vw] md:w-[70vw] p-6 bg-[#191919] text-gray-200  border-gray-800"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {/* <h1 className="text-2xl font-bold text-center mb-8">
            Notion Wrapped 2024
          </h1> */}
          <div className="flex justify-center items-center gap-3 py-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={props.notionData.userData.avatarUrl}
                className=""
              />
            </Avatar>
            <span>
              <p className="text-xl font-bold">
                {props.notionData.userData.name}
              </p>
              <p className="text-sm text-gray-200">2024 Year in Notes</p>
            </span>
          </div>

          <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                header={item.header}
                className={`${i === 3 || i === 6 ? "md:col-span-2" : ""}`}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </Card>
      {!props.isLanding ? (
        <div className="flex gap-4 justify-center mt-8">
          <Button
            onClick={handleShare}
            className="bg-white text-black hover:bg-gray-100"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="border-white text-black hover:bg-white/10"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      ) : null}
    </>
  );
}
