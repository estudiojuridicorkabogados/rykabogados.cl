"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "motion/react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { Post } from "@/types/global";

import { RichText } from "./RichText/RichText";
import { AuthorAndDate } from "./AuthorAndDate";
import { HablaConNosotros } from "./HablaConNosostros";

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
      className="mx-auto px-6 lg:px-8 lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl text-base/7 text-gray-700"
    >
      <motion.h1
        variants={itemVariants}
        className="relative text-3xl lg:text-5xl text-black z-10 mb-8"
      >
        {post.title}
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="relative w-full aspect-square lg:aspect-auto lg:h-[450px] rounded-2xl"
      >
        <Image
          src={post.mainImage?.url || ""}
          alt={post.mainImage?.description || post.title || ""}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="rounded-xl object-cover"
        />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-8">
        <div className="flex-1">
          <AuthorAndDate author={post.author} date={post.date} timeToRead={post.timeToRead} />

          <div className="flex gap-3 mt-4 mb-12">
            {Tags.map((tag) => (
              <span
                key={tag}
                className="text-sm uppercase font-medium px-2 py-1 bg-accent text-accent-dark rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <RichText richtext={post.content} />
        </div>

        <HablaConNosotros />
      </div>

      <blockquote className="border-slate-300 border-t pt-10 mt-10 text-black/50 sm:text-xl">
        <p>
          En RK Abogados, somos especialistas en derecho laboral y estamos
          comprometidos en brindar asesoría tanto a empresas como a trabajadores
          en materia de inclusión laboral y cumplimiento normativo. Si tu
          empresa busca implementar políticas inclusivas o si eres un trabajador
          en situación de discapacidad que requiere orientación sobre tus
          derechos, nuestro equipo está preparado para ofrecer soluciones
          legales efectivas y personalizadas. Contáctanos y aprovecha nuestra
          experiencia para construir un entorno laboral más justo, equitativo y
          ajustado a la normativa vigente.
        </p>
      </blockquote>
    </motion.div>
  );
};
