import { HeroSection } from "@/components/Hero/HeroSection";

export const AsesoriaTrabajadoresHero = () => {
  return (
    <HeroSection
      label="Nuestro servicios"
      title="Asesoría Trabajador"
      description={`Si eres trabajador, tomamos tu caso a resultados, lo que significa que
        nuestros honorarios se cobrarán exclusivamente sobre la ganancia
        efectivamente percibida, ¡Sin gastos! Nuestros abogados te asesorarán en
        todo el transcurso del juicio, incluyendo inspecciones del trabajo, ya
        sea que necesites representación jurídica en las areas siguientes.`}
      image={{
        src: "/images/heros/team-trabajando.webp",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
