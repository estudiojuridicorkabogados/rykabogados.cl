"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { URLS } from "@/utils/constants";

export const ContactButton = () => {
  const router = useRouter();

  const navigateToContacto = () => router.push(URLS.contacts());

  return (
    <Button
      className="w-full lg:w-fit"
      variant="outline"
      onClick={navigateToContacto}
      animateOnClick
    >
      Mas info
    </Button>
  );
};
