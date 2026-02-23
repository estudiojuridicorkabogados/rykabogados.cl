import { ContactButton } from "./ContactButton";

interface ContactSectionEmpresasProps {
  contactLabel?: string;
  onContactClick?: () => void;
}

export const ContactSectionEmpresas: React.FC<ContactSectionEmpresasProps> = ({
  onContactClick,
}) => {
  return (
    <section className="relative py-16 lg:py-32 bg-[#F7F6F6]">
      <div className="z-10 section-container flex flex-col lg:flex-row justify-center gap-16 lg:gap-16P">
        <div className="w-full lg:w-1/2 flex">
          <h3 className="text-3xl lg:text-5xl text-black">
            Agenda una asesoría sin costo de 30 minutos
          </h3>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:gap-4 text-black">
          <span className="uppercase text-sm font-bold tracking-[2px]">
            ¿Tienes una situación legal que resolver?
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold">
            Agendar reunión con abogado
          </h2>

          <p className="mb-6">
            Conversemos. Analizamos tu caso y te entregamos orientación clara y
            concreta para tomar decisiones informadas y con foco en tu negocio.
          </p>

          <ContactButton onClick={onContactClick} />
        </div>
      </div>
    </section>
  );
};
