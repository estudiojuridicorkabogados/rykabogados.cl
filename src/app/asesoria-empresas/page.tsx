import { EmpresasServices } from "./_components/EmpresasServices/EmpresasServices";
import { AsesoriaEmpresasHero } from "./_components/Hero/Hero";
import { ContactSectionEmpresas } from "@/components/ContactSectionEmpresas/ContactSectionEmpresas";

export default function AsesoriaEmpresas() {
  return (
    <div>
      <AsesoriaEmpresasHero />

      <EmpresasServices />

      <ContactSectionEmpresas />
    </div>
  );
}
