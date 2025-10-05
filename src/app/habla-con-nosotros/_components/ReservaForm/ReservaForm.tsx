"use client";

import { useState } from "react";
import { AnimatePresence, motion, stagger } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";

import { Form } from "./Form";

export const ReservaForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const onNext = () => setCurrentStep(currentStep + 1);

  const onPrev = () => setCurrentStep(currentStep - 1);

  const onSuccess = () => setSuccess(true);

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
      <div className="py-16 lg:py-28 lg:h-[100vh]">
        <div className="px-6 lg:mx-auto lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl">
          <AnimatePresence mode="wait">
            {!success && (
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
                    Reserva una llamada gratuita con uno de nuestros abogados
                    para discutir tus necesidades legales y descubrir cómo
                    podemos ayudarte.
                  </motion.p>
                </div>

                <div className="flex items-center justify-center lg:w-1/2">
                  <Form
                    currentStep={currentStep}
                    onNext={onNext}
                    onPrev={onPrev}
                    onSuccess={onSuccess}
                  />
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center text-center gap-4 md:gap-6 lg:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl lg:text-4xl md:text-5xl font-semibold">
                  ¡Gracias por reservar una llamada!
                </h2>
                <p className="max-w-2xl text-white/80">
                  Hemos recibido tu solicitud y nos pondremos en contacto
                  contigo pronto. Mientras tanto, te invitamos a ver los videos
                  informativos que hemos preparado especialmente para ti. En
                  ellos encontrarás información valiosa sobre tus derechos
                  legales y cómo podemos ayudarte a resolver tu situación.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};
