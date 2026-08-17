import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";
import { buildPageMetadata } from "@/lib/seo/site";

import { OtraAreasHero } from "./_components/Hero/Hero";
import { OtrasAreasServices } from "./_components/OtrasAreasServices/OtrasAreasServices";

export const metadata = buildPageMetadata({
  title: "Otras Áreas del Derecho | RK Abogados",
  description:
    "Más allá del derecho laboral: asesoría corporativa, comercial, civil, de familia, propiedad intelectual, tributaria y compliance para personas y empresas en todo Chile.",
  path: "/otras-areas",
  keywords: [
    "abogado corporativo chile",
    "abogado civil santiago",
    "abogado de familia chile",
    "propiedad intelectual chile",
    "compliance empresas chile",
    "abogado tributario chile",
  ],
});

export default function OtraAreas() {
  return (
    <div>
      <OtraAreasHero />

      <OtrasAreasServices />

      <ContactSectionLight />
    </div>
  );
}
