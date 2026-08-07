import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";

import { ContactButton } from "./ContactButton";

interface ContactSectionEmpresasProps {
  contactLabel?: string;
  onContactClick?: () => void;
}

export const ContactSectionEmpresas: React.FC<ContactSectionEmpresasProps> = ({
  onContactClick,
}) => {
  return (
    <section className="bg-accent text-primary w-full py-14 lg:py-20">
      <div className="section-container flex flex-col items-center lg:flex-row">
        {/* Left column — light */}
        <div className="flex flex-1 items-center pb-8 lg:pr-16 lg:pb-0">
          <div className="max-w-md">
            <h2 className="mb-5 font-serif text-3xl leading-snug text-black lg:text-4xl">
              Agenda una asesoría inicial sin costo (30 minutos)
            </h2>
            <p className="text-base leading-relaxed">
              Analizamos tu situación y te entregamos una orientación clara para
              que tomes decisiones informadas desde el inicio.
            </p>
          </div>
        </div>

        {/* Right column — dark */}
        <div className="border-primary lg:border-primary flex flex-1 items-center border-t-2 lg:border-t-0 lg:border-l-2 lg:pl-16">
          <div className="flex flex-col gap-4 py-8">
            <span className="text-primary text-xs font-bold tracking-[3px] uppercase">
              ¿Tienes una situación legal que resolver?
            </span>

            <h3 className="font-serif text-2xl leading-snug lg:text-4xl">
              Habla con un abogado hoy
            </h3>

            <p className="text-sm leading-relaxed">
              Revisamos tu caso, identificamos riesgos y definimos los próximos
              pasos con foco en tu empresa.
            </p>

            <div className="mt-2 flex flex-col gap-4">
              <ContactButton
                onClick={onContactClick}
                label="AGENDA TU ASESORÍA →"
              />

              <p className="text-sm">
                Primera asesoría sin costo <br />
                Respuesta en menos de 24 horas.
              </p>

              <WhatsappLink
                variant="free-text"
                text="O contáctanos directamente por WhatsApp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
