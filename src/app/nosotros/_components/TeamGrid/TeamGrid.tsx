"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { itemVariants } from "@/lib/utils/animations";
import { TEAM_MEMBERS } from "@/lib/utils/constants";

export const TeamGrid = () => {
  return (
    <div className="py-16 lg:py-28 bg-primary">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.3 }}
        className="mx-auto w-full lg:w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl px-6 lg:px-8"
      >
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {TEAM_MEMBERS.map((person, i) => (
            <motion.li key={i} variants={itemVariants}>
              <div className="aspect-14/13 w-full rounded-2xl outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10 relative">
                <Image
                  alt={person.name}
                  src={person.photo}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="rounded-2xl object-cover"
                />
              </div>

              <h3 className="!font-sans !font-bold mt-6 text-lg/8 tracking-tight text-white">
                {person.name}
              </h3>
              <p className="text-base/7 text-white/80">
                {person.role}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
