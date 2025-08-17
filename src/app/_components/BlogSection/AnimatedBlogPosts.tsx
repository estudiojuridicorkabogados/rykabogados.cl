"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { ShortPost } from "@/types/global";
import { containerVariants, itemVariants } from "@/utils/animations";

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
      className="flex flex-col container mx-auto px-6 w-full lg:w-6xl lg:max-w-6xl gap-y-12 lg:gap-y-8"
    >
      <div className="flex flex-col lg:flex-row gap-y-4 lg:justify-between lg:items-center">
        <div className="flex flex-col gap-4">
          <motion.span
            variants={itemVariants}
            className="uppercase text-sm text-accent-dark font-bold tracking-[3px]"
          >
            Nuestro Articulos
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold text-black"
          >
            Excelencia
          </motion.h2>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 group"
        >
          <Link
            href="/blog"
            className="text-black uppercase text-xs font-bold group-hover:text-accent-dark transition-colors duration-200"
          >
            Ver mas
          </Link>

          <LongArrowRight className="ml-2 inline-block stroke-black group-hover:stroke-accent-dark group-hover:animate-wiggle transition-colors duration-200" />
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div variants={itemVariants} className="w-full lg:w-2/3">
          <Link
            href={`/blog/${mainPost.slug}`}
            className="w-full flex flex-col"
          >
            <div className="relative w-full lg:h-[360px] aspect-square lg:aspect-video rounded-lg shadow-[0px_2px_2px_0px_#00000040]">
              <Image
                fill
                src={mainPost.mainImage?.url || "/images/default-image.jpg"}
                alt={mainPost.mainImage?.title || "Blog Post Image"}
                className="object-cover rounded-lg shadow-[0px_2px_2px_0px_#00000040]"
              />
            </div>

            <h3 className="mt-6 text-xl lg:text-3xl text-black truncate">
              {mainPost.title}
            </h3>

            {mainPost.date ? (
              <p className="text-black/40">{formatDate(mainPost.date)}</p>
            ) : null}
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full lg:w-1/3">
          <Link
            href={`/blog/${secondaryPost.slug}`}
            className="w-full flex flex-col"
          >
            <div className="relative lg:h-[360px] aspect-square rounded-lg shadow-[0px_2px_2px_0px_#00000040]">
              <Image
                fill
                src={
                  secondaryPost.mainImage?.url || "/images/default-image.jpg"
                }
                alt={secondaryPost.mainImage?.title || "Blog Post Image"}
                className="object-cover rounded-lg shadow-[0px_2px_2px_0px_#00000040]"
              />
            </div>

            <h3 className="mt-6 text-xl lg:text-3xl text-black truncate">
              {secondaryPost.title}
            </h3>

            {secondaryPost.date ? (
              <p className="text-black/40">{formatDate(secondaryPost.date)}</p>
            ) : null}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

function formatDate(date: string): string {
  return format(new Date(date), "dd.MM.yyyy", { locale: es });
}
