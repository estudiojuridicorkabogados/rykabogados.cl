import { HeroSection } from "@/components/Hero/HeroSection";

const DESCRIPTION = (
  <>
    En RK Abogados, además de nuestra reconocida práctica en materia laboral,
    contamos con un equipo de profesionales especializados en diversas áreas del
    derecho, lo que nos permite ofrecer una asesoría integral y soluciones
    jurídicas adaptadas a las necesidades de cada cliente.
    <br />
    Nuestro enfoque combina conocimiento técnico y visión estratégica para
    prevenir riesgos, fortalecer la gestión legal y promover decisiones
    informadas.
  </>
);

export const OtraAreasHero = () => {
  return (
    <HeroSection
      label="Nuestros servicios"
      title="Otras Áreas"
      align="center"
      description={DESCRIPTION}
      image={{
        src: "/images/heros/estudio.webp",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
