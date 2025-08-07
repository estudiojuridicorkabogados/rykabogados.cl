import { LongArrowRight } from "@/components/icons/LongArrowRight";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const BlogSection = () => {
  return (
    <section className="py-20 bg-gray-50">
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
          <div className="w-2/3 flex flex-col">
            <div className="relative w-full aspect-video rounded-xl shadow-[0px_4px_24px_0px_#00000040]">
              <Image
                src="/images/documents.webp"
                alt="Some documents"
                fill
                className="object-cover rounded-xl shadow-[0px_4px_24px_0px_#00000040]"
              />
            </div>

            <h3 className="mt-2 text-2xl text-black truncate">
              ¿Qué es la semana corrida y como se paga?
            </h3>
            <p className="text-black/40">Camila Retamales | 23.04.21</p>
          </div>

          <div className="w-1/3 flex flex-col">
            <div className="relative h-full aspect-square rounded-xl shadow-[0px_4px_24px_0px_#00000040]">
              <Image
                src="/images/documents.webp"
                alt="Some documents"
                fill
                className="object-cover rounded-xl shadow-[0px_4px_24px_0px_#00000040]"
              />
            </div>

            <h3 className="mt-2 text-2xl text-black truncate">
              ¿Qué es la semana corrida y como se paga?
            </h3>
            <p className="text-black/40">Camila Retamales | 23.04.21</p>
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Blog Post Title</h3>
            <p className="text-gray-700 mb-4">
              A brief description of the blog post content goes here.
            </p>
            <Link
              href="/blog/post-slug"
              className="text-accent-dark hover:underline"
            >
              Read more
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};
