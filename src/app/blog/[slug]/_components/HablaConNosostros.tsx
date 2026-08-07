import { AgendaUnaAsesoria } from "@/components/AgendaUnaAsesoria/AgendaUnaAsesoria";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";

export const HablaConNosotros: React.FC = () => {
  return (
    <div className="h-fit w-full bg-[#F3F0EC] p-6 lg:sticky lg:top-12 lg:w-[340px] lg:p-8">
      <span className="mb-6 text-xl font-bold text-black">
        Hablemos sobre tu caso
      </span>

      <p className="mb-4 text-lg leading-8 text-gray-700">
        ¿Necesitas orientación legal? Conéctate con nuestros abogados y recibe
        la información que necesitas para tomar la mejor decisión.
      </p>

      <AgendaUnaAsesoria variant="dark" className="lg:w-full" />

      <WhatsappLink greenButton className="mt-4 w-full" />
    </div>
  );
};
