import { BlogPostEntrySkeleton } from "./_components/BlogPostEntry";

export default function BlogPageLoading() {
  return (
    <div className="flex flex-col gap-8 px-6 lg:mx-auto lg:max-w-6xl lg:min-w-6xl lg:px-8 2xl:w-7xl 2xl:max-w-7xl">
      <div className="flex flex-col items-start justify-center gap-8">
        <div className="loading-background-animation h-14 w-full lg:w-xl" />

        <div className="loading-background-animation aspect-square w-full rounded-2xl lg:aspect-auto lg:h-[450px]" />
      </div>

      <div className="mx-auto mt-8 grid w-full grid-cols-1 gap-x-10 gap-y-10 lg:mx-0 lg:mt-32 lg:max-w-none lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogPostEntrySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
