import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";
import { buildPageMetadata } from "@/lib/seo/site";

import { NosostrosHero } from "./_components/Hero/Hero";
import { TeamGrid } from "./_components/TeamGrid/TeamGrid";

export const metadata = buildPageMetadata({
  title: "Nosotros | Equipo de abogados de RK Abogados",
  description:
    "Conoce al equipo de RK Abogados: socios, abogados y procuradores especializados en derecho laboral, corporativo y civil, con presencia en todo Chile.",
  path: "/nosotros",
  keywords: [
    "equipo rk abogados",
    "abogados laborales santiago",
    "estudio jurídico providencia",
    "socios rk abogados",
  ],
  image: {
    url: "/images/team.webp",
    width: 1200,
    height: 630,
    alt: "Equipo de abogados de RK Abogados",
  },
});

export default function NosotrosPage() {
  return (
    <div>
      <NosostrosHero />

      <TeamGrid />

      <ContactSectionLight />
    </div>
  );
}
