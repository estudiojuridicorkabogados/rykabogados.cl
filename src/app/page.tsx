import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

import { AboutSection } from "./_components/AboutSection/AboutSection";
import { BlogSection } from "./_components/BlogSection/BlogSection";
import { HomeHero } from "./_components/HeroSection/HeroSection";
import { PracticeAreasSection } from "./_components/PracticeAreasSection/PracticeAreasSection";
import { TeamSection } from "./_components/TeamSection/TeamSection";
import { TestimonialsSection } from "./_components/Testimonials/TestimonialsSection";

// Revalidate homepage every 24 hours
export const revalidate = 86400;

export default function Home() {
  return (
    <div>
      <HomeHero />

      <AboutSection />

      <PracticeAreasSection />

      <BlogSection />

      <TestimonialsSection />

      <TeamSection />

      <ContactSectionLight />
    </div>
  );
}
