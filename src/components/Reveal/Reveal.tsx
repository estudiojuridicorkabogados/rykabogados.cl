"use client";

import { useEffect, useRef, useState } from "react";

import { classNames } from "@/lib/utils/classNames";

type RevealProps<T extends React.ElementType> = {
  as?: T;
  /** Stagger position within a group; drives transition-delay. */
  index?: number;
  /** Skip the reveal entirely — use for above-the-fold content. */
  immediate?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

type Phase = "idle" | "hidden" | "visible";

/**
 * CSS-driven replacement for `motion.div` + `initial="hidden"` +
 * `whileInView="visible"`. One IntersectionObserver per element, no animation
 * library, and the markup is served visible so text renders before hydration
 * and stays eligible as an LCP candidate.
 *
 * On mount it measures once: anything already on screen is simply left alone,
 * which is what keeps above-the-fold content from flashing. Only elements
 * confirmed to be below the fold are hidden and then animated in.
 */
export const Reveal = <T extends React.ElementType = "div">({
  as,
  index = 0,
  immediate = false,
  className,
  children,
  ...rest
}: RevealProps<T>) => {
  const Tag = (as ?? "div") as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (immediate) return;

    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Already on screen: leave it visible rather than hiding and re-showing it.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      return;
    }

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("visible");
            observer.disconnect();
          }
        }
      },
      {
        // The huge top margin extends the root far above the viewport, so
        // "intersecting" means "this element has been reached", not "this
        // element is on screen right now". Without it, a jump that carries the
        // viewport straight past an element — an anchor link, a restored
        // scroll position, a flick on a phone — crosses no threshold, the
        // callback never fires, and the content stays invisible for the rest
        // of the session.
        rootMargin: "100000px 0px -5% 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      className={classNames(
        "reveal",
        {
          "reveal-hidden": phase === "hidden" || phase === "visible",
          "is-visible": phase === "visible",
        },
        className
      )}
      style={
        index ? ({ "--reveal-i": index } as React.CSSProperties) : undefined
      }
      {...rest}
    >
      {children}
    </Tag>
  );
};
