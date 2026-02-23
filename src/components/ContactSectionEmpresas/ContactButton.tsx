"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { URLS } from "@/lib/utils/constants";

interface ContactButtonProps {
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ onClick }) => {
  const router = useRouter();

  const navigateToContacto = () => {
    if (onClick) {
      onClick();
      return;
    }

    router.push(URLS.speakWithUsEmpresas());
  };

  return (
    <Button
      className="w-full lg:w-fit"
      variant="outline"
      onClick={navigateToContacto}
      animateOnClick
    >
      MÁS INFORMACIÓN
    </Button>
  );
};
