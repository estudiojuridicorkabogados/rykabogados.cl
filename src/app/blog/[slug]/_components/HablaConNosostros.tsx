"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { URLS } from "@/lib/utils/constants";

export const HablaConNosotros: React.FC = () => {
  const router = useRouter();

  const navigateToHablaConNosotros = () => router.push(URLS.speakWithUs());

  return (
    <div className="bg-[#F3F0EC] p-6 lg:p-8 w-full lg:w-[340px] h-fit lg:sticky lg:top-12">
      <span className="text-xl text-black mb-6 font-bold">
        Hablemos sobre tu caso
      </span>

      <p className="text-lg leading-8 text-gray-700 mb-4">
        ¿Necesitas orientación legal? Conéctate con nuestros abogados y recibe
        la información que necesitas para tomar la mejor decisión.
      </p>

      <Button
        className="w-full"
        variant="dark"
        size="sm"
        animateOnClick
        onClick={navigateToHablaConNosotros}
      >
        Reserva una llamada
      </Button>

      <WhatsappLink className="w-full mt-4" />
    </div>
  );
};
