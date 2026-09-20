"use client";

import React from "react";
import { es } from "date-fns/locale";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { formatSantiago } from "@/lib/utils/dates";
import { optimizedContentfulImageUrl } from "@/lib/utils/images";
import { ShortPost } from "@/types/global";

interface HighlightedPostProps {
  post: ShortPost;
}

export const HighlightedPost: React.FC<HighlightedPostProps> = ({ post }) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <h1 className="relative z-10 text-3xl font-bold text-black lg:text-5xl">
        Publicaciones
      </h1>

      <div className="relative aspect-4/5 w-full rounded-2xl bg-gray-300 lg:aspect-auto lg:h-[450px]">
        <Link href={`/blog/${post.slug}`}>
          <div className="absolute inset-0 z-1 rounded-2xl bg-black/30" />

          <Image
            src={optimizedContentfulImageUrl(post.mainImage?.url) || ""}
            alt={post.mainImage?.description || post.title || ""}
            className="h-full w-full rounded-2xl object-cover"
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 80vw"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              staggerChildren: 0.2,
              ease: "easeOut",
            }}
            className="absolute right-4 bottom-4 left-4 z-10 flex w-fit flex-col items-start justify-end gap-3 overflow-hidden rounded-2xl p-4 backdrop-blur-xl lg:p-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-x-2 text-sm lg:text-base"
            >
              <span className="text-white">{post.author?.name}</span>

              <span className="text-white">|</span>

              {post.date ? (
                <time dateTime={post.date} className="text-white">
                  {formatSantiago(post.date, "dd.MM.yyyy", { locale: es })}
                </time>
              ) : null}
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="line-clamp-4 text-xl font-bold text-white lg:w-2/3 lg:text-3xl"
            >
              {post.title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="lg:text-medium line-clamp-3 hidden text-sm text-white md:flex lg:w-2/3"
            >
              {post.excerpt}
            </motion.p>

            <motion.div variants={itemVariants}>
              <div className="group flex items-center gap-2 hover:cursor-pointer">
                <span className="group-hover:text-accent-dark text-xs font-bold tracking-[3px] text-white uppercase transition-colors duration-200">
                  Leer más
                </span>
                <LongArrowRight className="group-hover:stroke-accent-dark group-hover:animate-wiggle ml-2 inline-block stroke-white transition-colors duration-200" />
              </div>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};
