"use client";

import { motion, stagger, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { LinkedinSquareIcon } from "@/components/icons/LinkedinSquare";
import { itemVariants } from "@/utils/animations";
import { classNames } from "@/utils/classNames";

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    name: "Luciano Ascui",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/luciano.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Javiera Fredes",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/javiera.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Camila Retamales",
    role: "Abogada Fundadora",
    photo: "/images/team/camila.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Bastian Morales",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/bastian.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Luciano Ascui",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/luciano.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Javiera Fredes",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/javiera.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Camila Retamales",
    role: "Abogada Fundadora",
    photo: "/images/team/camila.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Bastian Morales",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/bastian.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  // agrega más miembros si es necesario
];

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
  return (
    <motion.section
      id="nuestro-team"
      initial="hidden"
      whileInView="visible"
      className="w-full bg-primary text-white"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="py-32">
        <div className="mx-auto max-w-6xl mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-semibold"
            >
              Nuestro Team
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
            role="region"
            aria-label="Miembros del equipo"
            className={classNames([
              "flex gap-8 overflow-x-auto pb-4",
              "snap-x snap-proximity scroll-smooth snap-always",
              "[scrollbar-width:none] [-ms-overflow-style:none]",
              "scroll-pl-6 md:scroll-pl-6",
            ])}
            style={{
              // hide scrollbar for WebKit
              WebkitOverflowScrolling: "touch",
            }}
          >
            {team.map((m) => (
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
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
