import { BlogPostEntrySkeleton } from "./_components/BlogPostEntry";

export default function BlogPageLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl flex flex-col items-center justify-center gap-4">
        <div className="loading-background-animation h-14 w-xl" />

        <div className="loading-background-animation h-6 w-2xl" />
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogPostEntrySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
