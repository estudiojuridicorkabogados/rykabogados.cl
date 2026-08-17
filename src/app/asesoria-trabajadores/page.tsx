import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";
import { buildPageMetadata } from "@/lib/seo/site";

import { AsesoriaTrabajadoresHero } from "./_components/Hero/Hero";
import { TrabajadoresServices } from "./_components/TrabajadoresServices/TrabajadoresServices";

export const metadata = buildPageMetadata({
  title: "Asesoría Legal para Trabajadores | RK Abogados",
  description:
    "Despido injustificado, tutela laboral, autodespido, cobro de prestaciones y accidentes del trabajo. Abogados laborales que defienden a trabajadores en todo Chile.",
  path: "/asesoria-trabajadores",
  keywords: [
    "abogado despido injustificado",
    "tutela laboral chile",
    "despido indirecto autodespido",
    "cobro de prestaciones laborales",
    "accidente del trabajo abogado",
  ],
});

export default function AsesoriaTrabajadores() {
  return (
    <div>
      <AsesoriaTrabajadoresHero />

      <TrabajadoresServices />

      <ContactSectionLight />
    </div>
  );
}
