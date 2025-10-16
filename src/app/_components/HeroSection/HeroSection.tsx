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
      align="top"
      description={DESCRIPTION}
      image={{
        src: "/images/heros/chile-bandera.webp",
        alt: "Columns background",
      }}
    />
  );
};
