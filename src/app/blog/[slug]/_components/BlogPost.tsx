import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";

import { Post } from "@/types/global";

import { RichText } from "./RichText/RichText";

interface BlogPostProps {
  post: Post;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="bg-white px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <figure className="relative aspect-video rounded-xl bg-gray-50 object-cover">
          <Image
            src={post.mainImage?.url || ""}
            alt={post.mainImage?.description || post.title || ""}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </figure>

        {post.date ? (
          <div className="mt-8 mb-4">
            <time
              dateTime={post.date || new Date().toISOString()}
              className="text-base/7 font-semibold text-accent-dark"
            >
              {format(post.date, "d 'de' MMMM yyyy", { locale: es })}
            </time>
          </div>
        ) : null}

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-xl/8">{post.excerpt}</p>

        <div className="mt-10">
          <RichText richtext={post.content} />
        </div>

        <blockquote className="border-slate-300 border-t pt-10 mt-10 text-xl/8 font-semibold tracking-tight text-gray-700 sm:text-xl">
          <p>
            En RyK Abogados, somos especialistas en derecho laboral y estamos
            comprometidos en brindar asesoría tanto a empresas como a
            trabajadores en materia de inclusión laboral y cumplimiento
            normativo. Si tu empresa busca implementar políticas inclusivas o si
            eres un trabajador en situación de discapacidad que requiere
            orientación sobre tus derechos, nuestro equipo está preparado para
            ofrecer soluciones legales efectivas y personalizadas. Contáctanos y
            aprovecha nuestra experiencia para construir un entorno laboral más
            justo, equitativo y ajustado a la normativa vigente.
          </p>
        </blockquote>
      </div>
    </div>
  );
};
