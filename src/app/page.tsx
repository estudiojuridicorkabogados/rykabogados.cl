import { AboutSection } from "./_components/About";
import { ContactUsSection } from "./_components/ContactUs";
import { HeroSection } from "./_components/Hero";
import { Parallax } from "./_components/Parallax";
import { PracticeAreasSection } from "./_components/PracticeAreas";
import { ServicesSection } from "./_components/Services";
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
      <Parallax
        yRange={[0, 1200]}
        scaleRange={[1, 2]}
        style={{
          position: "relative",
          zIndex: 1,
          transformOrigin: "center top",
        }}
      >
        <HeroSection />
      </Parallax>

      <Parallax
        yRange={[0, -250]}
        style={{
          position: "relative",
          zIndex: 2,
          // backgroundColor: "white",
        }}
      >
        <AboutSection />
      </Parallax>

      <PracticeAreasSection />

      <ServicesSection />

      <TestimonialsSection testimonials={homePageData.testimonials} />

      <ContactUsSection />
    </div>
  );
}
