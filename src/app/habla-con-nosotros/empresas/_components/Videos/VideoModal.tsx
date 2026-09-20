"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

import { XIcon } from "@/components/icons/X";

import { Video } from "./constants";

interface VideoModalProps {
  video: Video | null;

  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  return (
    <AnimatePresence>
      {video && (
        <Dialog.Root open={!!video} onOpenChange={onClose}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/80"
                onClick={onClose}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed top-1/2 left-1/2 z-50 mx-4 aspect-[9/16] h-5/6 max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4">
                  <Dialog.Title className="font-semibold text-black">
                    {video.title}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
                      aria-label="Cerrar modal"
                      onClick={onClose}
                    >
                      <XIcon className="h-4 w-4 text-black" />
                    </button>
                  </Dialog.Close>
                </div>

                <iframe
                  src={getEmbedUrl(video.videoUrl)}
                  title={video.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
};

const getEmbedUrl = (url: string, autoplay: boolean = true): string => {
  const autoplayParam = autoplay ? "?autoplay=1&mute=0" : "";

  // Handle YouTube Shorts URLs
  if (url.includes("youtube.com/shorts/")) {
    const videoId = url.split("/shorts/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}${autoplayParam}`;
  }

  // Handle regular YouTube URLs
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}${autoplayParam}`;
  }

  // Handle youtu.be URLs
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}${autoplayParam}`;
  }

  // If already an embed URL or other format, return as is
  return url;
};
