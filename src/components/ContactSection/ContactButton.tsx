"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { URLS } from "@/lib/utils/constants";

export const ContactButton = () => {
  const router = useRouter();

  const navigateToContacto = () => router.push(URLS.contacts());

  return (
    <Button
      className="w-full lg:w-fit"
      variant="white-outline-on-primary"
      onClick={navigateToContacto}
      animateOnClick
    >
      MÁS INFORMACIÓN
    </Button>
  );
};
