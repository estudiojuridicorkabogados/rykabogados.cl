"use client";

import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";

import { InfoModal } from "@/components/InfoModal/InfoModal";
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

    <div>
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

      <div className="mt-2">
        <InfoModal
          triggerLabel="Ver condiciones de cada asesoría"
          title="Condiciones de las reuniones y asesorías para empresas"
        >
          <p>
            Las reuniones se realizan preferentemente por videollamada o, en
            subsidio, por llamada telefónica o presencialmente, según
            disponibilidad y coordinación previa.
          </p>

          <div>
            <p className="font-semibold text-gray-900">
              1. Reunión inicial de diagnóstico — 30 minutos, sin costo
            </p>
            <p className="mt-1">
              Dirigida a empresas nuevas y sujeta a evaluación previa. Su
              finalidad es conocer la empresa, identificar su necesidad
              principal y recomendar la modalidad de servicio más adecuada.
            </p>
            <p className="mt-1">
              Incluye una orientación general, pero no la resolución detallada
              de consultas, revisión exhaustiva de documentos, elaboración de
              una estrategia ni ejecución de gestiones.
            </p>
            <p className="mt-1">
              Cuando corresponda continuar, enviaremos una propuesta formal de
              servicios y honorarios dentro de las 24 horas hábiles siguientes a
              la reunión. Esta opción puede utilizarse una vez por empresa.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              2. Consulta jurídica puntual — 30 minutos, 1,25 UF
            </p>
            <p className="mt-1">
              Dirigida a resolver una consulta específica. Incluye un análisis
              focalizado, la identificación de los principales riesgos y la
              recomendación de próximos pasos.
            </p>
            <p className="mt-1">
              No incluye informes escritos, redacción de documentos, revisión de
              antecedentes extensos ni realización de gestiones, los que se
              cotizarán separadamente.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              3. Asesoría estratégica — 60 minutos, 2,5 UF
            </p>
            <p className="mt-1">
              Recomendada para asuntos complejos o varias consultas
              relacionadas. Incluye un análisis más profundo, la evaluación de
              riesgos y alternativas, una estrategia legal preliminar y un
              informe breve con los temas tratados y las principales
              conclusiones o recomendaciones entregadas.
            </p>
            <p className="mt-1">
              No incluye la creación de contratos, escritos, auditorías,
              realización de gestiones ni representación, los que se cotizarán
              separadamente.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              4. Cotización de plan mensual o proyecto
            </p>
            <p className="mt-1">
              Permite levantar las necesidades recurrentes de la empresa o
              definir el alcance de un proyecto para preparar una propuesta
              personalizada.
            </p>
          </div>

          <p>
            Las conclusiones se basan en los antecedentes disponibles y pueden
            variar si se proporciona nueva información. La realización de una
            reunión no implica que RK Abogados haya asumido una representación
            judicial o administrativa.
          </p>

          <p>
            RK Abogados podrá no aceptar una solicitud cuando exista conflicto
            de interés, el asunto esté fuera de sus áreas, falten antecedentes
            indispensables, los plazos o la disponibilidad impidan una atención
            responsable o la solicitud sea contraria a la normativa o ética
            profesional. Estas decisiones se adoptarán conforme a criterios
            objetivos y no discriminatorios.
          </p>
        </InfoModal>
      </div>
    </div>

    <div className="relative flex flex-col gap-2">
      <label
        className="pt-2 text-sm font-bold text-white/80 lg:text-base"
        htmlFor="mensaje"
      >
        Mensaje (opcional)
      </label>
      <textarea
        id="mensaje"
        {...register("mensaje")}
        className="resize-none border border-white/60 bg-black/30 p-2 text-base transition-colors outline-none focus:border-white focus:ring-0"
        rows={3}
        placeholder="Describe brevemente tu caso e indícanos el nivel de urgencia. Nuestro equipo revisará tu solicitud antes de contactarte."
      />
      {errors.mensaje && (
        <p className="text-xs text-red-400">{errors.mensaje.message}</p>
      )}
    </div>
  </div>
);
