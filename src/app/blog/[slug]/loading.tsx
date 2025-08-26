import { classNames } from "@/lib/utils/classNames";

export default function BlogPostPageLoading() {
  return (
    <div className="mx-auto lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl px-6 lg:px-0">
      <div className="flex flex-col items-start justify-center gap-8">
        <div className="loading-background-animation h-14 w-full lg:w-xl" />

        <div className="loading-background-animation w-full aspect-square lg:aspect-auto lg:h-[450px] rounded-2xl" />
      </div>

      <div className="flex gap-16 mt-8">
        <div className="flex-1 flex flex-col gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <RandomLineLengthSkeleton key={index} />
          ))}
        </div>

        <div className="hidden lg:block loading-background-animation p-8 w-[340px] h-[340px] sticky top-12" />
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
      className={classNames("loading-background-animation h-6", randomLength)}
    />
  );
};
