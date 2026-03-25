"use client";

import { useState } from "react";

import { classNames } from "@/lib/utils/classNames";

const POSSIBLE_LENGTHS = ["w-full", "w-3/4", "w-11/12", "w-2/3"];

export const RandomLineLengthSkeleton = () => {
  const [randomLength] = useState(
    () => POSSIBLE_LENGTHS[Math.floor(Math.random() * POSSIBLE_LENGTHS.length)]
  );

  return (
    <div
      className={classNames("loading-background-animation h-6", randomLength)}
    />
  );
};
