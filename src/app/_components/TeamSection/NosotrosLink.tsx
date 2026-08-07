"use client";

import { useRouter } from "next/navigation";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { Button } from "@/components/ui/Button";
import { URLS } from "@/lib/utils/constants";

export const NosotrosLink = () => {
  const router = useRouter();

  const navigateToNosostros = () => router.push(URLS.nosotros());

  return (
    <Button
      animateOnClick
      variant="white-outline-on-primary"
      className="group w-full lg:w-fit"
      type="button"
      onClick={navigateToNosostros}
    >
      Conoce a nuestro equipo{" "}
      <LongArrowRight className="group-hover:stroke-primary group-hover:animate-wiggle ml-2 stroke-white" />
    </Button>
  );
};
