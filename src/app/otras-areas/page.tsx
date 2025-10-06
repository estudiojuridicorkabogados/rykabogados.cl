import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

import { OtraAreasHero } from "./_components/Hero/Hero";
import { OtrasAreasServices } from "./_components/OtrasAreasServices/OtrasAreasServices";

export default function OtraAreas() {
  return (
    <div>
      <OtraAreasHero />

      <OtrasAreasServices />

      <ContactSectionLight />
    </div>
  );
}
