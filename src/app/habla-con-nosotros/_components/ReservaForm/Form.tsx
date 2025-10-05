"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, stagger, Variants } from "motion/react";
import { int, z } from "zod";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { Button } from "@/components/ui/Button";
import { itemVariants } from "@/lib/utils/animations";

import { PersonalInfoStep } from "./PersonalInfoStep";
import { TimeSlotStep } from "./TimeslotStep";
import { FormData, formSchema } from "./types";

interface FormProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSuccess: () => void;
}

export const Form: React.FC<FormProps> = ({
  currentStep,
  onNext,
  onPrev,
  onSuccess,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const nextStep = async () => {
    // Validate current step fields
    const isValid = await trigger(
      currentStep === 1 ? ["timeSlot", "date"] : ["name", "email", "phoneNumber"]
    );

    if (isValid) {
      onNext();
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    onSuccess();
  };

  console.log("Errors:", errors);

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
                  <TimeSlotStep register={register} control={control} errors={errors} />

                  <div className="w-full flex mt-8 justify-end">
                    <Button
                      animateOnClick
                      variant="white-outline-on-primary"
                      className="w-full lg:w-fit group"
                      type="button"
                      onClick={nextStep}
                    >
                      Proximo{" "}
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
                  <PersonalInfoStep register={register} errors={errors} />

                  <div className="w-full flex mt-12 justify-end">
                    <Button
                      animateOnClick
                      onClick={() => console.log("LCIK")}
                      variant="white-outline-on-primary"
                      className="w-full lg:w-fit group"
                      type="submit"
                    >
                      Enviar{" "}
                      <LongArrowRight className="ml-2 stroke-white group-hover:stroke-primary group-hover:animate-wiggle" />
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
