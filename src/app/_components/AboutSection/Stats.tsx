"use client";

import { useEffect, useRef, useState } from "react";

import { classNames } from "@/lib/utils/classNames";

interface StatsProps {
  title: string;
  value: number;
  className?: string;
  startFrom?: number;
}

const DURATION_MS = 4000;

/**
 * Count-up on scroll. Previously used motion's useMotionValue/useTransform/
 * animate; a requestAnimationFrame loop does the same job without pulling the
 * animation library into the bundle. See docs/lcp-performance-plan.md.
 */
export const Stats: React.FC<StatsProps> = ({
  title,
  value,
  startFrom = 0,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(startFrom);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      // Reduced motion simply lands on the final value on the first frame;
      // keeping it on the same rAF path avoids a synchronous setState here.
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? 0
        : DURATION_MS;

      const start = performance.now();
      let frame = 0;

      const tick = (now: number) => {
        const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        // easeOut, to match the previous animation's feel
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(startFrom + (value - startFrom) * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    if (typeof IntersectionObserver === "undefined") {
      return run();
    }

    let stop: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            stop = run();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stop?.();
    };
  }, [value, startFrom]);

  return (
    <div ref={ref} className="flex flex-1 flex-col text-black">
      <h5 className="text-base font-bold">{title}</h5>
      <span className="flex items-center gap-1">
        <pre
          className={classNames(
            "tabular-nums! text-6xl lg:text-8xl lg:min-w-[153px] font-serif",
            className
          )}
        >
          {display}
        </pre>

        <span className="text-accent text-4xl lg:text-8xl">+</span>
      </span>
    </div>
  );
};
