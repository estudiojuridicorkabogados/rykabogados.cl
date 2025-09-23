import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

import { Areas } from "./_components/Areas/Areas";
import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Hero } from "./_components/Hero/Hero";
import { OurTeam } from "./_components/OurTeam/OurTeam";
import { Press } from "./_components/Press/Press";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";
import { ReservaForm } from "./_components/ReservaForm/ReservaForm";

export default function HablaConNosotros() {
  return (
    <div>
      <Hero />

      <ReservaForm />

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
