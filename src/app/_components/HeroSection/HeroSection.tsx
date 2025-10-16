import { HeroSection } from "@/components/Hero/HeroSection";

// const DESCRIPTION = `
// En Retamales Kowalski Abogados creemos que la confianza se gana con resultados, transparencia y cercanía. 
// Somos un equipo de abogados con energía, visión y sólida experiencia, comprometidos con una práctica moderna, eficiente y humana del Derecho. 
// Nuestro estudio ofrece soluciones jurídicas personalizadas a empresas y personas naturales a lo largo de todo Chile. Nuestra práctica se guía por tres valores esenciales: excelencia en el servicio, lealtad hacia el cliente e integridad en cada acción.
// `;

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
