import { Suspense } from "react";

import { OurTeam } from "../_components/OurTeam/OurTeam";

import { Areas } from "./_components/Areas/Areas";
import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Contact } from "./_components/Contact/Contact";
import { Hero } from "./_components/Hero/Hero";
import { NextStepsTrabajadores } from "./_components/NextStepsTrabajadores/NextStepsTrabajadores";
import { Press } from "./_components/Press/Press";
import { ReservaFormTrabajadores } from "./_components/ReservaFormTrabajadores/ReservaFormTrabajadores";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";

export default function HablaConNosotrosTrabajadores() {
  return (
    <>
      <div>
        <Hero />

        <Suspense>
          <ReservaFormTrabajadores />
        </Suspense>

        <Areas />

        <NextStepsTrabajadores />

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
