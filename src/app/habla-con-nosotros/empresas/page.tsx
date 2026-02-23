import { Suspense } from "react";

import { Areas } from "./_components/Areas/Areas";
import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Contact } from "./_components/Contact/Contact";
import { Hero } from "./_components/Hero/Hero";
import { NextStepsEmpresas } from "./_components/NextStepsEmpresas/NextStepsEmpresas";
import { OurTeam } from "./_components/OurTeam/OurTeam";
import { Press } from "./_components/Press/Press";
import { ReservaFormEmpresas } from "./_components/ReservaFormEmpresas/ReservaFormEmpresas";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";

export default function HablaConNosotrosEmpresas() {
  return (
    <>
      <div>
        <Hero />

        <Suspense>
          <ReservaFormEmpresas />
        </Suspense>

        <Areas />

        <NextStepsEmpresas />

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
