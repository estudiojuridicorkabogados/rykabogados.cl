import { Testimonial } from "./types";

/**
 * Static first slide, shown while the interactive carousel chunk loads. Same
 * box as the real thing so swapping it in causes no layout shift.
 */
export const TestimonialsCarouselFallback: React.FC<{
  title: string;
  testimonial: Testimonial;
}> = ({ title, testimonial }) => (
  <div className="relative flex h-full w-full flex-col justify-between rounded-2xl px-6 py-6 lg:w-4xl lg:max-w-4xl">
    <div className="relative overflow-hidden">
      <div className="mb-4 text-xs font-bold tracking-[3px] text-white uppercase lg:text-sm">
        {title}
      </div>

      <div className="relative w-full">
        <p className="line-clamp-5 pb-8 text-2xl font-medium lg:text-2xl">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </div>

    <div className="mt-2 flex w-full items-center justify-between">
      <span className="font-light italic">{testimonial.name}</span>
    </div>
  </div>
);
