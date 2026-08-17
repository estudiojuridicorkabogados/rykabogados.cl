import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";
import { buildPageMetadata } from "@/lib/seo/site";

import { AboutSection } from "./_components/AboutSection/AboutSection";
import { BlogSection } from "./_components/BlogSection/BlogSection";
import { HomeHero } from "./_components/HeroSection/HeroSection";
import { PracticeAreasSection } from "./_components/PracticeAreasSection/PracticeAreasSection";
import { TeamSection } from "./_components/TeamSection/TeamSection";
import { TestimonialsSection } from "./_components/Testimonials/TestimonialsSection";

// Revalidate homepage every 24 hours
export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "Abogados Laborales en Chile | RK Abogados",
  description:
    "Estudio jurídico especializado en derecho laboral. Defendemos a trabajadores y asesoramos a empresas en todo Chile: despidos, finiquitos, acoso laboral y cumplimiento normativo.",
  path: "/",
  keywords: [
    "abogados laborales chile",
    "abogado laboral santiago",
    "estudio jurídico chile",
    "derecho laboral chile",
    "abogados rk",
  ],
});

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
