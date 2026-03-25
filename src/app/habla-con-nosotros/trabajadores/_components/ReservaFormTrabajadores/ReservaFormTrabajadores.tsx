"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { motion, stagger } from "motion/react";

import { submitBookACallFormTrabajadores } from "@/actions/submitBookACallFormTrabajadores";
import { useTracking } from "@/hooks/useTracking";
import { getCaptchaToken } from "@/lib/google/re-captcha/getCaptchaToken";
import { trackBookACallFormConversion } from "@/lib/utils/analytics";
import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";
import { getSessionCode } from "@/lib/utils/tracking";

import { Form } from "./Form";
import {
  BookingInfo,
  ReservaFormSuccessFeedback,
} from "./ReservaFormSuccessFeedback";
import { FormData } from "./types";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const ReservaFormTrabajadores = () => {
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { logToSheet } = useTracking();

  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);

  const [currentStep, setCurrentStep] = useState(1);

  const onNext = () => setCurrentStep(currentStep + 1);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    startTransition(async () => {
      try {
        if (!data.date) {
          setSubmitError("Debe seleccionar una fecha");
          return;
        }

        const token = await getCaptchaToken();

        const sendData = {
          ...data,
          date: formatDate(data.date),
        };

        trackBookACallFormConversion();

        const sessionCode = getSessionCode();
        const result = await submitBookACallFormTrabajadores(
          sendData,
          token,
          sessionCode
        );

        if (result.success && data.date) {
          // Log to Google Sheets
          logToSheet({
            landing: window.location.href,
            channel: "reserva-form-trabjadores",
            phone: data.phoneNumber,
            email: data.email,
          });

          setBookingInfo({
            date: format(data.date, "dd/MM/yyyy"),
            timeSlot: data.timeSlot,
          });
          setCurrentStep(1); // Reset to step 1
        }
      } catch {
        setSubmitError("Error inesperado. Por favor, intenta nuevamente.");
        // console.error("Submit error:", error);
      }
    });
  };

  return (
    <motion.section
      id="reserva-form-section"
      initial="hidden"
      whileInView="visible"
      className="w-full bg-primary text-white"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="py-16 lg:py-28 2xl:h-screen relative">
        {bookingInfo && (
          <ReservaFormSuccessFeedback bookingInfo={bookingInfo} />
        )}

        <div className="section-container">
          <motion.div
            key="step1"
            className="flex flex-col gap-16 md:flex-row md:justify-between"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="lg:w-1/3">
              <motion.div
                className="uppercase flex gap-8 text-xs lg:text-sm font-bold mb-2 lg:mb-4 tracking-[3px]"
                variants={itemVariants}
              >
                <span
                  onClick={() => setCurrentStep(1)}
                  className={classNames("text-white/40 cursor-pointer", {
                    "text-white": currentStep === 1,
                  })}
                >
                  Paso 1
                </span>

                <span
                  className={classNames("text-white/40", {
                    "text-white": currentStep === 2,
                  })}
                >
                  Paso 2
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl lg:text-4xl md:text-5xl font-semibold"
              >
                Reserva una llamada gratuita con nosotros
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-2xl text-white/80"
              >
                ¿Necesitas orientación legal? Conéctate con nuestros abogados y
                descubre la mejor estrategia para tu caso.
              </motion.p>
            </div>

            <div className="flex items-center justify-center lg:w-1/2">
              <Form
                currentStep={currentStep}
                onNext={onNext}
                pending={isPending}
                submitError={submitError}
                onSubmit={onSubmit}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
