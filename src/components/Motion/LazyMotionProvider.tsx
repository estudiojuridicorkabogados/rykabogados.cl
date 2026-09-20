"use client";

import { LazyMotion } from "motion/react";

import { loadMotionFeatures } from "./loadMotionFeatures";

/**
 * Mounted once in the root layout so every `m.*` element below it shares one
 * lazily fetched `domAnimation` feature set.
 *
 * Components must import `* as m from "motion/react-m"` — never `motion`, and
 * never `m` from `motion/react`: the index's `m` proxy drags the full runtime
 * into every chunk that touches it, which silently defeats the split.
 * `strict` makes a stray `motion.*` element throw in development.
 */
export const LazyMotionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <LazyMotion features={loadMotionFeatures} strict>
    {children}
  </LazyMotion>
);
