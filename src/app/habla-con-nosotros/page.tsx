import { ContactSection } from "@/components/ContactSection/ContactSection";

import { Areas } from "./_components/Areas/Areas";
import { Hero } from "./_components/Hero/Hero";
import { OurTeam } from "./_components/OurTeam/OurTeam";
import { Press } from "./_components/Press/Press";
import { Slogan } from "./_components/Slogan/Slogan";

export default function HablaConNosotros() {
  return (
    <div>
      <Hero />

      <Areas />

      <Slogan />

      <OurTeam />

      <Press />

      <ContactSection />
    </div>
  );
}
