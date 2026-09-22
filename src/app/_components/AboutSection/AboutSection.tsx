"use client";

import { useRouter } from "next/navigation";

import { Reveal } from "@/components/Reveal/Reveal";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/utils/analytics";
import { URLS } from "@/lib/utils/constants";

export const AboutSection = () => {
  const router = useRouter();

  // Rendered twice, desktop and mobile, so the label alone would double-count
  // a single button. One handler, one signal.
  const navigateToContacto = () => {
    trackEvent("rk_cta_click", {
      location: "about_section",
      cta_label: "Contáctanos",
    });

    router.push(URLS.contacts());
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto flex flex-col items-start gap-x-24 gap-y-8 px-6 lg:max-w-6xl lg:flex-row xl:w-7xl 2xl:max-w-7xl">
        <div className="flex flex-1 flex-col gap-6">
          <Reveal
            as="h2"
            className="text-4xl leading-tight font-bold text-[#0B142D] lg:text-5xl"
          >
            Nuestra Misión
          </Reveal>

          <Reveal
            as="p"
            index={1}
            className="mb-2 leading-relaxed text-gray-600 lg:max-w-2xl lg:text-lg"
          >
            En Retamales Kowalski Abogados brindamos soluciones jurídicas
            efectivas y personalizadas, adaptadas a las necesidades reales de
            cada cliente. Nuestro equipo, especializado en Derecho Laboral,
            combina experiencia técnica, criterio práctico y cercanía humana
            para diseñar estrategias sólidas y sostenibles. Buscamos construir
            relaciones de confianza duradera, basadas en la transparencia, la
            lealtad y un compromiso constante con la excelencia profesional.
          </Reveal>

          <Reveal index={2} className="hidden lg:block">
            <Button
              className="w-fit"
              variant="default"
              size="lg"
              animateOnClick
              onClick={navigateToContacto}
            >
              Contáctanos
            </Button>
          </Reveal>
        </div>

        <Reveal className="mt-4 flex w-full lg:hidden">
          <Button
            className="w-full"
            variant="default"
            size="lg"
            animateOnClick
            onClick={navigateToContacto}
          >
            Contáctanos
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
