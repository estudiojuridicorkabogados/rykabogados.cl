/**
 * Loaded through `LazyMotion`'s `features` callback rather than imported
 * statically, so the animation runtime becomes a separate chunk fetched after
 * hydration instead of part of every page's initial bundle.
 * See docs/lcp-performance-plan.md.
 */
export const loadMotionFeatures = () =>
  import("./motionFeatures").then((mod) => mod.default);
