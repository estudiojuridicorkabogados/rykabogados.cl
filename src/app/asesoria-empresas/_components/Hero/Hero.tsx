import { HeroSection } from "@/components/Hero/HeroSection";

export const AsesoriaEmpresasHero = () => {
  return (
    <HeroSection
      label="Nuestros servicios"
      title="Asesoría Empresas"
      description={`En RK Abogados contamos con un equipo de profesionales especializados en derecho laboral y corporativo, enfocado en brindar una asesoría estratégica, preventiva y resolutiva que garantice el cumplimiento de la normativa laboral y previsional vigente, minimice riesgos y fortalezca las relaciones con sus trabajadores.
Nuestra asesoría abarca desde el diseño y actualización de contratos, políticas internas y reglamentos, hasta la implementación de modelos de cumplimiento laboral (Ley Karin, acoso laboral y sexual, igualdad de género, seguridad y salud en el trabajo).
Acompañamos a su empresa en auditorías laborales, fiscalizaciones, procesos de negociación colectiva, despidos masivos o individuales, y defensa ante la Dirección del Trabajo o tribunales laborales.
Nuestro enfoque combina prevención, control y estrategia legal, permitiendo a cada organización operar con seguridad jurídica, proteger su reputación y optimizar sus recursos humanos.`}
      image={{
        src: "/images/heros/studio-working.jpg",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
