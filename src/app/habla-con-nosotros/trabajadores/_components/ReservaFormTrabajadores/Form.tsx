"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";

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
    <motion.div variants={itemVariants} className="w-full">
      <form
        className="lg:h-[600px]"
        id="reserva-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <motion.div
            className="flex flex-col"
            animate={{ height: "auto" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TimeSlotStep
                    register={register}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                  />

                  <div className="w-full flex mt-8 justify-end">
                    <Button
                      animateOnClick
                      variant="white-outline-on-primary"
                      className="w-full lg:w-fit group"
                      type="button"
                      disabled={pending}
                      onClick={nextStep}
                    >
                      Próximo{" "}
                      <LongArrowRight className="ml-2 stroke-white group-hover:stroke-primary group-hover:animate-wiggle" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
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

                  <div className="w-full flex mt-12 justify-end">
                    <Button
                      animateOnClick
                      onClick={() => null}
                      variant="white-outline-on-primary"
                      className="w-full lg:w-60 group"
                      type="submit"
                      disabled={pending}
                    >
                      {pending ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          Agenda tu asesoría{" "}
                          <LongArrowRight className="ml-2 stroke-white group-hover:stroke-primary group-hover:animate-wiggle" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};
