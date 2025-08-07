import { AboutSection } from "./_components/AboutSection/AboutSection";
import { BlogSection } from "./_components/BlogSection/BlogSection";
import { ContactSection } from "./_components/ContactSection/ContactSection";
import { HeroSection } from "./_components/HeroSection/HeroSection";
import { PracticeAreasSection } from "./_components/PracticeAreasSection/PracticeAreasSection";
import { TeamSection } from "./_components/TeamSection/TeamSection";
import { TestimonialsSection } from "./_components/Testimonials/TestimonialsSection";

// This funtion could be used to fetch data from Contentful
async function fetchHomePageData() {
  const testimonials = [
    {
      quote:
        "Excelente atención y profesionalismo. Me ayudaron a resolver mi caso de despido injustificado de manera efectiva.",
      name: "María Carmen Rodríguez",
      role: "Trabajadora",
    },
    {
      quote:
        "Como empresa, necesitábamos asesoría legal confiable. RyK Abogados nos ha acompañado en nuestro crecimiento.",
      name: "Jorge Silva",
      role: "CEO, TechStart",
    },
    {
      quote:
        "Profesionales de primer nivel. Lograron un resultado mejor del que esperaba en mi caso complejo.",
      name: "Ana Patricia Morales",
      role: "Empresaria",
    },
  ];

  return {
    testimonials,
  };
}

export default async function Home() {
  const homePageData = await fetchHomePageData();

  return (
    <div style={{ overflow: "hidden" }}>
      <HeroSection />

      <AboutSection />

      <PracticeAreasSection />

      <BlogSection />

      <TestimonialsSection testimonials={homePageData.testimonials} />

      <TeamSection />

      <ContactSection />
    </div>
  );
}
