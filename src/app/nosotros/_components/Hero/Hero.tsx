import { HeroSection } from "@/components/Hero/HeroSection";

export const NosostrosHero = () => {
  return (
    <HeroSection
      label="Encuentra el equipo"
      title="Nosotros"
      description={`En RYK Abogados contamos con un equipo excepcional de profesionales especializados en Derecho Laboral, comprometidos con brindar asesoría integral y de excelencia a empresas. Nuestros abogados combinan amplia experiencia, conocimiento actualizado de la normativa laboral y un enfoque estratégico para proteger los intereses de nuestros clientes, garantizando soluciones efectivas en todas las áreas del derecho del trabajo.`}
      image={{
        src: "/images/heros/equipo.webp",
        alt: "Nuestro equipo",
      }}
    />
  );
};
