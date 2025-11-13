"use client";

import { useRouter } from "next/navigation";

import { WhatsappIcon } from "@/components/icons/Whatsapp";
import { Button } from "@/components/ui/Button";
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

      <Button variant="whatsapp" asChild>
        <a
          href={URLS.whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center w-full mt-4"
        >
          <WhatsappIcon className="mr-2 w-4 h-4 fill-current text-black group-hover:text-white transition-colors" />
          Hablamos por Whatsapp
        </a>
      </Button>
    </div>
  );
};
