"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { onceOnThisPage, ScrollDepth, trackEvent } from "@/lib/utils/analytics";

const DEPTHS: readonly ScrollDepth[] = [25, 50, 75, 100];

/**
 * Measures how far down one page the visitor got, and sends `rk_scroll` at 25,
 * 50, 75 and 100 percent, once each.
 *
 * The marks belong to a single page, so this is remounted per route rather than
 * re-running an effect: a navigation has to start from nothing, or the second
 * page inherits the first page's marks and the report says nobody ever scrolls
 * past the top. Remounting is React's own way of saying "this state is scoped
 * to that value", and it keeps the effect below honestly dependency-free.
 */
const ScrollDepthListener = () => {
  useEffect(() => {
    const reached = new Set<ScrollDepth>();
    let frame = 0;

    const measure = () => {
      frame = 0;

      const doc = document.documentElement;
      const viewport = window.innerHeight;
      const scrollable = doc.scrollHeight - viewport;

      const percent =
        scrollable <= 0
          ? 100
          : ((window.scrollY + viewport) / doc.scrollHeight) * 100;

      for (const depth of DEPTHS) {
        // Half a percent of slack: a page scrolled to the very bottom lands a
        // fraction short of 100 on fractional-pixel devices.
        if (percent + 0.5 < depth) continue;

        // The fired-marks record is page-scoped rather than effect-scoped, so
        // a remount — Strict Mode in development, or any future change that
        // makes this subtree re-render — cannot report the same mark twice.
        // `reached` below is only the local bookkeeping for when to stop
        // listening.
        if (onceOnThisPage(`scroll:${depth}`)) {
          trackEvent("rk_scroll", { percent_scrolled: depth });
        }

        reached.add(depth);
      }

      if (reached.size === DEPTHS.length) {
        cleanup();
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    function cleanup() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Measure on arrival too: a short page and a restored scroll position both
    // cross no threshold afterwards. Wait for load when images are still
    // arriving, or the page is briefly short enough to read as fully scrolled.
    if (document.readyState === "complete") {
      measure();
    } else {
      window.addEventListener("load", measure, { once: true });
    }

    return cleanup;
  }, []);

  return null;
};

/**
 * Analytics' own scroll event fires at 90% and cannot be moved, which on a
 * landing page is the difference between "read the first screen and left" and
 * "reached the form" — both below 90, both indistinguishable. Hence our own
 * marks.
 *
 * On a page that fits on screen all four fire at once, which is true but
 * uninformative: read scroll depth on the long pages and ignore it on
 * /contacto and /faqs. See docs/tracking-plan.md, phase 2.
 */
export const ScrollDepthTracker = () => {
  const pathname = usePathname();

  return <ScrollDepthListener key={pathname} />;
};
