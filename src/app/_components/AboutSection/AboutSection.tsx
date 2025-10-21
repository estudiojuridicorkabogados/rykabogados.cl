"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { URLS } from "@/lib/utils/constants";

import { Stats } from "./Stats";

export const AboutSection = () => {
  const router = useRouter();

  const navigateToContacto = () => router.push(URLS.contacts());

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="lg:max-w-6xl 2xl:max-w-7xl xl:w-7xl  mx-auto px-6 flex flex-col lg:flex-row gap-y-8 gap-x-24 items-start">
        <motion.div
          className="flex flex-col gap-6 flex-1"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-[#0B142D] leading-tight"
          >
            Nuestra Misión
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="lg:text-lg text-gray-600 leading-relaxed mb-2"
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
          className="flex items-center lg:h-full w-full lg:flex-1 lg:pt-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Stats
            className="lg:w-[206px]"
            title="Trabajadores"
            value={1490}
            startFrom={900}
          />
          <Stats className="lg:w-[153px]" title="Empresas" value={100} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full flex mt-4 lg:hidden"
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
