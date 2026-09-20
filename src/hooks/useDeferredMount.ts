"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Defers mounting a heavy subtree until either the user is approaching it or
 * the main thread goes quiet — whichever happens first.
 *
 * Intersection alone is wrong for a conversion element: the booking form sits
 * directly under the hero, so waiting for a scroll would make the first
 * interaction feel slow. Idle alone is wrong too, on a busy page it may never
 * fire before the user arrives. Racing the two keeps the bundle off the
 * critical path the hero image competes for, while still having the form ready
 * by the time anyone reaches it. See docs/lcp-performance-plan.md.
 */
export function useDeferredMount<T extends HTMLElement>(
  rootMargin = "800px 0px"
) {
  const ref = useRef<T | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let cancelled = false;
    const done = () => {
      if (!cancelled) setReady(true);
    };

    let observer: IntersectionObserver | undefined;
    const el = ref.current;

    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) done();
        },
        { rootMargin }
      );
      observer.observe(el);
    }

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(done, { timeout: 2500 })
        : window.setTimeout(done, 1200);

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle as number);
      } else {
        clearTimeout(idle as number);
      }
    };
  }, [ready, rootMargin]);

  return { ref, ready };
}
