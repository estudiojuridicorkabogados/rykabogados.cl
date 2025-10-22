"use client";

import { useEffect, useRef } from "react";
import { motion, stagger, Variants } from "motion/react";
import Image from "next/image";

import { LinkedinSquareIcon } from "@/components/icons/LinkedinSquare";
import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";
import { TEAM_MEMBERS } from "@/lib/utils/constants";

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const OurTeam = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Add ref

  // Add wheel event handler
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical scroll events (deltaY)
      // Don't interfere if user is holding Shift (for native horizontal scroll)
      if (e.deltaY !== 0 && !e.shiftKey) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <motion.section
      id="nuestro-equipo"
      initial="hidden"
      whileInView="visible"
      className="w-full bg-primary text-white"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="py-16 lg:py-28">
        <div className="section-container mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl md:text-5xl font-semibold"
            >
              Nuestro Equipo
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-white/80"
            >
              Retamales Kowalsky Abogados es un estudio jurídico que ofrece sus
              servicios a lo largo de todo Chile, conformado por un equipo de
              abogados.
            </motion.p>
          </div>
        </div>

        {/* hide scrollbar for WebKit */}
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>

        <motion.div className="relative" variants={imageVariants}>
          <div
            ref={scrollContainerRef}
            role="region"
            aria-label="Miembros del equipo"
            className={classNames([
              "flex gap-8 overflow-x-auto pb-4",
              "scroll-smooth",
              // "snap-x snap-proximity scroll-smooth snap-always",
              "[scrollbar-width:none] [-ms-overflow-style:none]",
              "scroll-pl-6 md:scroll-pl-6",
            ])}
            style={{
              // hide scrollbar for WebKit
              WebkitOverflowScrolling: "touch",
            }}
          >
            {TEAM_MEMBERS.map((m, i) => (
              <article
                key={i}
                data-card
                className={classNames(
                  "snap-start shrink-0 w-[260px] md:w-[300px]",
                  "bg-white/5 border border-white/10 rounded-lg overflow-hidden",
                  "first:ml-6 lg:first:ml-26 xl:first:ml-40 last:mr-6"
                )}
              >
                <div className="relative hidden lg:block h-[320px] bg-white/5">
                  <Image
                    src={m.photo}
                    alt={`${m.name} - ${m.role}`}
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 320px"
                    fill
                  />
                </div>
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="!font-sans text-base !font-semibold">
                      {m.name}
                    </h3>
                    <p className="text-white/80 text-sm">{m.role}</p>
                  </div>

                  <a
                    href={m.linkedin}
                    target="_blank"
                    className="pt-2"
                    rel="noopener noreferrer"
                  >
                    <LinkedinSquareIcon className="h-7 w-7 fill-white/50" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
