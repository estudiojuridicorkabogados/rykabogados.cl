"use client";

import { useEffect, useRef } from "react";
import { stagger } from "motion/react";
import type { Variants } from "motion/react";
import * as m from "motion/react-m";
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

const isMacOS = (): boolean => {
  if (typeof navigator === "undefined") return false;
  return (navigator.platform || "").includes("Mac");
};

export const OurTeam = () => {
  const scrollContainerRef = useRef<HTMLElement>(null); // Add ref

  // Add wheel event handler
  useEffect(() => {
    if (isMacOS()) return;

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
    <m.section
      id="nuestro-equipo"
      initial="hidden"
      whileInView="visible"
      className="bg-primary w-full text-white"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="py-16 lg:py-28">
        <div className="section-container mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <m.h2
              variants={itemVariants}
              className="text-3xl font-semibold md:text-5xl lg:text-4xl"
            >
              Nuestro Equipo
            </m.h2>
            <m.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-white/80"
            >
              Retamales Kowalski Abogados es un estudio jurídico especializado
              en derecho laboral, que asesora a empresas en la gestión
              estratégica de sus relaciones laborales y contingencias legales.
              Contamos con un equipo con amplia experiencia en asesoría
              preventiva, negociación y defensa judicial, con cobertura a nivel
              nacional.
            </m.p>
          </div>
        </div>

        {/* hide scrollbar for WebKit */}
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>

        <m.div className="relative" variants={imageVariants}>
          <section
            ref={scrollContainerRef}
            aria-label="Miembros del equipo"
            className={classNames([
              "flex gap-4 overflow-x-auto pb-4",
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
            {TEAM_MEMBERS.map((member, i) => (
              <article
                key={i}
                data-card
                className={classNames(
                  "snap-start shrink-0 w-[280px] md:w-[300px]",
                  "bg-white/5 border border-white/10 rounded-lg overflow-hidden",
                  "first:ml-6 lg:first:ml-26 xl:first:ml-40 last:mr-6"
                )}
              >
                <div className="relative hidden h-[320px] bg-white/5 lg:block">
                  <Image
                    src={member.photo}
                    alt={`${member.name} - ${member.role}`}
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 320px"
                    fill
                  />
                </div>
                <div className="flex items-start justify-between gap-2 p-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans! text-base font-semibold!">
                      {member.name}
                    </h3>
                    <p className="truncate text-sm text-white/80 md:overflow-visible md:text-clip md:whitespace-normal">
                      {member.role}
                    </p>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    className="pt-2"
                    rel="noopener noreferrer"
                  >
                    <LinkedinSquareIcon className="h-7 w-7 fill-white/50" />
                  </a>
                </div>
              </article>
            ))}
          </section>
        </m.div>
      </div>
    </m.section>
  );
};
