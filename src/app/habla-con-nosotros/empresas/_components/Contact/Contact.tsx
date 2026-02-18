"use client";

import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

interface ContactProps {
  contactLabel?: string;
}

export const Contact: React.FC<ContactProps> = ({
  contactLabel = "Reserva una llamada",
}) => {
  const handleContactClick = () => {
    const formSection = document.getElementById("reserva-form-section");

    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ContactSectionLight
      contactLabel={contactLabel}
      onContactClick={handleContactClick}
    />
  );
};
