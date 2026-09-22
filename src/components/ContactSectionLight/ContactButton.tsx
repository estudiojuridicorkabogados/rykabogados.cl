"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/utils/analytics";
import { URLS } from "@/lib/utils/constants";

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = "MÁS INFORMACIÓN",
  onClick,
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

    router.push(URLS.contacts());
  };

  return (
    <Button
      className="w-full lg:w-fit"
      variant="outline"
      onClick={navigateToContacto}
      animateOnClick
    >
      {label}
    </Button>
  );
};
