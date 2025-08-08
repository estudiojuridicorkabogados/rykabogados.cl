"use client";

import { forwardRef, PropsWithChildren, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";

import { Testimonial } from "./types";

interface TestimonalsCarouselProps {
  title: string;
  testimonials: Testimonial[];
}

export const TestimonalsCarousel: React.FC<TestimonalsCarouselProps> = ({
  title,
  testimonials,
}) => {
  const [direction, setDirection] = useState<1 | -1>(1);

  const items = useMemo(
    () =>
      testimonials.map((testimonial, index) => ({
        ...testimonial,
        index,
      })),
    [testimonials]
  );

  const [selectedItem, setSelectedItem] = useState(items[0]);

  const setSlide = (newDirection: 1 | -1) => {
    const nextItem = wrap(1, items.length, selectedItem.index + newDirection);

    setSelectedItem(items[nextItem]);
    setDirection(newDirection);
  };

  return (
    <div className="w-4xl h-[350px] lg:h-[350px] max-w-4xl mx-auto px-6 flex flex-col justify-between relative">
      <div className="relative overflow-hidden">
        <div className="text-white font-light uppercase text-sm mb-4">
          {title}
        </div>

        <div className="relative h-[420px] w-full">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <Slide key={selectedItem.index}>
              <p className="text-3xl lg:text-3xl font-medium mb-8">
                &ldquo;{selectedItem.quote}&rdquo;
              </p>
            </Slide>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-16">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide key={selectedItem.index}>
            <div>
              <span className="font-semibold">{selectedItem.name}</span>
              <p className="text-xs text-gray-300">{selectedItem.role}</p>
            </div>
          </Slide>
        </AnimatePresence>

        <div className="flex gap-2 ml-auto">
          <RoundButton onClick={() => setSlide(-1)}>
            <ChevronLeftIcon className="w-5 h-5" />
          </RoundButton>

          <RoundButton onClick={() => setSlide(1)}>
            <ChevronRightIcon className="w-5 h-5" />
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

interface SlideProps {
  children: React.ReactNode;
}

const Slide = forwardRef(
  ({ children }: SlideProps, ref: React.Ref<HTMLDivElement>) => {
    const direction = usePresenceData();

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: direction * 60 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            delay: 0,
            type: "spring",
            visualDuration: 0.5,
            bounce: 0,
          },
        }}
        exit={{ opacity: 0, x: direction * -60 }}
      >
        {children}
      </motion.div>
    );
  }
);

Slide.displayName = "Slide";

interface RoundButtonProps {
  onClick: () => void;
}

const RoundButton: React.FC<PropsWithChildren<RoundButtonProps>> = ({
  children,
  onClick,
}) => {
  return (
    <motion.button
      initial={false}
      className="cursor-pointer p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-10"
      aria-label="Siguiente"
      whileFocus={{ outline: `2px solid red` }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
