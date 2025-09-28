"use client";

import React, { useState } from "react";
import { motion, stagger } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

import { Video, VIDEOS } from "./constants";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

export const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleCloseModal = () => setSelectedVideo(null);

  return (
    <>
      <motion.section
        id="videos"
        initial="hidden"
        whileInView="visible"
        className="w-full bg-[#fff3e1] text-white"
        transition={{
          delayChildren: stagger(0.3),
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="py-16 lg:py-28">
          <div className="lg:mx-auto lg:min-w-6xl lg:max-w-6xl 2xl:min-w-7xl 2xl:max-w-7xl 2xl:w-7xl flex flex-col gap-8 px-6 lg:px-0">
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl md:text-5xl font-semibold text-black max-w-[440px] mb-8 lg:mb-12"
            >
              Videos que hemos preparado para ti
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-y-20 lg:gap-x-20">
              {VIDEOS.slice(0, 5).map((video, index) => (
                <VideoCard
                  key={video.id || index}
                  video={video}
                  onPlayVideo={setSelectedVideo}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <VideoModal video={selectedVideo} onClose={handleCloseModal} />
    </>
  );
};
