import { draftMode } from "next/headers";

import { getAllPosts } from "@/graphql/queries/get-all-posts.query";

import { BlogPostEntry } from "./_components/BlogPostEntry";
import { HighlightedPost } from "./_components/HighlightedPost";

// Revalidate blog list page every 24 hours
export const revalidate = 86400;

export default async function BlogPage() {
  const { isEnabled: isPreview } = await draftMode();

  const { posts } = await getAllPosts({
    limit: 40,
    isPreview,
  });

  return (
    <div className="px-6 lg:mx-auto lg:max-w-6xl lg:min-w-6xl lg:px-8 2xl:w-7xl 2xl:max-w-7xl 2xl:min-w-7xl">
      <HighlightedPost post={posts[0]} />

      <div className="mx-auto mt-16 grid w-full grid-cols-1 gap-x-10 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:border-t lg:border-black/10 lg:pt-16">
        {posts.slice(1).map((post) => (
          <BlogPostEntry key={post.slug} blogPost={post} />
        ))}
      </div>
    </div>
  );
}
