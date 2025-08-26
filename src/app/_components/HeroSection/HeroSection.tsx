import { HeroSection } from "@/components/Hero/HeroSection";

export const HomeHero = () => {
  return (
    <HeroSection
      label="RyK Abogados"
      title={
        <>
          Excelencia, Lealtad <br />y Integridad
        </>
      }
      description={`Retamales y Kowalski Abogados es un estudio jurídico que ofrece sus
        servicios a lo largo de todo Chile, conformado por un equipo de abogados
        especializados.`}
      image={{
        src: "/images/hero-library.webp",
        alt: "Library background",
      }}
    />
  );
};
