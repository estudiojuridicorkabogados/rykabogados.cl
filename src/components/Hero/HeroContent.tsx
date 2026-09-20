import { Button } from "../ui/Button";

interface HeroContentProps {
  label: string;
  title: React.ReactElement | string;
  description: React.ReactElement | string;
  button?: {
    label: string;
    href: string;
  };
}

/**
 * Server component. This used to be a motion client component whose children
 * were served with `style="opacity:0"` and only became visible after
 * hydration — invisible copy above the fold, and an <h1> permanently
 * disqualified as an LCP candidate. The entrance is now a CSS animation that
 * runs at first paint. See docs/lcp-performance-plan.md.
 */
export const HeroContent: React.FC<HeroContentProps> = ({
  label,
  title,
  description,
  button,
}) => {
  return (
    <div className="relative z-10 mx-auto flex flex-col px-6 lg:w-6xl lg:max-w-6xl 2xl:w-7xl 2xl:max-w-7xl">
      <span className="hero-enter hero-title text-accent mb-2 text-xs font-bold tracking-[3px] uppercase lg:mb-4 lg:text-sm">
        {label}
      </span>

      <h1
        className="hero-enter hero-title text-gray-60 mb-4 text-5xl lg:mb-6 lg:max-w-3xl lg:text-7xl"
        style={{ "--hero-i": 1 } as React.CSSProperties}
      >
        {title}
      </h1>

      <p
        className="hero-enter hero-description font-base tracking-wide text-white/90 lg:max-w-2xl lg:text-lg"
        style={{ "--hero-i": 2 } as React.CSSProperties}
      >
        {description}
      </p>

      {button && (
        <div
          className="hero-enter mt-8 flex flex-col gap-4 md:flex-row"
          style={{ "--hero-i": 3 } as React.CSSProperties}
        >
          <Button variant="white-outline-on-primary" asChild>
            <a href={button.href}>{button.label}</a>
          </Button>
        </div>
      )}
    </div>
  );
};
