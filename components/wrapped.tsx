import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music2Icon, VolumeXIcon, PlayIcon } from "lucide-react";
import WrappedCard, { NotionData } from "./wrapped/WrappedCard";

import { YearSlide } from "@/components/wrapped/YearSlide";
import { ProfileSlide } from "@/components/wrapped/ProfileSlide";
import { StreakSlide } from "@/components/wrapped/StreakSlide";
import { NotesSlide } from "@/components/wrapped/NotesSlide";
import { ProductiveDaySlide } from "@/components/wrapped/ProductiveDaySlide";
import { DatabasesSlide } from "@/components/wrapped/DatabasesSlide";
import { TopTemplatesSlide } from "@/components/wrapped/TopTemplatesSlide";
import { StatsSlide } from "@/components/wrapped/StatsSlide";
import { PersonalitySlide } from "@/components/wrapped/PersonalitySlide";
import { ErrorCard } from "./error";
import { Loading } from "./loading";

const SLIDE_DURATION = 4000; // 4 seconds per slide

export function Wrapped() {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showWrappedCard, setShowWrappedCard] = useState(false);

  const [notionData, setNotionData] = useState<NotionData>();
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch Notion data on mount
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
    fetchData();
  }, []);

  // Slide progression logic
  useEffect(() => {
    if (hasInteracted && !showWrappedCard && timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            setShowWrappedCard(true);
            return prev;
          }
        });
      }, SLIDE_DURATION);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [hasInteracted, showWrappedCard]);

  // Handle audio play/pause
  useEffect(() => {
    if (isMuted) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  }, [isMuted]);

  if (error) return <ErrorCard />;
  if (!notionData) return <Loading />;

  localStorage.removeItem("notion_token");

  const slides = [
    { component: YearSlide, props: { notionData } },
    { component: ProfileSlide, props: { notionData } },
    { component: StreakSlide, props: { notionData } },
    { component: NotesSlide, props: { notionData } },
    { component: ProductiveDaySlide, props: { notionData } },
    { component: StatsSlide, props: { notionData } },
    { component: PersonalitySlide, props: { notionData } },
  ];

  const CurrentSlideComponent = slides[currentSlide].component;

  if (showWrappedCard) {
    return (
      <div className="flex justify-center items-center flex-col p-4">
        <WrappedCard notionData={notionData} isLanding={false} />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center p-2">
        <div className="h-[90vh] sm:h-[95vh] w-[100vw] md:w-[30vw] aspect-[9/16] relative">
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
            >
              <Button
                onClick={() => {
                  setHasInteracted(true);
                  setIsMuted(false);
                }}
                className="bg-[#1A1A1A] hover:bg-[rgba(31,31,31,1)] hover:text-white border-[1px] border-gray-400 hover:border-gray-200 text-gray-200 font-bold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                Click to Start!
              </Button>
            </motion.div>
          )}
          {/* Slide Container */}
          <motion.div
            className="h-full bg-[rgba(44,44,44,1)] rounded-2xl overflow-hidden"
            initial={{ padding: 0 }}
            animate={{ padding: "0.3rem" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="w-[98vw] sm:w-[94vw] md:w-full h-full bg-[#1A1A1A] rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <CurrentSlideComponent
                    notionData={slides[currentSlide].props.notionData}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Audio Control */}
      <audio src="/background-music.mp3" ref={audioRef} autoPlay />
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
    </>
  );
}

export default Wrapped;
