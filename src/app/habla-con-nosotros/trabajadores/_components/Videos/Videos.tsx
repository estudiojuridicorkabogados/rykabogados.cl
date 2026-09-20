"use client";

import { useState } from "react";
import { stagger } from "motion/react";
import * as m from "motion/react-m";

import { itemVariants } from "@/lib/utils/animations";

import { Video, VIDEOS } from "./constants";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

export const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleCloseModal = () => setSelectedVideo(null);

  return (
    <>
      <m.section
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
          <div className="section-container flex flex-col gap-8 px-6 lg:px-0">
            <m.h2
              variants={itemVariants}
              className="mb-8 max-w-[440px] text-3xl font-semibold text-black md:text-5xl lg:mb-12 lg:text-4xl"
            >
              Videos que hemos preparado para ti
            </m.h2>

            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-x-20 lg:gap-y-20 xl:grid-cols-3">
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
      </m.section>

      <VideoModal video={selectedVideo} onClose={handleCloseModal} />
    </>
  );
};
