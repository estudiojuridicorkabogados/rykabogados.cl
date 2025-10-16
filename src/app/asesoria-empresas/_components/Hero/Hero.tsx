import { HeroSection } from "@/components/Hero/HeroSection";

const DESCRIPTION = `
En RK Abogados contamos con un equipo especializado en derecho laboral corporativo, dedicado a ofrecer una asesoría estratégica, preventiva y resolutiva que asegure el cumplimiento normativo, minimice riesgos y fortalezca las relaciones laborales.
Asistimos a tu empresa en la redacción de contratos, políticas internas, reglamentos y modelos de cumplimiento laboral (Ley Karin, seguridad y salud), además de auditorías, fiscalizaciones, negociaciones colectivas y defensa o representación ante la Dirección del Trabajo o tribunales.
Nuestro enfoque combina prevención y estrategia legal, permitiendo a cada organización actuar con seguridad jurídica, fortalecer su gestión interna y optimizar el desarrollo de su capital humano.
`

export const AsesoriaEmpresasHero = () => {
  return (
    <HeroSection
      label="Nuestros servicios"
      title="Asesoría Empresas"
      align="top"
        description={DESCRIPTION}
      image={{
        src: "/images/heros/colonas.webp",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
