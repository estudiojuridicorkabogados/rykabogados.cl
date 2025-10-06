import { Areas } from "./_components/Areas/Areas";
import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Contact } from "./_components/Contact/Contact";
import { Hero } from "./_components/Hero/Hero";
import { NextSteps } from "./_components/NextSteps/NextSteps";
import { OurTeam } from "./_components/OurTeam/OurTeam";
import { Press } from "./_components/Press/Press";
import { ReservaForm } from "./_components/ReservaForm/ReservaForm";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";

export default function HablaConNosotros() {
  return (
    <div>
      <Hero />

      <ReservaForm />

      <Areas />

      <NextSteps />

      <Slogan />

      <OurTeam />

      <Videos />

      {/* <Press /> */}

      {/* <ClientsReel /> */}

      <Contact />
    </div>
  );
}
