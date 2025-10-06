"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

import { classNames } from "@/lib/utils/classNames";

interface StatsProps {
  title: string;
  value: number;
  className?: string;
  startFrom?: number;
}

export const Stats: React.FC<StatsProps> = ({
  title,
  value,
  startFrom = 0,
  className,
}) => {
  const count = useMotionValue(startFrom);
  const rounded = useTransform(() => Math.round(count.get()));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(count, value, { duration: 4 });
    return () => controls.stop();
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="flex flex-col flex-1 text-black">
      <h5 className="text-base font-bold">{title}</h5>
      <span className="flex gap-1 items-center">
        <motion.pre
          initial="hidden"
          whileInView="visible"
          className={classNames(
            "tabular-nums! text-6xl lg:text-8xl lg:min-w-[153px] font-serif",
            className
          )}
        >
          {rounded}
        </motion.pre>

        <span className="text-accent text-4xl lg:text-8xl">+</span>
      </span>
    </div>
  );
};
