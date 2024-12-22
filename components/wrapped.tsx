// @ts-ignore
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music2Icon, VolumeXIcon } from "lucide-react";
import WrappedExperience from "@/components/wrapped/WrappedExperience";
import { Loading } from "./loading";
import { ErrorCard } from "./error";
import { SlidesType } from "@/lib/landing-slide-data";

type NotionData = {
  streak: number;
  pagesCreated: number;
  universalRank: number;
  mostActiveMonth: string;
  // topPages,
  minutesOfNotes: number;
  // longestNote,
  mostActiveHour: string;
  personalityCard: string;
};

export function Wrapped() {
  const [isMuted, setIsMuted] = useState(false);

  const [notionData, setNotionData] = useState<NotionData>();
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("notion_token");

      if (!token) {
        setError("Notion token is missing.");
        return;
      }

      try {
        const res = await fetch(`/api/notion-data/callback?token=${token}`);

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setNotionData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    // let notionDataString: any = localStorage.getItem("notion_data");
    // let parsedNotionData = JSON.parse(notionDataString);

    // if (parsedNotionData) {
    //   setNotionData(parsedNotionData);
    // } else {
    //   fetchData();
    // }
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (notionData) {
  //     localStorage.setItem("notion_data", JSON.stringify(slides));
  //   }
  // }, [notionData]);

  if (error) return <ErrorCard />;
  if (!notionData) return <Loading />;

  localStorage.removeItem("notion_token");
  function getStreakDescription(streak: number): string {
    if (streak > 100)
      return `Legendary streak! You've been active for ${streak} days straight. 🔥`;
    if (streak > 30)
      return `Consistency is key! ${streak} days of non-stop Notion mastery. 💪`;
    return `You're off to a great start with a ${streak}-day streak! Keep it going! 🚀`;
  }

  function getPagesCreatedDescription(pagesCreated: number): string {
    if (pagesCreated > 500)
      return `Content powerhouse! You've created ${pagesCreated} pages this year. 📝`;
    if (pagesCreated > 100)
      return `Impressive! ${pagesCreated} pages were added to your Notion universe. 🌟`;
    return `You crafted ${pagesCreated} pages—each one a building block of creativity. ✨`;
  }

  function getUniversalRankDescription(universalRank: number): string {
    if (universalRank <= 1)
      return `You're in the top 1% of Notion users worldwide. You're a star! 🌟`;
    if (universalRank <= 10)
      return `Top ${universalRank}% globally! Your productivity is unmatched. 🌍`;
    return `Your universal rank is ${universalRank}%—keep climbing to the top! 🔝`;
  }

  function getMostActiveMonthDescription(month: string): string {
    return `${month} was your standout month. You were unstoppable that month! 📅`;
  }

  function getMinutesOfNotesDescription(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    if (hours > 50)
      return `You spent over ${hours} hours on notes! Incredible dedication. 🕒`;
    if (hours > 20)
      return `More than ${hours} hours of focus! Notion is your second home. 🏡`;
    return `${hours} hours of notes taken—your journey is just getting started! 🚀`;
  }

  function getMostActiveHourDescription(hour: string): string {
    return `Your peak productivity happens at ${hour}. It's your golden hour! 🌟`;
  }

  function getPersonalityDescription(personalityCard: string): string {
    switch (personalityCard) {
      case "Visionary":
        return "You're a dreamer who turns ideas into action. 🚀";
      case "Night Owl":
        return "You thrive in the quiet hours of the night. 🌙";
      case "Early Bird":
        return "The morning light fuels your creativity. ☀️";
      case "Task Master":
        return "Efficiency is your superpower—you get things done! 💼";
      case "Creative Thinker":
        return "Imagination is your playground. You bring ideas to life. 🎨";
      default:
        return "You're a unique blend of creativity, focus, and productivity. 🌈";
    }
  }

  // Slides data generation
  const slides: SlidesType = [
    {
      title: "Your Notion Streak",
      value: notionData.streak.toString(),
      description: getStreakDescription(notionData.streak),
    },
    {
      title: "Pages Created",
      value: notionData.pagesCreated.toString(),
      description: getPagesCreatedDescription(notionData.pagesCreated),
    },
    {
      title: "Universal Rank",
      value: notionData.universalRank.toString(),
      description: getUniversalRankDescription(notionData.universalRank),
    },
    {
      title: "Most Active Month",
      value: notionData.mostActiveMonth,
      description: getMostActiveMonthDescription(notionData.mostActiveMonth),
    },
    {
      title: "Time Spent Taking Notes",
      value: `${notionData.minutesOfNotes} min`,
      description: getMinutesOfNotesDescription(notionData.minutesOfNotes),
    },
    {
      title: "Peak Productivity Hour",
      value: notionData.mostActiveHour,
      description: getMostActiveHourDescription(notionData.mostActiveHour),
    },
    {
      title: "Your Notion Personality",
      value: notionData.personalityCard,
      description: getPersonalityDescription(notionData.personalityCard),
    },
  ];

  return (
    <div className="">
      {/* Main Wrapped Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center"
      >
        {/* <Card className="w-3/4 m-2 bg-black/40 backdrop-blur-xl border-gray-800 p-2"> */}
        <div className="h-screen flex items-center justify-center">
          <WrappedExperience slides={slides} />
        </div>
        {/* </Card> */}
      </motion.div>

      {/* Music Control */}
      <audio
        src="/background-music.mp3"
        ref={audioRef}
        autoPlay
        autoFocus
      ></audio>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-8"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setIsMuted(!isMuted);
            if (!isMuted) {
              audioRef.current?.pause();
            } else {
              audioRef.current?.play();
            }
          }}
          className="bg-black/40 backdrop-blur-xl border-gray-800"
        >
          {isMuted ? (
            <VolumeXIcon className="h-4 w-4" />
          ) : (
            <Music2Icon className="h-4 w-4" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}
