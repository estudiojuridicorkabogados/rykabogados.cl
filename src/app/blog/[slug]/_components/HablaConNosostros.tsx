import { AgendaUnaAsesoria } from "@/components/AgendaUnaAsesoria/AgendaUnaAsesoria";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";

export const HablaConNosotros: React.FC = () => {
  return (
    <div className="bg-[#F3F0EC] p-6 lg:p-8 w-full lg:w-[340px] h-fit lg:sticky lg:top-12">
      <span className="text-xl text-black mb-6 font-bold">
        Hablemos sobre tu caso
      </span>

      <p className="text-lg leading-8 text-gray-700 mb-4">
        ¿Necesitas orientación legal? Conéctate con nuestros abogados y recibe
        la información que necesitas para tomar la mejor decisión.
      </p>

      <AgendaUnaAsesoria variant="dark" className="lg:w-full" />

      <WhatsappLink greenButton className="w-full mt-4" />
    </div>
  );
};
