"use client";

import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";
import { SelectInput } from "@/components/Input/SelectInput";

import { FormData } from "./types";

const MOTIVE_ASESORIA_OPTIONS = [
  { id: 1, label: "Asesoría laboral integral para empresas" },
  { id: 2, label: "Asesoría específica o contigencias legales puntuales" },
  { id: 3, label: "Necesito orientación general" },
  { id: 4, label: "No estoy seguro" },
];

const TAMANO_EMPRESA_OPTIONS = [
  { id: 1, label: "1-10 trabajadores" },
  { id: 2, label: "11-50 trabajadores" },
  { id: 3, label: "51-200 trabajadores" },
  { id: 4, label: "Más de 200 trabajadores" },
];

const COMO_QUERES_AVANZAR_OPTIONS = [
  {
    id: 1,
    label: "Primera asesoría sin costo* (30 minutos)",
    sublabel: "Evaluamos tu caso y te proponemos una estrategia clara",
  },
  {
    id: 2,
    label: "Asesoría estratégica (30 minutos - 1.25 UF)",
    sublabel: "Reunión enfocada en resolver tu problema puntual",
  },
  {
    id: 3,
    label: "Asesoría estratégica (60 minutos - 2.5 UF)",
    sublabel: "Análisis completo y propuesta de estrategia legal",
  },
  {
    id: 4,
    label: "Cotizar servicio mensual o proyecto",
    sublabel: "Asesoría continua para tu empresa",
  },
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
            label="¿Qué necesitas?"
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

    <Controller
      name="comoQuieresAvanzar"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <SelectInput
          label="¿Cómo quieres avanzar?"
          options={COMO_QUERES_AVANZAR_OPTIONS}
          error={errors.comoQuieresAvanzar?.message}
          {...field}
        />
      )}
    />

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
        placeholder="Describe brevemente tu caso e indícanos el nivel de urgencia. Nuestro equipo revisará tu solicitud antes de contactarte."
      />
      {errors.mensaje && (
        <p className="text-xs text-red-400">{errors.mensaje.message}</p>
      )}
    </div>
  </div>
);
