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
    <section className="relative py-16 lg:py-32 bg-gray-60">
      <div className="z-10 section-container flex flex-col lg:flex-row justify-center gap-16 lg:gap-16P">
        <div className="w-full lg:w-1/2 flex">
          <h3 className="text-3xl lg:text-5xl text-black">
            Agenda una llamada
          </h3>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:gap-4 text-black">
          <span className="uppercase text-sm font-bold tracking-[2px]">
            ¿Tienes Preguntas?
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold">Contáctanos</h2>

          <p className="mb-6">
            Cuéntanos tu caso, nosotros nos encargamos del resto. Nuestro equipo
            está listo para ofrecerte la asesoría que necesitas.
          </p>

          <ContactButton label={contactLabel} onClick={onContactClick} />
        </div>
      </div>
    </section>
  );
};
