import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

import { Areas } from "./_components/Areas/Areas";
import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Hero } from "./_components/Hero/Hero";
import { OurTeam } from "./_components/OurTeam/OurTeam";
import { Press } from "./_components/Press/Press";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";

export default function HablaConNosotros() {
  return (
    <div>
      <Hero />

      <Areas />

      <Slogan />

      <OurTeam />

      <Videos />

      <Press />

      <ClientsReel />

      <ContactSectionLight />
    </div>
  );
}
