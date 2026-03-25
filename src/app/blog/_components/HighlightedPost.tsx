"use client";

import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { ShortPost } from "@/types/global";

interface HighlightedPostProps {
  post: ShortPost;
}

export const HighlightedPost: React.FC<HighlightedPostProps> = ({ post }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, staggerChildren: 0.2, ease: "easeOut" }}
      className="flex flex-col gap-6 lg:gap-8"
    >
      <motion.h1
        variants={itemVariants}
        className="relative text-3xl lg:text-5xl font-bold text-black z-10"
      >
        Publicaciones
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="relative w-full aspect-4/5 lg:aspect-auto lg:h-[450px] rounded-2xl"
      >
        <Link href={`/blog/${post.slug}`}>
          <div className="absolute inset-0 bg-black/30 rounded-2xl z-1" />

          <Image
            src={post.mainImage?.url || ""}
            alt={post.mainImage?.description || ""}
            className="object-cover w-full h-full rounded-2xl"
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
          />

          <div className="backdrop-blur-xl absolute bottom-4 left-4 right-4 w-fit rounded-2xl overflow-hidden flex flex-col justify-end items-start gap-3 p-4 lg:p-6 z-10">
            {/* <div className="backdrop-blur-xl absolute inset-0 flex flex-col justify-end items-start gap-4 p-4 lg:p-8 z-10"> */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-x-2 text-sm lg:text-base"
            >
              <span className="text-white">{post.author?.name}</span>

              <span className="text-white">|</span>

              {post.date ? (
                <time dateTime={post.date} className="text-white">
                  {format(post.date, "dd.MM.yyyy", { locale: es })}
                </time>
              ) : null}
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-xl lg:text-3xl font-bold text-white line-clamp-4 lg:w-2/3"
            >
              {post.title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="hidden md:flex text-white line-clamp-3 text-sm lg:text-medium lg:w-2/3"
            >
              {post.excerpt}
            </motion.p>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 group hover:cursor-pointer">
                <span className="text-white uppercase text-xs font-bold group-hover:text-accent-dark transition-colors duration-200 tracking-[3px]">
                  Leer más
                </span>
                <LongArrowRight className="ml-2 inline-block stroke-white group-hover:stroke-accent-dark group-hover:animate-wiggle transition-colors duration-200" />
              </div>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};
