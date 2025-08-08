import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { getAllPosts } from "@/graphql/queries/get-all-posts.query";

import { AnimatedBlogPosts } from "./AnimatedBlogPosts";

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
      <AnimatedBlogPosts mainPost={posts[0]} secondaryPost={posts[1]} />
    </section>
  );
};

function formatDate(date: string): string {
  return format(new Date(date), "dd.MM.yyyy", { locale: es });
}
