"use client";

import { motion, stagger } from "motion/react";

import { itemVariants } from "@/utils/animations";
import { classNames } from "@/utils/classNames";

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

      <div className="py-32">
        <motion.div className="relative" variants={itemVariants}>
          <div
            role="region"
            aria-label="Miembros del equipo"
            className={classNames([
              "flex gap-8 overflow-x-auto pb-4",
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
                "snap-start shrink-0 w-[260px] md:w-[400px] bg-[red]",
                "bg-white/5 border border-white/10 rounded-lg overflow-hidden",
                "ml-48"
              )}
            >
              <div className="flex flex-col gap-8">
                <h2 className="text-4xl">Videos que hemos preparado para ti</h2>

                <p className="text-lg text-black/70 leading-relaxed">
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
                  "shrink-0 w-[260px] md:w-[600px]",
                  "bg-white/5 border border-white/10 rounded-lg overflow-hidden ml-12"
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
                  <p className="text-xl">{title}</p>
                </div>
              </div>
            ))}

            {/* {team.map((m) => (
              <article
                key={m.name}
                data-card
                className={classNames(
                  "snap-start shrink-0 w-[260px] md:w-[300px]",
                  "bg-white/5 border border-white/10 rounded-lg overflow-hidden",
                  "first:ml-12 last:mr-6"
                )}
              >
                <div className="relative aspect-[3/4] bg-white/5">
                  <Image
                    src={m.photo}
                    alt={`${m.name} - ${m.role}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    fill
                  />
                </div>
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{m.name}</h3>
                    <p className="text-white/80">{m.role}</p>
                  </div>

                  {m.linkedin ? (
                    <Link
                      href={m.linkedin}
                      target="_blank"
                      className="pt-2"
                      rel="noopener noreferrer"
                    >
                      <LinkedinSquareIcon className="h-7 w-7 fill-white/50" />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))} */}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
