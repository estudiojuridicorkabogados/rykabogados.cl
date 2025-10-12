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
      className="flex flex-col container mx-auto px-6 w-full lg:w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl gap-y-6 lg:gap-y-8"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex flex-col gap-0 lg:gap-4">
          <motion.span
            variants={itemVariants}
            className="uppercase text-sm text-accent-dark font-bold tracking-[3px] pl-1"
          >
            Más información
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-[#0B142D] leading-tight"
          >
            Nuestros Artículos
          </motion.h2>
        </div>

        <motion.div variants={itemVariants} className="hidden lg:flex">
          <Link
            href="/blog"
            className="items-center gap-2 group text-black uppercase text-xs font-bold hover:text-accent-dark transition-colors duration-200"
          >
            Ver más artículos
            <LongArrowRight className="ml-2 inline-block stroke-black group-hover:stroke-accent-dark group-hover:animate-wiggle transition-colors duration-200" />
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div variants={itemVariants} className="w-full lg:w-2/3">
          <Link
            href={`/blog/${mainPost.slug}`}
            className="w-full flex flex-col"
          >
            <div className="relative w-full lg:h-[360px] aspect-square lg:aspect-video">
              <Image
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                src={mainPost.mainImage?.url || "/images/default-image.jpg"}
                alt={mainPost.mainImage?.title || "Blog Post Image"}
                className="object-cover rounded"
              />
            </div>

            <AuthorAndDate blogPost={mainPost} />

            <h3 className="mt-2 text-xl lg:text-2xl text-black line-clamp-2 font-semibold !font-sans">
              {mainPost.title}
            </h3>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full lg:w-1/3">
          <Link
            href={`/blog/${secondaryPost.slug}`}
            className="w-full flex flex-col"
          >
            <div className="relative lg:h-[360px] aspect-square rounded">
              <Image
                fill
                src={
                  secondaryPost.mainImage?.url || "/images/default-image.jpg"
                }
                sizes="(max-width: 1024px) 100vw, 33vw"
                alt={secondaryPost.mainImage?.title || "Blog Post Image"}
                className="object-cover rounded"
              />
            </div>

            <AuthorAndDate blogPost={secondaryPost} />

            <h3 className="mt-2 text-xl lg:text-2xl text-black line-clamp-2 font-semibold !font-sans">
              {secondaryPost.title}
            </h3>
          </Link>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex lg:hidden items-center gap-2 w-full"
      >
        <Link href="/blog" className="text-black uppercase text-xs font-bold">
          Ver más artículos
        </Link>

        <LongArrowRight className="ml-2 inline-block stroke-black" />
      </motion.div>
    </motion.div>
  );
};

function formatDate(date: string): string {
  return format(new Date(date), "dd.MM.yyyy", { locale: es });
}

const AuthorAndDate: React.FC<{ blogPost: ShortPost }> = ({ blogPost }) => {
  return (
    <div className="mt-4 flex items-center gap-x-2 text-sm lg:text-base">
      <span className="text-black/60">{blogPost.author?.name}</span>

      <span className="text-accent-dark">|</span>

      <time
        dateTime={blogPost.date || new Date().toISOString()}
        className="text-black/40"
      >
        {blogPost.date
          ? format(blogPost.date, "dd.MM.yyyy", { locale: es })
          : ""}
      </time>
    </div>
  );
};
