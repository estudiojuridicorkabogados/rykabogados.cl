"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

interface StatsProps {
  title: string;
  value: number;
}

export const Stats: React.FC<StatsProps> = ({ title, value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, value, { duration: 4 });
    return () => controls.stop();
  }, []);

  return (
    <div className="flex flex-col flex-1 text-black">
      <h5 className="text-md font-bold">{title}</h5>
      <span className=" flex gap-1 items-center">
        <motion.pre className="text-8xl">{rounded}</motion.pre>
        <span className="text-accent text-8xl mb-3">+</span>
      </span>
    </div>
  );
};
