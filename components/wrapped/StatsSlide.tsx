"use client";

import { motion } from "framer-motion";
import { Star, Clock, Calendar } from "lucide-react";
import { FloatingDots, GradientOrbs } from "../animations/BackgroundElement";
import { NotionData } from "./WrappedCard";

interface StatItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  delay: number;
}

const StatItem = ({ icon, title, value, subtitle, delay }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-[rgba(44,44,44,1)] p-6 rounded-lg text-left relative overflow-hidden group"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/5 to-transparent"
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
    <div className="flex items-center gap-4 mb-3">
      <motion.div
        className="text-gray-300"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-medium text-gray-300">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-gray-400 text-sm">{subtitle}</p>
  </motion.div>
);

export const StatsSlide = (props: { notionData: NotionData }) => {
  return (
    <div className="relative h-screen w-full bg-[#191919] flex items-center justify-center p-8 overflow-hidden">
      <FloatingDots />
      <GradientOrbs />

      <div className="max-w-2xl w-full z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-gray-700 via-gray-300 to-gray-700 mb-8"
        />

        <div className="grid gap-4">
          <StatItem
            icon={<Star className="w-6 h-6" />}
            title="Universal Rank"
            value={props.notionData.universalRank}
            subtitle="🚀 Every pro starts somewhere!"
            delay={0.2}
          />
          <StatItem
            icon={<Clock className="w-6 h-6" />}
            title="Most Active Hour"
            value={props.notionData.mostActiveHour}
            subtitle="⏰ Late-night genius strikes again"
            delay={0.4}
          />
          <StatItem
            icon={<Calendar className="w-6 h-6" />}
            title="Most Active Month"
            value={props.notionData.mostActiveMonth}
            subtitle="🌟 Your productivity peak"
            delay={0.6}
          />
        </div>
      </div>
    </div>
  );
};
