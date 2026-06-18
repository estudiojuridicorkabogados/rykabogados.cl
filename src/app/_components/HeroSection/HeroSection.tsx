import sebaCamiHome from "@public/images/heros/seba_cami_home.webp";

import { HeroSection } from "@/components/Hero/HeroSection";

const DESCRIPTION = `
En Retamales Kowalski Abogados creemos que la confianza se gana con resultados, transparencia y cercanía. 
Somos un equipo de abogados con energía, visión y sólida experiencia, comprometidos con una práctica moderna, eficiente y humana del Derecho. 
`;

export const HomeHero = () => {
  return (
    <HeroSection
      label="RK Abogados"
      title={
        <>
          Excelencia, Lealtad <br />e Integridad
        </>
      }
      align="center"
      description={DESCRIPTION}
      image={{
        src: sebaCamiHome,
        alt: "Camila Retamales y Sebastian Kowalski trabajando en el estudio",
      }}
    />
  );
};
