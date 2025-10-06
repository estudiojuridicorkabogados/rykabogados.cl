import { HeroSection } from "@/components/Hero/HeroSection";

export const NosostrosHero = () => {
  return (
    <HeroSection
      label="Encuentra el equipo"
      title="Nosotros"
      description={`En RK Abogados creemos que la confianza se construye con resultados reales, ética profesional y compromiso constante con la excelencia.
Somos un estudio jurídico dinámico y multidisciplinario, con presencia en todo Chile, dedicado a ofrecer soluciones legales personalizadas y estratégicas para empresas, trabajadores y personas naturales.
Nuestro equipo de abogados especializados en Derecho Laboral, Civil, Societario y de Familia combina experiencia, conocimiento actualizado y una visión humana para entregar asesoría integral, preventiva y resolutiva.
Acompañamos a las empresas en el cumplimiento de la normativa laboral y previsional, la gestión de conflictos, auditorías y defensa ante fiscalizaciones, además de asesorar en contratos, sociedades y reestructuraciones empresariales.
Guiados por nuestros valores —Excelencia, Lealtad e Integridad— trabajamos con cercanía y profesionalismo, ofreciendo resultados sólidos y relaciones de confianza duraderas.`}
      image={{
        src: "/images/heros/equipo.webp",
        alt: "Nuestro equipo",
      }}
    />
  );
};
