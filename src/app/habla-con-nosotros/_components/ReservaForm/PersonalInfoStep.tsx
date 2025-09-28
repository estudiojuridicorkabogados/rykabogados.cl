"use client";

import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";

interface PersonalInfoStepProps {
  register: any;
  errors: any;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  register,
  errors,
}) => (
  <div className="space-y-12">
    <div>
      <FloatingLabelInput {...register("name")} label="Nombre completo" />
      {errors.name && (
        <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>

    <div>
      <FloatingLabelInput {...register("email")} label="Email" />

      {errors.email && (
        <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    <div>
      <FloatingLabelInput {...register("phone")} label="Teléfono" />

      {errors.phone && (
        <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
      )}
    </div>
  </div>
);
