import React from "react";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { draftMode } from "next/headers";
import { getAllPosts } from "@/graphql/queries/get-all-posts.query";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const BlogSection = async () => {
  const { isEnabled: isPreview } = await draftMode();

  const { posts } = await getAllPosts({
    limit: 2,
    isPreview,
  });

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-28 bg-gray-50">
      <div className="flex flex-col container mx-auto px-6 max-w-6xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <span className="uppercase text-sm text-accent-dark font-bold tracking-[3px]">
              Nuestro Articulos
            </span>
            <h2 className="text-5xl font-bold mb-8 text-black">Excelencia</h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="text-black  uppercase text-xs font-bold hover:underline"
            >
              Ver mas
            </Link>

            <LongArrowRight className="ml-2 inline-block stroke-black" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          <Link href={`/blog/${posts[0].slug}`} className="w-2/3 flex flex-col">
            <div className="relative w-full lg:h-[360px] aspect-video rounded-lg shadow-[0px_2px_2px_0px_#00000040]">
              <Image
                fill
                src={posts[0].mainImage?.url || "/images/default-image.jpg"}
                alt={posts[0].mainImage?.title || "Blog Post Image"}
                className="object-cover rounded-lg shadow-[0px_2px_2px_0px_#00000040]"
              />
            </div>

            <h3 className="mt-6 text-3xl text-black truncate">
              {posts[0].title}
            </h3>

            {posts[0].date ? (
              <p className="text-black/40">{formatDate(posts[0].date)}</p>
            ) : null}
          </Link>

          <Link href={`/blog/${posts[1].slug}`} className="w-1/3 flex flex-col">
            <div className="relative lg:h-[360px] aspect-square rounded-lg shadow-[0px_2px_2px_0px_#00000040]">
              <Image
                fill
                src={posts[1].mainImage?.url || "/images/default-image.jpg"}
                alt={posts[1].mainImage?.title || "Blog Post Image"}
                className="object-cover rounded-lg shadow-[0px_2px_2px_0px_#00000040]"
              />
            </div>

            <h3 className="mt-6 text-3xl text-black truncate">
              {posts[1].title}
            </h3>

            {posts[1].date ? (
              <p className="text-black/40">{formatDate(posts[1].date)}</p>
            ) : null}
          </Link>
        </div>
      </div>
    </section>
  );
};

function formatDate(date: string): string {
  return format(new Date(date), "dd.MM.yyyy", { locale: es });
}
