import { HeroSection } from "@/components/Hero/HeroSection";

const DESCRIPTION = `
En RK Abogados ofrecemos asesoría integral en materias civiles, comerciales y societarias, entregando soluciones jurídicas adaptadas a las necesidades de cada cliente. Nuestro equipo también desarrolla capacitaciones legales orientadas a empresas y personas naturales, promoviendo el conocimiento y la prevención de riesgos. Actuamos con una mirada estratégica y práctica, enfocada en resultados sostenibles y en fortalecer la gestión legal de quienes confían en nosotros.`;

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
