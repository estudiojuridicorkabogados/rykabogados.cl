import { HeroSection } from "@/components/Hero/HeroSection";

export const NosostrosHero = () => {
  return (
    <HeroSection
      label="Encuentra el equipo"
      title="Nosotros"
      align="center"
      description={`En RK Abogados creemos que la confianza se construye con resultados reales, ética profesional y compromiso constante con la excelencia.
Somos un estudio jurídico dinámico y multidisciplinario, con presencia en todo Chile, dedicado a ofrecer soluciones legales personalizadas y estratégicas para empresas, trabajadores y personas naturales.`}
      image={{
        src: "/images/heros/equipo.webp",
        alt: "Nuestro equipo",
      }}
    />
  );
};
