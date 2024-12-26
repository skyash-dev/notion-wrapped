"use client";

import { useAuth } from "./providers";
import { Landing } from "@/components/landing";
import { Loading } from "@/components/loading";
import { Wrapped } from "@/components/wrapped";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
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
        {isLoading ? <Loading /> : isAuthenticated ? <Wrapped /> : <Landing />}
      </div>
    </main>
  );
}
