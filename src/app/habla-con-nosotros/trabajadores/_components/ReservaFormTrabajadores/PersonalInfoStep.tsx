"use client";

import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";
import { SelectInput } from "@/components/Input/SelectInput";

import { FormData } from "./types";

interface PersonalInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  register,
  errors,
  control,
}) => (
  <div className="mt-8 space-y-10">
    <FloatingLabelInput
      id="name"
      {...register("name")}
      label="Nombre completo"
      error={errors.name?.message}
    />

    <div className="flex w-full flex-col gap-8 md:flex-row">
      <FloatingLabelInput
        id="email"
        {...register("email")}
        label="Correo electrónico"
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

    <div className="flex w-full flex-col gap-6 md:flex-row">
      <Controller
        name="causalDespido"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SelectInput
            label="¿Causal de despido?"
            options={[
              { id: "art-161", label: "Art. 161 - Necesidades de la empresa" },
              {
                id: "art-160",
                label: "Art. 160 - Despido sin derecho indemnización",
              },
              { id: "otra", label: "Otra causal" },
            ]}
            error={errors.causalDespido?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="antiguedadLaboral"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SelectInput
            label="Antigüedad laboral"
            options={[
              { id: "menos-1", label: "Menos de 1 año" },
              { id: "1-2", label: "Entre 1 y 2 años" },
              { id: "2-5", label: "Entre 2 y 5 años" },
              { id: "5-10", label: "Entre 5 y 10 años" },
              { id: "mas-10", label: "Más de 10 años" },
            ]}
            error={errors.antiguedadLaboral?.message}
            {...field}
          />
        )}
      />
    </div>

    <div className="relative flex flex-col gap-2">
      <label
        className="pt-2 text-sm font-bold text-white/80 lg:text-base"
        htmlFor="mensaje"
      >
        Mensaje
      </label>
      <textarea
        id="mensaje"
        {...register("mensaje")}
        className="resize-none border-1 border-white/60 bg-black/30 p-2 text-base transition-colors outline-none focus:border-white focus:ring-0"
        rows={3}
        placeholder="Cuéntanos un poco sobre tu caso"
      />
      {errors.mensaje && (
        <p className="text-xs text-red-400">{errors.mensaje.message}</p>
      )}
    </div>
  </div>
);
