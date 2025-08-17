import { draftMode } from "next/headers";

import { getAllPosts } from "@/graphql/queries/get-all-posts.query";

import {
  BlogPostEntry,
  BlogPostEntrySkeleton,
} from "./_components/BlogPostEntry";
import { HighlightedPost } from "./_components/HighlightedPost";

export default async function BlogPage() {
  const { isEnabled: isPreview } = await draftMode();

  const { posts } = await getAllPosts({
    limit: 40,
    isPreview,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <HighlightedPost post={posts[0]} />

      <div className="w-full mx-auto mt-32 grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10 lg:mx-0 lg:max-w-none">
        {posts.slice(1).map((post) => (
          <BlogPostEntry key={post.slug} blogPost={post} />
        ))}
      </div>
    </div>
  );
}
