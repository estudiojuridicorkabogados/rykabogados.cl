import { HeroSection } from "@/components/Hero/HeroSection";
import { URLS } from "@/lib/utils/constants";

const DESCRIPTION = `
En RK Abogados brindamos una asesoría laboral integral enfocada en la prevención, la gestión estratégica y la resolución eficiente de conflictos. Apoyamos a las organizaciones en la correcta aplicación de la normativa laboral, la elaboración de políticas internas y la construcción de relaciones laborales sólidas y sostenibles.
Nuestro compromiso es fortalecer la seguridad jurídica y la gestión del talento dentro de cada empresa, impulsando un entorno laboral estable, transparente y orientado al crecimiento.
`;

export const AsesoriaEmpresasHero = () => {
  return (
    <HeroSection
      label="Nuestros servicios"
      title="Asesoría Empresas"
      align="top"
      description={DESCRIPTION}
      button={{
        label: "Agenda una asesoría",
        href: URLS.speakWithUsEmpresas(),
      }}
      image={{
        src: "/images/heros/colonas.webp",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
