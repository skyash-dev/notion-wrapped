"use client";

import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Avatar, AvatarImage } from "../ui/avatar";
import { toCanvas } from "html-to-image";

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
        // Ensure styles are captured by cloning the node
        const clonedCard = cardRef.current.cloneNode(true);
        const container = document.createElement("div");

        // Add styles for the gradient background and center alignment
        container.style.width = "720px"; // Adjust for portrait or landscape
        container.style.height = "1280px"; // Adjust for portrait or landscape
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.background =
          "linear-gradient(to right, #a78bfa, #f472b6)"; // Gradient background
        container.style.borderRadius = "16px"; // Optional rounded corners
        container.style.padding = "16px"; // Padding around the card
        container.appendChild(clonedCard);

        // Append to the DOM temporarily for rendering
        document.body.appendChild(container);

        // Render the container to a canvas
        const canvas = await toCanvas(container, { cacheBust: true });

        // Remove the container after rendering
        document.body.removeChild(container);

        // Convert the canvas to an image
        const dataUrl = canvas.toDataURL("image/png");

        // Create a link for download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "notion-wrapped.png";
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
        <div className="flex-1 flex-row md:flex-col gap-10 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-2 md:p-0">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-6xl origin-bottom"
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
          <div className="md:mx-4 w-2/3">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl py-2">
              {props.notionData.streak} Days
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              in a row, you&apos;re on fire!
            </p>
          </div>
        </div>
      ),
    },

    // Pages Created
    {
      header: (
        <div className="flex-1 flex-row md:flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-2 md:p-0">
          <motion.div
            className="text-2xl sm:text-3xl md:text-6xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            📄
          </motion.div>
          <div className="md:mx-4 w-2/3">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl py-2">
              {props.notionData.pagesCreated} Pages
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              created — a creator in action!
            </p>
          </div>
        </div>
      ),
    },

    // Universal Rank
    {
      header: (
        <div className="flex-1 flex-row md:flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-2 md:p-0">
          <motion.div
            className="text-2xl sm:text-3xl md:text-6xl"
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
          <div className="md:mx-4 w-2/3">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl py-2">
              {props.notionData.universalRank}
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              Rising through the ranks like a star!
            </p>
          </div>
        </div>
      ),
    },

    // Most Active Month
    {
      header: (
        <div className="flex-1 flex-row md:flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-2 md:p-0">
          <motion.div
            className="text-2xl sm:text-3xl md:text-6xl"
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
          <div className="md:mx-4 w-2/3">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl py-2">
              {props.notionData.mostActiveMonth}
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              was your most productive month!
            </p>
          </div>
        </div>
      ),
    },

    // Minutes of Notes
    {
      header: (
        <div className="flex-1 flex-row md:flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-2 md:p-0">
          <motion.div
            className="text-2xl sm:text-3xl md:text-6xl"
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
          <div className="md:mx-4 w-2/3">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl py-2">
              {props.notionData.minutesOfNotes} Minutes
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              spent taking notes of brilliance.
            </p>
          </div>
        </div>
      ),
    },

    // Most Active Hour
    {
      header: (
        <div className="flex-1 flex-row md:flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-2 md:p-0">
          <motion.div
            className="text-2xl sm:text-3xl md:text-6xl"
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
          <div className="md:mx-4 w-2/3">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl py-2">
              {props.notionData.mostActiveHour}
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              was your magic hour!
            </p>
          </div>
        </div>
      ),
    },

    // Personality Card
    {
      header: (
        <div className="flex-1 flex-row md:flex-col gap-6 rounded-xl bg-[rgba(32,32,32,1)] flex justify-center items-center p-2 md:p-0">
          <motion.div
            className="text-2xl sm:text-3xl md:text-6xl"
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
          <div className="md:mx-4 w-2/3">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl py-2">
              {props.notionData.personalityCard}
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              Harmony of creativity and logic!
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card
        ref={cardRef}
        className="w-[90vw] sm:w-[80vw] md:w-[70vw] p-6 bg-[#191919] text-sm text-gray-200 md:text-base"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-0 md:space-y-3"
        >
          {/* <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-8">
            Notion Wrapped 2024
          </h1> */}
          <div className="flex justify-center items-center gap-3 pb-6">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
              <AvatarImage
                src={props.notionData.userData.avatarUrl}
                className=""
              />
            </Avatar>
            <span>
              <p className="text-lg sm:text-xl font-bold">
                {props.notionData.userData.name}
              </p>
              <p className="text-sm text-gray-200 md:text-base">
                2024 Year in Notes
              </p>
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
        <div className="flex gap-2 justify-center mt-8">
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
