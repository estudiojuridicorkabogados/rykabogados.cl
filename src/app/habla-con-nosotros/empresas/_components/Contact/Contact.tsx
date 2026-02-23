"use client";

import { ContactSectionEmpresas } from "@/components/ContactSectionEmpresas/ContactSectionEmpresas";

export const Contact = () => {
  const handleContactClick = () => {
    const formSection = document.getElementById("reserva-form-section");

    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return <ContactSectionEmpresas onContactClick={handleContactClick} />;
};
