
import { HeroSection } from "@/components/Hero/HeroSection";

export const AsesoriaEmpresasHero = () => {
  return (
    <HeroSection
      label="Nuestro servicios"
      title="Asesoría Empresas"
      description={` Ofrecemos asesoría jurídica de alta calidad con profesionalismo y 
        compromiso. Brindamos respaldo integral en procesos jurídicos 
        empresariales con trato confidencial y personalizado, manteniendo 
        comunicación directa y adaptando nuestro servicio al perfil de su Compañía.`}
      image={{
        src: "/images/hero-studio-working.jpg",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
