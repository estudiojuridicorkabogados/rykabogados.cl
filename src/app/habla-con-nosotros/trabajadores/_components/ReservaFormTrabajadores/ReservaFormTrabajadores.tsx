"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { stagger } from "motion/react";
import * as m from "motion/react-m";
import dynamic from "next/dynamic";

import { submitBookACallFormTrabajadores } from "@/actions/submitBookACallFormTrabajadores";
import { InfoModal } from "@/components/InfoModal/InfoModal";
import { BookingFormSkeleton } from "@/components/ReservaForm/BookingFormSkeleton";
import { useDeferredMount } from "@/hooks/useDeferredMount";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useTracking } from "@/hooks/useTracking";
import { getCaptchaToken } from "@/lib/google/re-captcha/getCaptchaToken";
import {
  RK_EVENTS,
  trackEvent,
  trackTrabajadoresBookACallFormConversion,
} from "@/lib/utils/analytics";
import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";

/**
 * react-calendar, react-hook-form and Zod are ~143KB gzipped between them and
 * none of it is needed to paint this page. Deferred rather than removed —
 * the form still has to be ready the moment anyone reaches it.
 */
const Form = dynamic(() => import("./Form").then((mod) => mod.Form), {
  ssr: false,
  loading: () => <BookingFormSkeleton />,
});
import {
  BookingInfo,
  ReservaFormSuccessFeedback,
} from "./ReservaFormSuccessFeedback";
import { FormData } from "./types";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const FORM_NAME = "trabajadores" as const;

export const ReservaFormTrabajadores = () => {
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { logToSheet, shortCode } = useTracking();

  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);

  const [currentStep, setCurrentStep] = useState(1);

  const { ref: formRef, ready: formReady } = useDeferredMount<HTMLDivElement>();

  /**
   * Shares the element useDeferredMount already watches, but with the plain
   * reading of "on screen" rather than that hook's deliberate 800px head
   * start. This is what separates a visitor who never scrolled to the form
   * from one who saw it and left.
   */
  useInViewOnce(formRef, () => {
    trackEvent(RK_EVENTS.FORM_VIEW, { form_name: FORM_NAME });
  });

  const onNext = () => setCurrentStep(currentStep + 1);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    startTransition(async () => {
      try {
        if (!data.date) {
          setSubmitError("Debe seleccionar una fecha");
          trackEvent(RK_EVENTS.FORM_ERROR, {
            form_name: FORM_NAME,
            error_fields: "date",
          });
          return;
        }

        const token = await getCaptchaToken();

        const sendData = {
          ...data,
          date: formatDate(data.date),
        };

        const result = await submitBookACallFormTrabajadores(
          sendData,
          token,
          shortCode
        );

        if (result.success && data.date) {
          trackTrabajadoresBookACallFormConversion({
            email: data.email,
            phone: data.phoneNumber,
          });

          // Log to Google Sheets
          logToSheet({
            landing: window.location.href,
            channel: "reserva-form-trabajadores",
            phone: data.phoneNumber,
            email: data.email,
          });

          setBookingInfo({
            date: format(data.date, "dd/MM/yyyy"),
            timeSlot: data.timeSlot,
          });
          setCurrentStep(1); // Reset to step 1
        } else {
          // There was no else here: a rejected captcha or a calendar that
          // refused the slot returned { success: false } and the visitor was
          // shown nothing at all, while we recorded nothing at all. Both
          // halves of that were silent.
          setSubmitError(
            result.message ??
              "No pudimos agendar la reunión. Por favor, intenta nuevamente."
          );
          trackEvent(RK_EVENTS.FORM_FAIL, {
            form_name: FORM_NAME,
            fail_reason: result.message ?? "unknown",
          });
        }
      } catch {
        setSubmitError("Error inesperado. Por favor, intenta nuevamente.");
        trackEvent(RK_EVENTS.FORM_FAIL, {
          form_name: FORM_NAME,
          fail_reason: "exception",
        });
        // console.error("Submit error:", error);
      }
    });
  };

  return (
    <m.section
      id="reserva-form-section"
      initial="hidden"
      whileInView="visible"
      className="bg-primary w-full text-white"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative py-16 lg:py-28 2xl:h-screen">
        {bookingInfo && (
          <ReservaFormSuccessFeedback bookingInfo={bookingInfo} />
        )}

        <div className="section-container">
          <m.div
            key="step1"
            className="flex flex-col gap-16 md:flex-row md:justify-between"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="lg:w-1/3">
              <m.div
                className="mb-2 flex gap-8 text-xs font-bold tracking-[3px] uppercase lg:mb-4 lg:text-sm"
                variants={itemVariants}
              >
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={classNames(
                    "text-white/40 uppercase cursor-pointer",
                    {
                      "text-white": currentStep === 1,
                    }
                  )}
                >
                  Paso 1
                </button>

                <span
                  className={classNames("text-white/40", {
                    "text-white": currentStep === 2,
                  })}
                >
                  Paso 2
                </span>
              </m.div>

              <m.h2
                variants={itemVariants}
                className="text-3xl font-semibold md:text-5xl lg:text-4xl"
              >
                Reserva una videollamada gratuita* con nosotros
              </m.h2>
              <m.p
                variants={itemVariants}
                className="mt-4 max-w-2xl text-white/80"
              >
                ¿Necesitas orientación legal? Conéctate con nuestros abogados y
                descubre la mejor estrategia para tu caso.
              </m.p>
              <m.p
                variants={itemVariants}
                className="mt-2 text-xs text-white/60"
              >
                *La evaluación inicial gratuita tiene una duración de 30
                minutos, se otorga previa revisión del caso y está sujeta a sus
                condiciones de acceso y alcance.
              </m.p>
              <m.div variants={itemVariants} className="mt-2">
                <InfoModal
                  triggerLabel="Ver condiciones de la evaluación inicial gratuita"
                  title="Condiciones de la evaluación inicial gratuita"
                >
                  <p>
                    La evaluación inicial gratuita está dirigida principalmente
                    a trabajadores cuya relación laboral haya terminado y se
                    realiza preferentemente por videollamada o,
                    alternativamente, por llamada telefónica o de forma
                    presencial, según disponibilidad y coordinación previa.
                  </p>
                  <p>
                    Para acceder a ella se requiere proporcionar información
                    suficiente para efectuar una revisión preliminar; que el
                    asunto corresponda a nuestras áreas de trabajo; que no
                    exista un conflicto de interés; y que los plazos legales y
                    la disponibilidad del equipo permitan atenderlo
                    responsablemente.
                  </p>
                  <p>
                    También evaluaremos la viabilidad jurídica, práctica y
                    económica del asunto. Esto considera la existencia de una
                    probabilidad razonable de éxito, la proporcionalidad entre
                    el eventual beneficio para el trabajador, los costos y el
                    trabajo requerido, y la posibilidad de que RK Abogados pueda
                    asumir el caso adecuadamente. Esta evaluación es individual
                    y no constituye una garantía de resultado.
                  </p>
                  <p>
                    La reunión incluye orientación preliminar sobre las posibles
                    acciones legales, sus principales riesgos y los próximos
                    pasos. Cuando existan antecedentes suficientes, también
                    podrá incluir una estimación aproximada del monto que podría
                    reclamarse en una eventual demanda.
                  </p>
                  <p>
                    No incluye revisión documental exhaustiva, cálculos
                    definitivos, informes, redacción de escritos, realización de
                    gestiones ni representación judicial o administrativa. La
                    solicitud o realización de la reunión no significa que RK
                    Abogados haya aceptado asumir el caso.
                  </p>
                  <p>
                    La evaluación gratuita podrá utilizarse una vez por persona
                    y por el mismo asunto. Si el caso no reúne estas
                    condiciones, ello no significa que carezca de importancia:
                    cuando corresponda, podremos ofrecer una asesoría pagada u
                    orientar sobre otra modalidad de atención.
                  </p>
                  <p>
                    La modalidad de honorarios a resultado está disponible
                    únicamente para los casos previamente evaluados y aceptados
                    por RK Abogados. Su porcentaje, alcance y condiciones se
                    informarán por escrito antes de contratar.
                  </p>
                </InfoModal>
              </m.div>
            </div>

            <div
              ref={formRef}
              className="flex items-center justify-center lg:w-1/2"
            >
              {formReady ? (
                <Form
                  currentStep={currentStep}
                  onNext={onNext}
                  pending={isPending}
                  submitError={submitError}
                  onSubmit={onSubmit}
                />
              ) : (
                <BookingFormSkeleton />
              )}
            </div>
          </m.div>
        </div>
      </div>
    </m.section>
  );
};
