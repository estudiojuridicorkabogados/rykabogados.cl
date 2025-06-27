"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Variants } from "motion";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { ShortPost } from "@/types/global";
import { smoothSpring } from "@/utils/animations";

interface BlogPostEntryProps {
  blogPost: ShortPost;
}

const variants: Variants = {
  offscreen: {
    y: 40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: smoothSpring,
  },
};

// @TODO Animate the appearance of the blog post entry, ideally one after the other with a slight delay

export const BlogPostEntry: React.FC<BlogPostEntryProps> = ({ blogPost }) => {
  const mainImage = blogPost.mainImage;

  return (
    <motion.article
      variants={variants}
      className="flex flex-col items-start justify-between"
    >
      <div className="relative w-full">
        <div className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2">
          <Image
            fill
            src={mainImage?.url || "/default-image.jpg"}
            alt={mainImage?.title || "Blog Post Image"}
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
      </div>
      <div className="max-w-xl">
        <motion.div
          variants={variants}
          className="mt-8 flex items-center gap-x-4 text-xs"
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
            variants={variants}
            className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600"
          >
            <Link href={blogPost.href || "#"}>
              <span className="absolute inset-0" />
              {blogPost.title}
            </Link>
          </motion.h3>
          <motion.p
            variants={variants}
            className="mt-5 line-clamp-3 text-sm/6 text-gray-600"
          >
            {blogPost.excerpt}
          </motion.p>
        </div>
        {/* <div className="relative mt-8 flex items-center gap-x-4">
          <img
            alt=""
            src={blogPost.author.imageUrl}
            className="size-10 rounded-full bg-gray-100"
          />
          <div className="text-sm/6">
            <p className="font-semibold text-gray-900">
              <a href={blogPost.author.href}>
                <span className="absolute inset-0" />
                {blogPost.author.name}
              </a>
            </p>
            <p className="text-gray-600">{blogPost.author.role}</p>
          </div>
        </div> */}
      </div>
    </motion.article>
  );
};
