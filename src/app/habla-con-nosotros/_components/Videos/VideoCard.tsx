"use client";

import React from "react";
import { motion } from "motion/react";
import { itemVariants } from "@/lib/utils/animations";
import { Video } from "./constants";

interface VideoCardProps {
  video: Video;
  onPlayVideo: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlayVideo,
}) => {
  return (
    <motion.div variants={itemVariants} className="relative w-full aspect-square rounded-lg p-4">
      <h3 className="text-2xl text-black mb-4">{video.title}</h3>

      <p className="text-black mb-6">{video.description}</p>

      <motion.button
        className="w-full group flex items-center gap-3 text-black cursor-pointer transition-all border border-black border-solid rounded-full px-2 py-2 hover:bg-black hover:text-[#fff3e1]"
        initial={false}
        whileTap={{ scale: 1.1 }}
        onClick={() => onPlayVideo(video)}
      >
        <div className="w-[30px] h-[30px] bg-accent rounded-full flex items-center justify-center">
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
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0L12 7L0 14V0Z" fill="black" />
  </svg>
);
