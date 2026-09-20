"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { TestimonialsCarouselFallback } from "./TestimonialsCarouselFallback";
import { Testimonial } from "./types";

/**
 * The carousel is the only thing left on the homepage that needs
 * AnimatePresence, and it sits below the fold. Loading it on approach keeps
 * the animation runtime off the critical path that the hero image competes
 * for. See docs/lcp-performance-plan.md.
 */
const TestimonalsCarousel = dynamic(
  () => import("./TestimonialsCarousel").then((m) => m.TestimonalsCarousel),
  { ssr: false }
);

interface Props {
  title: string;
  testimonials: Testimonial[];
}

export const TestimonialsCarouselLoader: React.FC<Props> = ({
  title,
  testimonials,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setLoad(true);
            observer.disconnect();
          }
        }
      },
      // Start fetching before it is actually on screen, so the static slide is
      // usually already swapped out by the time it is read.
      { rootMargin: "600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {load ? (
        <TestimonalsCarousel title={title} testimonials={testimonials} />
      ) : (
        <TestimonialsCarouselFallback
          title={title}
          testimonial={testimonials[0]}
        />
      )}
    </div>
  );
};
