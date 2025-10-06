import { HeroSection } from "@/components/Hero/HeroSection";

export const HomeHero = () => {
  return (
    <HeroSection
      label="RK Abogados"
      title={
        <>
          Excelencia, Lealtad <br />e Integridad
        </>
      }
      description={`En Retamales Kowalski Abogados creemos que la confianza de nuestros clientes se construye con resultados reales, una atención cercana y una ética profesional intachable. Somos un estudio jurídico dinámico y multidisciplinario, con presencia a lo largo de todo Chile, dedicado a ofrecer soluciones legales personalizadas para empresas, trabajadores y personas naturales. Nuestra práctica se guía por tres valores esenciales: excelencia en el servicio, lealtad hacia el cliente e integridad en cada acción.`}
      image={{
        src: "/images/heros/columns.webp",
        alt: "Columns background",
      }}
    />
  );
};
