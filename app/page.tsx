"use client";

import { useAuth } from "./providers";
import { Landing } from "@/components/landing";
import { Loading } from "@/components/loading";
import { Wrapped } from "@/components/wrapped";
import Head from "next/head";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Discover your year in Notion with personalized highlights, streaks, and insights."
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Notion Wrapped 2024" />
        <meta
          property="og:description"
          content="See your year in Notion with insights, streaks, and personality."
        />
        <meta
          property="og:image"
          content="https://www.notionwrapped.tech/og-image.png"
        />
        <meta property="og:url" content="https://www.notionwrapped.tech/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Notion Wrapped 2024" />
        <meta
          name="twitter:description"
          content="Explore your Notion productivity journey in 2024."
        />
        <meta
          name="twitter:image"
          content="https://notionwrapped.tech/og-image.png"
        />
      </Head>
      <main className="min-h-screen bg-[#191919] text-gray-200 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          {isLoading ? (
            <Loading />
          ) : isAuthenticated ? (
            <Wrapped />
          ) : (
            <Landing />
          )}
        </div>
      </main>
    </>
  );
}
