"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { trackEvent } from "@/lib/utils/analytics";
import { URLS } from "@/lib/utils/constants";

export const FaqsContacts = () => {
  const router = useRouter();

  const onClickContactUs = () => {
    trackEvent("rk_cta_click", {
      location: "faqs",
      cta_label: "Contáctanos",
    });

    router.push(URLS.contacts());
  };

  return (
    <div className="mx-auto mt-12 mb-8 px-6 lg:mt-24 lg:mb-16 lg:max-w-6xl lg:min-w-6xl 2xl:w-7xl 2xl:max-w-7xl">
      <div className="bg-gray-60 flex w-full flex-col items-center justify-center rounded-md px-4 py-8 text-center lg:py-16">
        <h3 className="text-xl text-black">
          ¿No encuentras lo que buscas? <br /> Llámanos o contáctanos vía
          Whatsapp
        </h3>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          <Button
            className="w-full px-16 lg:w-fit"
            variant="dark"
            animateOnClick
            onClick={onClickContactUs}
          >
            Contáctanos
          </Button>

          <WhatsappLink
            location="faqs"
            greenButton
            className="w-full lg:w-fit"
          />
        </div>
      </div>
    </div>
  );
};
