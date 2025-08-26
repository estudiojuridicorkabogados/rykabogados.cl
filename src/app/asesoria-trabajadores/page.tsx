import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

import { AsesoriaTrabajadoresHero } from "./_components/Hero/Hero";
import { TrabajadoresServices } from "./_components/TrabajadoresServices/TrabajadoresServices";

export default function AsesoriaTrabajadores() {
  return (
    <div>
      <AsesoriaTrabajadoresHero />

      <TrabajadoresServices />

      <ContactSectionLight />
    </div>
  );
}
