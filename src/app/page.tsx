import { AboutSection } from "./_components/About";
import { ContactUsSection } from "./_components/ContactUs";
import { HeroSection } from "./_components/Hero";
import { Parallax } from "./_components/Parallax";
import { PracticeAreasSection } from "./_components/PracticeAreas";
import { ServicesSection } from "./_components/Services";
import { TestimonialsSection } from "./_components/Testimonials";

export default function Home() {
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

      <TestimonialsSection />

      <ContactUsSection />
    </div>
  );
}
