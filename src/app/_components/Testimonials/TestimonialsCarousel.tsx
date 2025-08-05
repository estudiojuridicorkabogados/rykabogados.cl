"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Testimonial } from "./types";

interface TestimonalsCarouselProps {
  title: string;
  testimonials: Testimonial[];
}

export const TestimonalsCarousel: React.FC<TestimonalsCarouselProps> = ({
  title,
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      }
    });
  };

  return (
    <div className="w-4xl h-[300px] max-w-4xl mx-auto px-6 flex flex-col justify-between relative">
      <div className="relative overflow-hidden">
        <div className="text-white font-light uppercase text-sm mb-4">
          {title}
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="flex absolut h-[420px] w-full"
          >
            <p className=" text-3xl lg:text-3xl font-medium mb-8 cursor-grab active:cursor-grabbing">
              "{testimonials[currentIndex].quote}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full flex items-center justify-between mt-16">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`author-${currentIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex flex-col absolute"
          >
            <span className="font-semibold">
              {testimonials[currentIndex].name}
            </span>
            <p className="text-xs text-gray-300">
              {testimonials[currentIndex].role}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => paginate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-10"
            aria-label="Testimonio anterior"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-10"
            aria-label="Siguiente testimonio"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index > currentIndex ? 1 : -1;
              setDirection(newDirection);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
