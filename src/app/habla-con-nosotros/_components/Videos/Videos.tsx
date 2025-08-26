"use client";

import { motion, stagger } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";

const VIDEOS = [
  {
    title: "Despido Injustificado",
    video: "https://www.youtube.com/shorts/o48pJXReb6M?feature=share",
  },

  {
    title: "Despido por Necesidades de la empresa",
    video: "https://www.youtube.com/shorts/XEjhFoujOVc?feature=share",
  },

  {
    title: "Realizar Autodespido",
    video: "https://www.youtube.com/shorts/PZWTNkP0M4k?feature=share",
  },
];

export const Videos = () => {
  return (
    <motion.section
      id="videos"
      initial="hidden"
      whileInView="visible"
      className="w-full bg-white text-black"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>

      <div className="py-20 lg:py-32">
        <motion.div className="relative" variants={itemVariants}>
          <div
            role="region"
            aria-label="Miembros del equipo"
            className={classNames([
              "flex flex-col lg:flex-row gap-8 overflow-x-auto pb-4 px-6 lg:px-0",
              "scroll-smooth",
              "[scrollbar-width:none] [-ms-overflow-style:none]",
              "scroll-pl-6 md:scroll-pl-6",
            ])}
            style={{
              // hide scrollbar for WebKit
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              data-card
              className={classNames(
                "snap-start shrink-0 w-full md:w-[260px] lg:w-[400px] bg-[red]",
                "bg-white/5 border border-white/10 rounded-lg overflow-hidden",
                "lg:px-0 lg:ml-48"
              )}
            >
              <div className="flex flex-col gap-4 lg:gap-8">
                <h2 className="text-2xl lg:text-4xl">
                  Videos que hemos preparado para ti
                </h2>

                <p className="lg:text-lg text-black/70 leading-relaxed">
                  Conoce más de nuestro servicio a través de estos videos
                  informativos donde te explicamos cómo podemos ayudarte con tus
                  necesidades legales.
                </p>
              </div>
            </div>

            {VIDEOS.map(({ title, video }, i) => (
              <div
                data-card
                key={i}
                className={classNames(
                  "shrink-0 w-full md:w-[600px]",
                  "bg-white/5 border border-white/10 rounded-lg overflow-hidden lg:ml-12"
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={video
                        .replace("shorts/", "embed/")
                        .replace("?feature=share", "")}
                      title={title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="lg:text-xl">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
