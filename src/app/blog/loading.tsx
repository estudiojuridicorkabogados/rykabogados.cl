import { BlogPostEntrySkeleton } from "./_components/BlogPostEntry";

export default function BlogPageLoading() {
  return (
    <div className="mx-auto w-11/12 lg:max-w-7xl px-2 lg:px-8">
      <div className="mx-auto flex flex-col items-center justify-center gap-4">
        <div className="loading-background-animation h-14 w-full lg:w-xl" />

        <div className="loading-background-animation h-6 w-full lg:w-2xl" />
      </div>

      <div className="mx-auto mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogPostEntrySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
