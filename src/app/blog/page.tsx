import { draftMode } from "next/headers";

import { getAllPosts } from "@/graphql/queries/get-all-posts.query";

import { AnimatedTitle } from "./_components/AnimatedTitle";
import { BlogPostEntry } from "./_components/BlogPostEntry";
import { MotionWrapper } from "./_components/MotionWrapper";

export default async function BlogPage() {
  const { isEnabled: isPreview } = await draftMode();

  const { posts } = await getAllPosts({
    limit: 40,
    isPreview,
  });
  

  return (
    <div className="bg-white">
      <MotionWrapper>
        <AnimatedTitle />

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostEntry key={post.slug} blogPost={post} />
          ))}
        </div>
      </MotionWrapper>
    </div>
  );
}
