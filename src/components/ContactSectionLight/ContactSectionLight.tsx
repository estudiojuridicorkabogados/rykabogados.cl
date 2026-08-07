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
    <section className="bg-gray-60 relative py-16 lg:py-32">
      <div className="section-container lg:gap-16P z-10 flex flex-col justify-center gap-16 lg:flex-row">
        <div className="flex w-full lg:w-1/2">
          <h3 className="text-3xl text-black lg:text-5xl">
            Agenda una llamada
          </h3>
        </div>

        <div className="flex w-full flex-col gap-2 text-black lg:w-1/2 lg:gap-4">
          <span className="text-sm font-bold tracking-[2px] uppercase">
            ¿Tienes Preguntas?
          </span>

          <h2 className="text-3xl font-bold lg:text-4xl">Contáctanos</h2>

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
