import { classNames } from "@/lib/utils/classNames";

export default function BlogPostPageLoading() {
  return (
    <div className="px-6 lg:px-8">
      <div className="mx-auto max-w-3xl flex flex-col">
        <div className="w-full aspect-video rounded-xl loading-background-animation" />

        <div className="mt-8 mb-4 loading-background-animation h-4 w-20" />

        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <RandomLineLengthSkeleton key={index} />
          ))}
        </div>
        <div className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl" />

        <div className="mt-6 text-xl/8" />
      </div>
    </div>
  );
}

const POSSIBLE_LENGTHS = ["w-full", "w-3/4", "w-11/12", "w-2/3"];

const RandomLineLengthSkeleton = () => {
  const randomIndex = Math.floor(Math.random() * 4);
  const randomLength = POSSIBLE_LENGTHS[randomIndex];

  return (
    <div
      className={classNames("loading-background-animation h-12", randomLength)}
    />
  );
};
