"use client";

import React from "react";
import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

import { Video } from "./constants";

interface VideoCardProps {
  video: Video;
  onPlayVideo: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlayVideo }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex w-full flex-col justify-between gap-6"
    >
      <div>
        <h3 className="mb-2 text-2xl text-black">{video.title}</h3>

        <p className="text-black">{video.description}</p>
      </div>

      <motion.button
        className="group border-primary hover:bg-primary hover:text-accent flex w-full cursor-pointer items-center gap-3 rounded-full border border-solid px-2 py-2 text-black transition-all"
        initial={false}
        whileTap={{ scale: 1.1 }}
        onClick={() => onPlayVideo(video)}
      >
        <div className="bg-accent flex h-[30px] w-[30px] items-center justify-center rounded-full">
          <PlayIcon />
        </div>
        Reproducir video
      </motion.button>
    </motion.div>
  );
};

const PlayIcon = () => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    className="fill-primary ml-1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0L12 7L0 14V0Z" />
  </svg>
);
