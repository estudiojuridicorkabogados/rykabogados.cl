"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { LinkedinSquareIcon } from "@/components/icons/LinkedinSquare";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { TEAM_MEMBERS } from "@/lib/utils/constants";

export const TeamGrid = () => {
  return (
    <div className="bg-primary py-16 lg:py-28">
      <motion.div
        className="section-container flex flex-col gap-4"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl leading-tight font-bold text-white lg:text-5xl"
        >
          Conoce a nuestro equipo
        </motion.h2>

        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {TEAM_MEMBERS.map((person, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-14/13 w-full rounded-2xl outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10">
                <Image
                  alt={person.name}
                  src={person.photo}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="rounded-t-2xl object-cover"
                />
              </div>

              <div className="my-5 flex w-full flex-row justify-between gap-3 px-5">
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full flex-row items-center justify-between gap-3">
                    <h3 className="font-sans! text-base font-bold! text-white">
                      {person.name}
                    </h3>
                  </div>

                  <p className="mb-4 text-sm text-white/80 italic">
                    {person.role}
                  </p>

                  <a
                    href={`mailto:${person.email}`}
                    target="_blank"
                    className="hover:text-accent cursor-pointer text-sm text-white/80 transition-colors duration-300"
                    rel="noreferrer"
                  >
                    {person.email}
                  </a>
                  <a
                    href={person.phoneLink}
                    target="_blank"
                    className="hover:text-accent mb-2 cursor-pointer text-sm text-white/80 transition-colors duration-300"
                    rel="noreferrer"
                  >
                    {person.phone}
                  </a>

                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinSquareIcon className="hover:fill-accent size-5 fill-white/50 transition-colors duration-300" />
                  </a>

                  {/* <a
                    href={`https://wa.me/${person.phone.replace("+56 ", "")}`}
                    target="_blank"
                    className="cursor-pointer text-base/7 text-white/80"
                    rel="noreferrer"
                  >
                    <WhatsappIcon className="h-7 w-7 fill-white/50" />
                  </a> */}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
