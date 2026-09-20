import { es } from "date-fns/locale";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/Reveal/Reveal";
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
    <article className="flex w-full flex-col">
      <Reveal
        immediate={priority}
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
      </Reveal>

      <div className="w-full lg:max-w-xl">
        <Reveal
          immediate={priority}
          index={1}
          className="mt-4 flex items-center gap-x-2 text-sm lg:text-base"
        >
          <span className="text-black/60">{blogPost.author?.name}</span>

          <span className="text-accent-dark">|</span>

          {blogPost.date ? (
            <time dateTime={blogPost.date} className="text-black/40">
              {formatSantiago(blogPost.date, "dd.MM.yyyy", { locale: es })}
            </time>
          ) : null}
        </Reveal>

        <div className="group relative">
          <Reveal
            as="h3"
            immediate={priority}
            index={2}
            className="mt-1 font-sans! text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 lg:mt-2"
          >
            <Link href={(blogPost.href || "#") as Route}>
              <span className="absolute inset-0" />
              {blogPost.title}
            </Link>
          </Reveal>
          <Reveal
            as="p"
            immediate={priority}
            index={3}
            className="mt-1 line-clamp-2 text-sm/6 leading-5 text-gray-600 lg:mt-3"
          >
            {blogPost.excerpt}
          </Reveal>
        </div>
      </div>
    </article>
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
