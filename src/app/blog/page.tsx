import { getAllPosts } from "@/graphql/queries/get-all-posts.query";
import { BlogPostEntry } from "./_components/BlogPostEntry";
import { draftMode } from "next/headers";

export default async function BlogPage() {
  const { isEnabled: isPreview } = await draftMode();

  const { posts } = await getAllPosts({
    limit: 40,
    isPreview,
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Blog y Noticias
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Mantente al día con las últimas noticias e información de nuestro
            equipo
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostEntry key={post.slug} blogPost={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
