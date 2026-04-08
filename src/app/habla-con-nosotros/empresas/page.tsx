import { Suspense } from "react";

import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Contact } from "./_components/Contact/Contact";
import { Hero } from "./_components/Hero/Hero";
import { OurTeam } from "./_components/OurTeam/OurTeam";
import { Press } from "./_components/Press/Press";
import { Pricing } from "./_components/Pricing/Pricing";
import { ReservaFormEmpresas } from "./_components/ReservaFormEmpresas/ReservaFormEmpresas";
import { Services } from "./_components/Services/Services";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";

export default function HablaConNosotrosEmpresas() {
  return (
    <>
      <div>
        <Hero />

        <Services />

        <Suspense>
          <ReservaFormEmpresas />
        </Suspense>

        <Pricing />

        <Slogan />

        <OurTeam />

        <Videos />

        <Press />

        <Contact />

        <ClientsReel />
      </div>

      <style>
        {`     
          .grecaptcha-badge {
            visibility: visible;
            bottom: 90px !important;
            z-index: 100;
          }`}
      </style>
    </>
  );
}
