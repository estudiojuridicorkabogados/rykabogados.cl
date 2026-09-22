"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { stagger } from "motion/react";
import * as m from "motion/react-m";
import dynamic from "next/dynamic";

import { submitBookACallFormEmpresas } from "@/actions/submitBookACallFormEmpresas";
import { InfoModal } from "@/components/InfoModal/InfoModal";
import { BookingFormSkeleton } from "@/components/ReservaForm/BookingFormSkeleton";
import { useDeferredMount } from "@/hooks/useDeferredMount";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useTracking } from "@/hooks/useTracking";
import { getCaptchaToken } from "@/lib/google/re-captcha/getCaptchaToken";
import {
  RK_EVENTS,
  trackEmpresasBookACallFormConversion,
  trackEvent,
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

const FORM_NAME = "empresas" as const;

export const ReservaFormEmpresas = () => {
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

        const result = await submitBookACallFormEmpresas(
          sendData,
          token,
          shortCode
        );

        if (result.success && data.date) {
          trackEmpresasBookACallFormConversion({
            email: data.email,
            phone: data.phoneNumber,
          });

          // Log to Google Sheets
          logToSheet({
            landing: window.location.href,
            channel: "reserva-form-empresas",
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
      <div className="relative py-16 lg:py-28">
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
                Agenda una reunión con nuestro equipo
              </m.h2>
              <m.p
                variants={itemVariants}
                className="mt-4 max-w-2xl text-white/80"
              >
                Selecciona el horario que más te acomode. En el siguiente paso
                podrás elegir la modalidad de reunión o asesoría que mejor
                responda a las necesidades de tu empresa.
              </m.p>
              <m.p
                variants={itemVariants}
                className="mt-4 max-w-2xl text-white/80"
              >
                Un abogado te contactará dentro de las próximas{" "}
                <b>24 horas hábiles</b> para confirmar la reserva y solicitar,
                si corresponde, los antecedentes necesarios.
              </m.p>
              <m.p
                variants={itemVariants}
                className="mt-2 text-xs text-white/60"
              >
                *Las reuniones y asesorías están sujetas a confirmación,
                disponibilidad y condiciones generales del servicio.
              </m.p>

              <MasInformacionEmpresasModal />
            </div>

            <div
              ref={formRef}
              className="flex items-center justify-center lg:w-1/2"
            >
              {formReady ? (
                <Form
                  currentStep={currentStep}
                  pending={isPending}
                  submitError={submitError}
                  onNext={onNext}
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

const MasInformacionEmpresasModal = () => {
  return (
    <m.div variants={itemVariants} className="mt-2">
      <InfoModal
        triggerLabel="Ver condiciones generales del servicio"
        title="Condiciones generales del servicio"
      >
        <p>
          Las reuniones se realizan preferentemente por videollamada o,
          alternativamente, por llamada telefónica o de forma presencial, según
          disponibilidad y coordinación previa.
        </p>
        <p>
          En el siguiente paso se informarán la duración, el alcance y el valor
          de cada modalidad.
        </p>
        <p>
          El análisis y las recomendaciones se elaborarán sobre la base de la
          información y los documentos disponibles, por lo que podrán variar si
          posteriormente se proporcionan nuevos antecedentes.
        </p>
        <p>
          Salvo que se indique expresamente lo contrario, una reunión no incluye
          revisión documental exhaustiva, redacción de contratos o escritos,
          auditorías, realización de gestiones ni representación judicial o
          administrativa. Estos servicios podrán cotizarse separadamente.
        </p>
        <p>
          La reserva o realización de una reunión no implica que RK Abogados
          haya aceptado asumir una representación. La contratación comenzará
          cuando el estudio confirme por escrito la aceptación del asunto, el
          cliente apruebe la propuesta de servicios y se formalicen los
          documentos correspondientes.
        </p>
        <p>
          RK Abogados podrá no aceptar una solicitud cuando exista un conflicto
          de interés, el asunto esté fuera de sus áreas de trabajo, falten
          antecedentes indispensables, los plazos o la disponibilidad del equipo
          impidan una atención responsable, o la solicitud resulte contraria a
          la ley o a la ética profesional. Estas decisiones se adoptarán
          conforme a criterios profesionales, objetivos y no discriminatorios.
        </p>
        <p>
          Nuestro compromiso es entregar una asesoría o evaluación clara,
          responsable y confidencial.
        </p>
      </InfoModal>
    </m.div>
  );
};
