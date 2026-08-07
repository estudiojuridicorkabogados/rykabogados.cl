import { RandomLineLengthSkeleton } from "./_components/RandomLineLengthSkeleton";

export default function BlogPostPageLoading() {
  return (
    <div className="mx-auto px-6 lg:max-w-6xl lg:px-0 2xl:w-7xl 2xl:max-w-7xl">
      <div className="flex flex-col items-start justify-center gap-8">
        <div className="loading-background-animation h-14 w-full lg:w-xl" />

        <div className="loading-background-animation aspect-square w-full rounded-2xl lg:aspect-auto lg:h-[450px]" />
      </div>

      <div className="mt-8 flex gap-16">
        <div className="flex flex-1 flex-col gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <RandomLineLengthSkeleton key={index} />
          ))}
        </div>

        <div className="loading-background-animation sticky top-12 hidden h-[340px] w-[340px] p-8 lg:block" />
      </div>
    </div>
  );
}
