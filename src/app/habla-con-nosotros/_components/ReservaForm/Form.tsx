"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, stagger, Variants } from "motion/react";
import { z } from "zod";

import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";

import { PersonalInfoStep } from "./PersonalInfoStep";
import { TimeSlotStep } from "./TimeslotStep";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  timeSlot: z.string().min(1, "Selecciona un horario"),
});

type FormData = z.infer<typeof formSchema>;

export const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const nextStep = async () => {
    // Validate current step fields
    const isValid = await trigger(
      currentStep === 1 ? ["name", "email"] : ["timeSlot"]
    );
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <motion.div variants={itemVariants} className="w-full">
      <form id="reserva-form" onSubmit={handleSubmit(onSubmit)}>
        {/* {currentStep === 1 && (
          <PersonalInfoStep
            register={register}
            errors={errors}
            onNext={nextStep}
          />
        )}

        {currentStep === 2 && (
          <TimeSlotStep
            register={register}
            errors={errors}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )} */}

         <TimeSlotStep
            register={register}
            errors={errors}
            onNext={nextStep}
            onPrev={prevStep}
          />
      </form>
    </motion.div>
  );
};
