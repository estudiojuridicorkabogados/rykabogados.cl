"use client";

import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";

interface PersonalInfoStepProps {
  register: any;
  errors: any;
  onNext: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  register,
  errors,
  onNext,
}) => (
  <div className="space-y-4">
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

    <button
      type="button"
      onClick={onNext}
      className="w-full bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
    >
      Continuar
    </button>
  </div>
);
