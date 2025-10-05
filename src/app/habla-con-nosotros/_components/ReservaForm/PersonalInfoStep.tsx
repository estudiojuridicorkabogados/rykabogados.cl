"use client";

import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "./types";

interface PersonalInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: any;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  register,
  errors,
}) => (
  <div className="space-y-16 mt-8">
    <FloatingLabelInput
      id="name"
      {...register("name")}
      label="Nombre completo"
      error={errors.name?.message}
    />

    <FloatingLabelInput
      id="email"
      {...register("email")}
      label="Email"
      type="email"
      error={errors.email?.message}
    />

    <FloatingLabelInput
      id="phoneNumber"
      {...register("phoneNumber")}
      label="Teléfono"
      error={errors.phoneNumber?.message}
    />
  </div>
);
