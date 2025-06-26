import { Navbar } from "./_components/Navbar";
import { HeroSection } from "./_components/Hero";
import { AboutSection } from "./_components/About";
import { PracticeAreasSection } from "./_components/PracticeAreas";
import { ServicesSection } from "./_components/Services";
import { TestimonialsSection } from "./_components/Testimonials";
import { ContactUsSection } from "./_components/ContactUs";

export default function Home() {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <AboutSection />

      <PracticeAreasSection />

      <ServicesSection />

      <TestimonialsSection />

      <ContactUsSection />
    </div>
  );
}
