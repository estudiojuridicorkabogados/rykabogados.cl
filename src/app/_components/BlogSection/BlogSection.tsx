import { draftMode } from "next/headers";

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
    <section className="py-16 lg:py-24 bg-gray-50">
      <AnimatedBlogPosts mainPost={posts[0]} secondaryPost={posts[1]} />
    </section>
  );
};
