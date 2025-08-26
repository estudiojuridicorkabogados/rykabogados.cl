"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { URLS } from "@/lib/utils/constants";

export const NosotrosLink = () => {
  const router = useRouter();

  const navigateToNosostros = () => router.push(URLS.nosotros());

  return (
    <Button
      className="w-full lg:w-fit"
      variant="white-outline-on-primary"
      animateOnClick
      onClick={navigateToNosostros}
    >
      Más Info
    </Button>
  );
};
