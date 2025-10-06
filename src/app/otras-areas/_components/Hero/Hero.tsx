import { HeroSection } from "@/components/Hero/HeroSection";

export const OtraAreasHero = () => {
  return (
    <HeroSection
      label="Nuestros servicios"
      title="Otras Áreas"
      align="center"
      description={`Derecho Civil, Societario y Familia. Además de nuestra especialización en derecho laboral, en RK Abogados prestamos asesoría en procesos de divorcio y materias de familia, resolución de conflictos civiles, redacción de contratos, constitución de sociedades y reestructuraciones empresariales. Nuestra práctica combina una mirada estratégica y humana, buscando soluciones jurídicas eficientes y sostenibles.`}
      image={{
        src: "/images/heros/studio-working.jpg",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
