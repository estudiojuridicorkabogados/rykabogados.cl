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
      <div className="section-container flex flex-col lg:flex-row items-center">
        {/* Left column — light */}
        <div className="pb-8 lg:pb-0 flex-1 flex items-center lg:pr-16">
          <div className="max-w-md">
            <h2 className="text-3xl lg:text-4xl font-serif mb-5 leading-snug text-black">
              Agenda una asesoría inicial sin costo (30 minutos)
            </h2>
            <p className="text-base leading-relaxed">
              Analizamos tu situación y te entregamos una orientación clara para
              que tomes decisiones informadas desde el inicio.
            </p>
          </div>
        </div>

        {/* Right column — dark */}
        <div className="flex-1 flex items-center border-t-2 border-primary lg:border-t-0 lg:border-l-2 lg:border-primary lg:pl-16">
          <div className="flex flex-col gap-4 py-8">
            <span className="uppercase text-xs text-primary font-bold tracking-[3px]">
              ¿Tienes una situación legal que resolver?
            </span>

            <h3 className="text-2xl lg:text-4xl font-serif leading-snug">
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
