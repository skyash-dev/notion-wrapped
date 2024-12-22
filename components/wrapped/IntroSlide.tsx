'use client';

import { motion } from 'framer-motion';

export default function IntroSlide() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1A1A1A]">
      {/* Animated waves background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ backgroundPosition: '0% 0%' }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            style={{
              backgroundImage: `radial-gradient(circle at ${50 + i * 20}% ${50 + i * 20}%, rgba(255, 0, 128, 0.1) 0%, transparent 60%)`,
              transform: `scale(${1 + i * 0.2})`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            2024
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-2xl text-gray-400"
          >
            Your Notion Year in Review
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}