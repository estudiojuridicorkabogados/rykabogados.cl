"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { ShortPost } from "@/types/global";
import { containerVariants, itemVariants } from "@/utils/animations";

interface BlogPostEntryProps {
  blogPost: ShortPost;
}

export const BlogPostEntry: React.FC<BlogPostEntryProps> = ({ blogPost }) => {
  const mainImage = blogPost.mainImage;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, staggerChildren: 0.2, ease: "easeOut" }}
      className="flex flex-col items-start w-full"
    >
      <motion.div
        variants={itemVariants}
        className="relative w-full aspect-video sm:aspect-2/1 lg:aspect-3/2 rounded-2xl bg-gray-100 object-cover "
      >
        <Image
          fill
          src={mainImage?.url || "/default-image.jpg"}
          alt={mainImage?.title || "Blog Post Image"}
          className="object-cover rounded-2xl"
        />
      </motion.div>

      <div className="w-full lg:max-w-xl">
        <motion.div
          variants={itemVariants}
          className="mt-6 flex items-center gap-x-4 text-xs"
        >
          <time
            dateTime={blogPost.date || new Date().toISOString()}
            className="text-gray-500"
          >
            {blogPost.date
              ? format(blogPost.date, "d 'de' MMMM yyyy", { locale: es })
              : ""}
          </time>
        </motion.div>

        <div className="group relative">
          <motion.h3
            variants={itemVariants}
            className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600"
          >
            <Link href={blogPost.href || "#"}>
              <span className="absolute inset-0" />
              {blogPost.title}
            </Link>
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="mt-5 line-clamp-3 text-sm/6 text-gray-600"
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
    <div className="flex flex-col items-start">
      <div className="w-full">
        <div className="loading-background-animation aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2" />
      </div>

      <div className="max-w-xl w-full mt-6 ">
        <div className="loading-background-animation h-4 w-2/3" />

        <div className="flex flex-col gap-3 mt-3">
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
