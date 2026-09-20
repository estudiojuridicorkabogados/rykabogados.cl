"use client";

import { es } from "date-fns/locale";
import { motion } from "motion/react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { formatSantiago } from "@/lib/utils/dates";
import { optimizedContentfulImageUrl } from "@/lib/utils/images";
import { ShortPost } from "@/types/global";

interface BlogPostEntryProps {
  blogPost: ShortPost;
  priority?: boolean;
}

export const BlogPostEntry: React.FC<BlogPostEntryProps> = ({
  blogPost,
  priority = false,
}) => {
  const mainImage = blogPost.mainImage;

  return (
    <motion.article
      initial={priority ? false : "hidden"}
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, staggerChildren: 0.2, ease: "easeOut" }}
      className="flex w-full flex-col"
    >
      <motion.div
        variants={itemVariants}
        className="relative aspect-video w-full rounded-2xl bg-gray-300 sm:aspect-2/1 lg:aspect-square"
      >
        <Image
          fill
          src={
            optimizedContentfulImageUrl(mainImage?.url) || "/default-image.jpg"
          }
          alt={mainImage?.description || blogPost.title || ""}
          className="rounded-2xl object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
          preload={priority}
        />
      </motion.div>

      <div className="w-full lg:max-w-xl">
        <motion.div
          variants={itemVariants}
          className="mt-4 flex items-center gap-x-2 text-sm lg:text-base"
        >
          <span className="text-black/60">{blogPost.author?.name}</span>

          <span className="text-accent-dark">|</span>

          {blogPost.date ? (
            <time dateTime={blogPost.date} className="text-black/40">
              {formatSantiago(blogPost.date, "dd.MM.yyyy", { locale: es })}
            </time>
          ) : null}
        </motion.div>

        <div className="group relative">
          <motion.h3
            variants={itemVariants}
            className="mt-1 font-sans! text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 lg:mt-2"
          >
            <Link href={(blogPost.href || "#") as Route}>
              <span className="absolute inset-0" />
              {blogPost.title}
            </Link>
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="mt-1 line-clamp-2 text-sm/6 leading-5 text-gray-600 lg:mt-3"
          >
            {blogPost.excerpt}
          </motion.p>
        </div>
      </div>
    </motion.article>
  );
};

export const BlogPostEntrySkeleton: React.FC = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <div className="loading-background-animation aspect-video w-full rounded-2xl sm:aspect-2/1 lg:aspect-square" />
      </div>

      <div className="mt-6 w-full max-w-xl">
        <div className="loading-background-animation h-4 w-2/3" />

        <div className="mt-3 flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="loading-background-animation h-3 w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
