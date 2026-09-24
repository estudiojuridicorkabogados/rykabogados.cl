"use client";

import { useRef } from "react";

import { AgendaUnaAsesoria } from "@/components/AgendaUnaAsesoria/AgendaUnaAsesoria";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { RK_EVENTS, trackEvent } from "@/lib/utils/analytics";

/**
 * On desktop the box is a sticky sidebar, on screen from the first paint, so
 * `rk_cta_view` fires for nearly everyone there. On a phone it sits below the
 * article, and the signal is the exact count of readers who got that far —
 * which scroll depth can only estimate, since 100% is the bottom of the whole
 * page, past related posts and the footer.
 */
export const HablaConNosotros: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useInViewOnce(boxRef, () => {
    trackEvent(RK_EVENTS.CTA_VIEW, { location: "blog_post" });
  });

  return (
    <div
      ref={boxRef}
      className="h-fit w-full bg-[#F3F0EC] p-6 lg:sticky lg:top-12 lg:w-[340px] lg:p-8"
    >
      <span className="mb-6 text-xl font-bold text-black">
        Hablemos sobre tu caso
      </span>

      <p className="mb-4 text-lg leading-8 text-gray-700">
        ¿Necesitas orientación legal? Conéctate con nuestros abogados y recibe
        la información que necesitas para tomar la mejor decisión.
      </p>

      <AgendaUnaAsesoria
        location="blog_post"
        variant="dark"
        className="lg:w-full"
      />

      <WhatsappLink location="blog_post" greenButton className="mt-4 w-full" />
    </div>
  );
};
