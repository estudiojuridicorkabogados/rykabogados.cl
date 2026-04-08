"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { URLS } from "@/lib/utils/constants";

export const FaqsContacts = () => {
  const router = useRouter();

  const onClickContactUs = () => router.push(URLS.contacts());

  return (
    <div className="px-6 lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl mx-auto mt-12 lg:mt-24 mb-8 lg:mb-16">
      <div className="py-8 lg:py-16 px-4 bg-gray-60 rounded-md w-full flex flex-col items-center justify-center text-center">
        <h3 className="text-black text-xl">
          ¿No encuentras lo que buscas? <br /> Llámanos o contáctanos vía
          Whatsapp
        </h3>

        <div className="flex flex-col gap-4 lg:flex-row mt-4">
          <Button
            className="w-full lg:w-fit px-16"
            variant="dark"
            animateOnClick
            onClick={onClickContactUs}
          >
            Contáctanos
          </Button>

          <WhatsappLink className="w-full lg:w-fit" />
        </div>
      </div>
    </div>
  );
};
