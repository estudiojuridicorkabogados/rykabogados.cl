import { HeroSection } from "@/components/Hero/HeroSection";

const DESCRIPTION = `
En RK Abogados tomamos tu caso a resultado, porque creemos en la justicia y en tu derecho a ser escuchado.
Te acompañamos con cercanía y rigor en conflictos laborales de toda índole, desde despidos injustificados hasta negociaciones colectivas, con un enfoque humano, técnico y orientado a soluciones efectivas y sostenibles.
`;

export const AsesoriaTrabajadoresHero = () => {
  return (
    <HeroSection
      label="Nuestros servicios"
      title="Asesoría Trabajador"
      align="top"
      description={DESCRIPTION}
      image={{
        src: "/images/heros/team-trabajando.webp",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
