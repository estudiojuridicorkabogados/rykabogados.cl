import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

import { NosostrosHero } from "./_components/Hero/Hero";
import { TeamGrid } from "./_components/TeamGrid/TeamGrid";

export default function NosotrosPage() {
  return (
    <div>
      <NosostrosHero />

      <TeamGrid />

      <ContactSectionLight />
    </div>
  );
}
