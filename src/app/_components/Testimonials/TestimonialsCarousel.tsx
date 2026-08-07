"use client";

import { PropsWithChildren, useMemo, useState } from "react";
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
    <div className="relative flex h-full w-full flex-col justify-between rounded-2xl px-6 py-6 lg:w-4xl lg:max-w-4xl">
      <div className="relative overflow-hidden">
        <div className="mb-4 text-xs font-bold tracking-[3px] text-white uppercase lg:text-sm">
          {title}
        </div>

        <div className="relative w-full">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <Slide key={selectedItem.index}>
              <p className="line-clamp-5 pb-8 text-2xl font-medium lg:text-2xl">
                &ldquo;{selectedItem.quote}&rdquo;
              </p>
            </Slide>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2 flex w-full items-center justify-between">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide key={selectedItem.index}>
            <div>
              <span className="font-light italic">{selectedItem.name}</span>
              {/* <p className="text-xs text-gray-300">{selectedItem.role}</p> */}
            </div>
          </Slide>
        </AnimatePresence>

        <div className="ml-auto flex gap-2">
          <RoundButton onClick={() => setSlide(-1)}>
            <ChevronLeftIcon className="h-5 w-5" />
          </RoundButton>

          <RoundButton onClick={() => setSlide(1)}>
            <ChevronRightIcon className="h-5 w-5" />
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

interface SlideProps {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const Slide = ({ children, ref }: SlideProps) => {
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
};

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
      className="z-10 cursor-pointer rounded-full bg-white/10 p-2 transition-colors duration-200 hover:bg-white/20"
      aria-label="Siguiente"
      whileFocus={{ outline: `2px solid red` }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
