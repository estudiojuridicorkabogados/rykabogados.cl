import { ContactButton } from "./ContactButton";

interface ContactSectionLightProps {
  contactLabel?: string;
  onContactClick?: () => void;
}

export const ContactSectionLight: React.FC<ContactSectionLightProps> = ({
  contactLabel,
  onContactClick,
}) => {
  return (
    <section className="relative py-16 lg:py-32 flex items-center justify-center bg-[#F7F6F6]">
      <div className="relative z-10 section-container flex flex-col lg:flex-row gap-16 lg:gap-16">
        <div className="w-full lg:w-1/2 flex">
          <h3 className="text-3xl lg:text-5xl text-black">
            Agenda una llamada de evaluación gratis.
          </h3>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:gap-4 text-black">
          <span className="uppercase text-sm font-bold tracking-[2px]">
            ¿Tienes Preguntas?
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold">Contáctanos</h2>

          <p className="mb-6">
            Cuéntanos tu caso, nosotros nos encargamos del resto.
          </p>

          <ContactButton label={contactLabel} onClick={onContactClick} />
        </div>
      </div>
    </section>
  );
};
