"use client";

interface HeroVideoProps {
  videoId: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ videoId }) => {
  return (
    <section id="hero-video-section" className="w-full h-[80vh]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&controls=0&iv_load_policy=3&start=1`}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </section>
  );
};
