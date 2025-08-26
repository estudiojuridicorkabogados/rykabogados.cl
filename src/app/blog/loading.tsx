import { BlogPostEntrySkeleton } from "./_components/BlogPostEntry";

export default function BlogPageLoading() {
  return (
    <div className="lg:mx-auto lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl px-6 lg:px-8 flex flex-col gap-8">
      <div className="flex flex-col items-start justify-center gap-8">
        <div className="loading-background-animation h-14 w-full lg:w-xl" />

        <div className="loading-background-animation w-full aspect-square lg:aspect-auto lg:h-[450px] rounded-2xl" />
      </div>

      <div className="w-full mx-auto mt-8 lg:mt-32 grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10 lg:mx-0 lg:max-w-none">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogPostEntrySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
