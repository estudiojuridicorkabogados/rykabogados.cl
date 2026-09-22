"use client";

import { RefObject, useEffect, useRef } from "react";

/**
 * Calls `onEnter` the first time the element is genuinely on screen.
 *
 * Neither of the repo's existing observers can do this job. `Reveal` uses a
 * 100000px top rootMargin, so "intersecting" there means "has been reached",
 * not "is visible", and it disconnects on the first callback.
 * `useDeferredMount` fires 800px early on purpose, to have a heavy subtree
 * ready before anyone arrives. A "did they ever actually see the form" signal
 * needs the plain reading.
 *
 * Takes the ref rather than creating one, so it can share an element with
 * another hook — the booking forms already hang `useDeferredMount` off the
 * div that wraps the form, and that is the same element this wants to watch.
 *
 * `onEnter` is expected to be stable across renders; the React Compiler
 * memoises inline callbacks in components, so an arrow function at the call
 * site is fine.
 */
export function useInViewOnce<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onEnter: () => void,
  threshold = 0.2
) {
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
  }, [ref, onEnter, threshold]);
}
