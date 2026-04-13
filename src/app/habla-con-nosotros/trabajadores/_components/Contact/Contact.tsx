"use client";

import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

export const Contact = () => {
  const handleContactClick = () => {
    const formSection = document.getElementById("reserva-form-section");

    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ContactSectionLight
      contactLabel="Agenda una asesoría"
      onContactClick={handleContactClick}
    />
  );
};
