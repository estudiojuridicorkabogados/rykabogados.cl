"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { ShortPost } from "@/types/global";
import { containerVariants, itemVariants } from "@/utils/animations";

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
      className="flex flex-col gap-8"
    >
      <motion.h1
        variants={itemVariants}
        className="relative text-5xl font-bold text-black z-10"
      >
        Nuestro articulos
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="relative w-full lg:h-[450px] rounded-2xl"
      >
        <div className="absolute inset-0 bg-black/30 rounded-2xl z-1" />

        <Image
          src={post.mainImage?.url || ""}
          alt={post.mainImage?.description || ""}
          className="object-cover w-full h-full rounded-2xl"
          fill
        />

        <div className="absolute inset-0 flex flex-col justify-end items-start gap-4 p-8 z-10">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-white"
          >
            {post.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white">
            {post.excerpt}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-2 group hover:cursor-pointer"
            >
              <span className="text-white uppercase text-xs font-bold group-hover:text-accent-dark transition-colors duration-200">
                Ver mas
              </span>
              <LongArrowRight className="ml-2 inline-block stroke-white group-hover:stroke-accent-dark group-hover:animate-wiggle transition-colors duration-200" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
