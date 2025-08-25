import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

import { EmpresasServices } from "./_components/EmpresasServices/EmpresasServices";
import { AsesoriaEmpresasHero } from "./_components/Hero/Hero";

export default function AsesoriaEmpresas() {
  return (
    <div>
      <AsesoriaEmpresasHero />

      <EmpresasServices />

      <ContactSectionLight />
    </div>
  );
}
