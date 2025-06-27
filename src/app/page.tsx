import { AboutSection } from "./_components/About";
import { ContactUsSection } from "./_components/ContactUs";
import { HeroSection } from "./_components/Hero";
import { PracticeAreasSection } from "./_components/PracticeAreas";
import { ServicesSection } from "./_components/Services";
import { TestimonialsSection } from "./_components/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <AboutSection />

      <PracticeAreasSection />

      <ServicesSection />

      <TestimonialsSection />

      <ContactUsSection />
    </div>
  );
}
