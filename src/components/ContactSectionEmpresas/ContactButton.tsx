"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/utils/analytics";
import { URLS } from "@/lib/utils/constants";

interface ContactButtonProps {
  onClick?: () => void;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  label = "MÁS INFORMACIÓN",
}) => {
  const router = useRouter();

  const navigateToContacto = () => {
    trackEvent("rk_cta_click", {
      location: "contact_section",
      cta_label: label,
    });

    if (onClick) {
      onClick();
      return;
    }

    router.push(URLS.speakWithUsEmpresas());
  };

  return (
    <Button
      className="w-full lg:w-fit"
      variant="dark"
      onClick={navigateToContacto}
      animateOnClick
    >
      {label}
    </Button>
  );
};
