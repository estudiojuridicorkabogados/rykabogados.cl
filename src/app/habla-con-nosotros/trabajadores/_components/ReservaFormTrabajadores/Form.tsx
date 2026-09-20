"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useForm } from "react-hook-form";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { TimeSlotStep } from "@/components/ReservaForm/TimeslotStep";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { itemVariants } from "@/lib/utils/animations";

import { PersonalInfoStep } from "./PersonalInfoStep";
import { FormData, formSchema } from "./types";

interface FormProps {
  currentStep: number;
  pending: boolean;
  submitError: string | null;
  onNext: () => void;
  onSubmit: (formData: FormData) => void;
}

const AVAILABLE_TIME_SLOTS = [
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export const Form: React.FC<FormProps> = ({
  currentStep,
  pending,
  onNext,
  onSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const nextStep = async () => {
    // Validate current step fields
    const isValid = await trigger(
      currentStep === 1
        ? ["timeSlot", "date"]
        : [
            "name",
            "email",
            "phoneNumber",
            "causalDespido",
            "antiguedadLaboral",
            "mensaje",
          ]
    );

    if (isValid) {
      onNext();
    }
  };

  return (
    <m.div variants={itemVariants} className="w-full">
      <form
        className="lg:h-[600px]"
        id="reserva-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <m.div
            className="flex flex-col"
            animate={{ height: "auto" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <m.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TimeSlotStep
                    availableTimeSlots={AVAILABLE_TIME_SLOTS}
                    register={register}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                  />

                  <div className="mt-8 flex w-full justify-end">
                    <Button
                      animateOnClick
                      variant="white-outline-on-primary"
                      className="group w-full lg:w-fit"
                      type="button"
                      disabled={pending}
                      onClick={nextStep}
                    >
                      Próximo{" "}
                      <LongArrowRight className="group-hover:stroke-primary group-hover:animate-wiggle ml-2 stroke-white" />
                    </Button>
                  </div>
                </m.div>
              )}

              {currentStep === 2 && (
                <m.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PersonalInfoStep
                    register={register}
                    control={control}
                    errors={errors}
                  />

                  <div className="mt-12 flex w-full justify-end">
                    <Button
                      animateOnClick
                      onClick={() => null}
                      variant="white-outline-on-primary"
                      className="group w-full lg:w-60"
                      type="submit"
                      disabled={pending}
                    >
                      {pending ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          Agenda tu asesoría{" "}
                          <LongArrowRight className="group-hover:stroke-primary group-hover:animate-wiggle ml-2 stroke-white" />
                        </>
                      )}
                    </Button>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </form>
    </m.div>
  );
};
