"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { ShortPost } from "@/types/global";

interface AnimatedBlogPostsProps {
  mainPost: ShortPost;
  secondaryPost: ShortPost;
}

export const AnimatedBlogPosts: React.FC<AnimatedBlogPostsProps> = ({
  mainPost,
  secondaryPost,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, staggerChildren: 0.2, ease: "easeOut" }}
      className="container mx-auto flex w-full flex-col gap-y-6 px-6 lg:w-6xl lg:max-w-6xl lg:gap-y-8 2xl:w-7xl 2xl:max-w-7xl"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-0 lg:gap-4">
          <motion.span
            variants={itemVariants}
            className="text-accent-dark pl-1 text-sm font-bold tracking-[3px] uppercase"
          >
            Más información
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl leading-tight font-bold text-[#0B142D] lg:text-5xl"
          >
            Nuestros Artículos
          </motion.h2>
        </div>

        <motion.div variants={itemVariants} className="hidden lg:flex">
          <Link
            href="/blog"
            className="group hover:text-accent-dark items-center gap-2 text-xs font-bold text-black uppercase transition-colors duration-200"
          >
            Ver más artículos
            <LongArrowRight className="group-hover:stroke-accent-dark group-hover:animate-wiggle ml-2 inline-block stroke-black transition-colors duration-200" />
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <motion.div variants={itemVariants} className="w-full lg:w-2/3">
          <Link
            href={`/blog/${mainPost.slug}`}
            className="flex w-full flex-col"
          >
            <div className="relative aspect-square w-full lg:aspect-video lg:h-[360px]">
              <Image
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                src={mainPost.mainImage?.url || "/images/default-image.jpg"}
                alt={mainPost.mainImage?.title || "Blog Post Image"}
                className="rounded object-cover"
              />
            </div>

            <AuthorAndDate blogPost={mainPost} />

            <h3 className="mt-2 line-clamp-2 font-sans! text-xl text-black lg:text-2xl">
              {mainPost.title}
            </h3>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full lg:w-1/3">
          <Link
            href={`/blog/${secondaryPost.slug}`}
            className="flex w-full flex-col"
          >
            <div className="relative aspect-square rounded lg:h-[360px]">
              <Image
                fill
                src={
                  secondaryPost.mainImage?.url || "/images/default-image.jpg"
                }
                sizes="(max-width: 1024px) 100vw, 33vw"
                alt={secondaryPost.mainImage?.title || "Blog Post Image"}
                className="rounded object-cover"
              />
            </div>

            <AuthorAndDate blogPost={secondaryPost} />

            <h3 className="mt-2 line-clamp-2 font-sans! text-xl font-semibold text-black lg:text-2xl">
              {secondaryPost.title}
            </h3>
          </Link>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex w-full items-center gap-2 lg:hidden"
      >
        <Link href="/blog" className="text-xs font-bold text-black uppercase">
          Ver más artículos
        </Link>

        <LongArrowRight className="ml-2 inline-block stroke-black" />
      </motion.div>
    </motion.div>
  );
};

const AuthorAndDate: React.FC<{ blogPost: ShortPost }> = ({ blogPost }) => {
  return (
    <div className="mt-4 flex items-center gap-x-2 text-sm lg:text-base">
      <span className="text-black/60">{blogPost.author?.name}</span>

      <span className="text-accent-dark">|</span>

      <time dateTime={blogPost.date} className="text-black/40">
        {blogPost.date
          ? format(blogPost.date, "dd.MM.yyyy", { locale: es })
          : ""}
      </time>
    </div>
  );
};
