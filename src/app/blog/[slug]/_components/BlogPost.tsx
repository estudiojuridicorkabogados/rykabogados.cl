"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { Post } from "@/types/global";

import { AuthorAndDate } from "./AuthorAndDate";
import { HablaConNosotros } from "./HablaConNosostros";
import { RichText } from "./RichText/RichText";

interface BlogPostProps {
  post: Post;
}

const Tags = ["Trabajo", "Empresa", "Reforma"];

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.2, ease: "easeOut" }}
      className="mx-auto px-6 text-base/7 text-gray-700 lg:max-w-6xl lg:px-8 2xl:w-7xl 2xl:max-w-7xl"
    >
      <motion.h1
        variants={itemVariants}
        className="relative z-10 mb-8 text-3xl text-black lg:text-5xl"
      >
        {post.title}
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="relative aspect-square w-full rounded-2xl lg:aspect-auto lg:h-[450px]"
      >
        <Image
          src={post.mainImage?.url || ""}
          alt={post.mainImage?.description || post.title || ""}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="rounded-xl object-cover"
        />
      </motion.div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <AuthorAndDate
            author={post.author}
            date={post.date}
            timeToRead={post.timeToRead}
          />

          <div className="mt-4 mb-12 flex gap-3">
            {Tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent text-accent-dark rounded-sm px-2 py-1 text-sm font-medium uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <RichText richtext={post.content} />
        </div>

        <HablaConNosotros />
      </div>

      <blockquote className="mt-10 border-t border-slate-300 pt-10 text-black/50 sm:text-xl">
        <p>
          En RK Abogados promovemos el cumplimiento de la normativa laboral y el
          fortalecimiento de relaciones laborales justas y sostenibles. Nuestro
          enfoque combina prevención, estrategia y claridad jurídica,
          permitiendo a cada organización actuar con seguridad, eficiencia y
          confianza.
        </p>
      </blockquote>
    </motion.div>
  );
};
