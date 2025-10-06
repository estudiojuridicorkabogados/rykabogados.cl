import { HeroSection } from "@/components/Hero/HeroSection";

export const AsesoriaTrabajadoresHero = () => {
  return (
    <HeroSection
      label="Nuestros servicios"
      title="Asesoría Trabajador"
      align="top"
      description={`Si eres trabajador, tomamos tu caso a resultado.
En RK Abogados comprendemos la importancia de defender tus derechos laborales. Nuestros honorarios se cobran exclusivamente sobre la ganancia efectivamente obtenida, sin gastos iniciales. Asumimos tu causa con compromiso, transparencia y experiencia, velando por una reparación justa frente a despidos injustificados, acoso laboral, vulneraciones de derechos fundamentales, no pago de cotizaciones y todo tipo de infracciones laborales.`}
      image={{
        src: "/images/heros/team-trabajando.webp",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
