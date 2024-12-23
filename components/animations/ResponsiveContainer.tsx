"use client";

import { motion } from "framer-motion";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveContainer = ({
  children,
  className = "",
}: ResponsiveContainerProps) => (
  <motion.div
    className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center 
    px-4 sm:px-6 md:px-8 py-12 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 md:gap-8">{children}</div>
    </div>
  </motion.div>
);
