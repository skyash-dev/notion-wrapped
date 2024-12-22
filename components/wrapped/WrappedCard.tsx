"use client";

import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { toPng } from "html-to-image";

export default function WrappedCard() {
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

  return (
    <>
      <Card
        ref={cardRef}
        className="w-[80vw] md:w-[70vw] p-8 bg-gradient-to-br from-purple-900  to-pink-400 text-white border-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-2xl font-bold text-center mb-8">
            Notion Wrapped 2024
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold">Streak</h3>
              <p className="text-2xl font-bold">42 days</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold">Pages Created</h3>
              <p className="text-2xl font-bold">156</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold">Universal Rank</h3>
              <p className="text-2xl font-bold">Top 5%</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold">Most Active Month</h3>
              <p className="text-2xl font-bold">March</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold">Minutes of Notes</h3>
              <p className="text-2xl font-bold">2,450</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold">Most Active Hour</h3>
              <p className="text-2xl font-bold">10 AM</p>
            </div>
          </div>

          <div className="p-4 bg-black/20 rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-2">Personality</h3>
            <p className="text-2xl font-bold">The Night Owl Creator</p>
          </div>
        </motion.div>
      </Card>
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
    </>
  );
}
