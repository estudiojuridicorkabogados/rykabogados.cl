"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { URLS } from "@/lib/utils/constants";

export const AboutSection = () => {
  const router = useRouter();

  const navigateToContacto = () => router.push(URLS.contacts());

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto flex flex-col items-start gap-x-24 gap-y-8 px-6 lg:max-w-6xl lg:flex-row xl:w-7xl 2xl:max-w-7xl">
        <motion.div
          className="flex flex-1 flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl leading-tight font-bold text-[#0B142D] lg:text-5xl"
          >
            Nuestra Misión
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-2 leading-relaxed text-gray-600 lg:max-w-2xl lg:text-lg"
          >
            En Retamales Kowalski Abogados brindamos soluciones jurídicas
            efectivas y personalizadas, adaptadas a las necesidades reales de
            cada cliente. Nuestro equipo, especializado en Derecho Laboral,
            combina experiencia técnica, criterio práctico y cercanía humana
            para diseñar estrategias sólidas y sostenibles. Buscamos construir
            relaciones de confianza duradera, basadas en la transparencia, la
            lealtad y un compromiso constante con la excelencia profesional.
          </motion.p>

          <motion.div variants={itemVariants} className="hidden lg:block">
            <Button
              className="w-fit"
              variant="default"
              size="lg"
              animateOnClick
              onClick={navigateToContacto}
            >
              Contáctanos
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-4 flex w-full lg:hidden"
        >
          <Button
            className="w-full"
            variant="default"
            size="lg"
            animateOnClick
            onClick={navigateToContacto}
          >
            Contáctanos
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
