"use client";

import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";
import { SelectInput } from "@/components/Input/SelectInput";

import { FormData } from "./types";

const MOTIVE_ASESORIA_OPTIONS = [
  { id: 1, label: "Asesoría laboral preventiva y capacitaciones" },
  { id: 2, label: "Despidos y término de contrato" },
  { id: 3, label: "Contratos de trabajo y documentación laboral" },
  { id: 4, label: "Remuneraciones, beneficios y cotizaciones" },
  { id: 5, label: "Jornadas laborales, turnos y control de asistencia" },
  { id: 6, label: "Fiscalizaciones y multas de la Inspección del Trabajo" },
  { id: 7, label: "Juicios laborales y defensa judicial" },
  {
    id: 8,
    label: "Negociación colectiva, sindicatos e investigaciones Ley Karin",
  },
  { id: 9, label: "Otras materias" },
];

const TAMANO_EMPRESA_OPTIONS = [
  { id: 1, label: "1-10 trabajadores" },
  { id: 2, label: "11-25 trabajadores" },
  { id: 3, label: "26-50 trabajadores" },
  { id: 4, label: "51-200 trabajadores" },
  { id: 5, label: "Más de 200 trabajadores" },
];

interface EmpresaInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

export const EmpresaInfoStep: React.FC<EmpresaInfoStepProps> = ({
  register,
  errors,
  control,
}) => (
  <div className="space-y-10 mt-8">
    <FloatingLabelInput
      id="name"
      {...register("name")}
      label="Nombre completo"
      error={errors.name?.message}
    />

    <div className="flex flex-col md:flex-row gap-8 w-full">
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

    <div className="flex flex-col md:flex-row gap-6 w-full">
      <Controller
        name="motivoAsesoria"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SelectInput
            label="Motivo de la asesoría"
            options={MOTIVE_ASESORIA_OPTIONS}
            error={errors.motivoAsesoria?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="tamanoEmpresa"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SelectInput
            label="Tamaño de la empresa"
            options={TAMANO_EMPRESA_OPTIONS}
            error={errors.tamanoEmpresa?.message}
            {...field}
          />
        )}
      />
    </div>

    <div className="relative flex flex-col gap-2">
      <label
        className="font-bold text-white/80 text-sm lg:text-base pt-2"
        htmlFor="mensaje"
      >
        Mensaje (opcional)
      </label>
      <textarea
        id="mensaje"
        {...register("mensaje")}
        className="border p-2 bg-black/30 resize-none transition-colors border-white/60 focus:border-white outline-none focus:ring-0 text-base"
        rows={3}
        placeholder="Cuéntanos un poco sobre tu caso"
      />
      {errors.mensaje && (
        <p className="text-xs text-red-400">{errors.mensaje.message}</p>
      )}
    </div>
  </div>
);
