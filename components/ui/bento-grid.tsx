import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{
        paddingLeft: "0rem",
        paddingRight: "0rem",
        paddingTop: "0rem",
        paddingBottom: "0rem",
      }}
      animate={{
        paddingLeft: "0.3rem",
        paddingRight: "0.3rem",
        paddingTop: "0.3rem",
        paddingBottom: "0.3rem",
      }}
      transition={{
        duration: 0.8, // Duration of animation
        ease: "easeInOut", // Animation easing
        repeat: Infinity, // Repeat animation infinitely
        repeatType: "reverse", // Reverse animation on each repeat
      }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-[rgba(44,44,44,1)] border border-transparent justify-between flex flex-col ",
        className
      )}
    >
      {header}
      {/* <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div> */}
    </motion.div>
  );
};
