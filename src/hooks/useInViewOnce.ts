"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `onEnter` the first time the element is genuinely on screen.
 *
 * Neither of the repo's existing observers can do this job. `Reveal` uses a
 * 100000px top rootMargin, so "intersecting" there means "has been reached",
 * not "is visible", and it disconnects on the first callback. `useDeferredMount`
 * fires 800px early on purpose, to have a heavy subtree ready before anyone
 * arrives. A "did they ever see the form" signal needs the plain reading.
 *
 * `onEnter` is expected to be stable across renders; the React Compiler
 * memoises inline callbacks in components, so an arrow function at the call
 * site is fine.
 */
export function useInViewOnce<T extends HTMLElement>(
  onEnter: () => void,
  threshold = 0.2
) {
  const ref = useRef<T | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;

    if (!el || fired.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          fired.current = true;
          observer.disconnect();
          onEnter();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [onEnter, threshold]);

  return ref;
}
