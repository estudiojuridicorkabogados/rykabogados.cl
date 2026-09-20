import { domAnimation } from "motion/react";

/**
 * Re-exported alone, from its own module, so the chunk that
 * `loadMotionFeatures` pulls in holds only this feature set: a dynamic import
 * of `motion/react` itself would carry the whole namespace, `motion` and all.
 *
 * `domAnimation` rather than `domMax` because nothing here uses drag or layout
 * projection — the heaviest APIs in use are `useScroll`/`useTransform` in the
 * parallax and `AnimatePresence` in the testimonials carousel.
 */
export default domAnimation;
