"use client";

import { useRouter } from "next/navigation";

import { URLS } from "@/lib/utils/constants";

import { Button } from "../ui/Button";

export const ClientLink = () => {
  const router = useRouter();

  const navigateToContacto = () => router.push(URLS.speakWithUs());

  return (
    <Button
      className="w-full lg:w-fit"
      variant="default"
      size="sm"
      animateOnClick
      onClick={navigateToContacto}
    >
      Client Page
    </Button>
  );
};
