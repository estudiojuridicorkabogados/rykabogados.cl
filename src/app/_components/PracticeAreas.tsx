import { URLS } from "@/utils/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";

 /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;


export const PracticeAreasSection = () => {
  return (
    <section
      id="areas-de-practica"
      className="relative w-screen h-[590px] overflow-hidden"
    >
      <Image
        src="/images/documents.webp"
        alt="Some docu,ents"
        layout="fill"
        objectFit="cover"
        objectPosition="center top"
      />

      <motion.div className="absolute h-[460px] bottom-0 left-0 right-0 w-full bg-crazy-gradient/70 backdrop-blur-[120px] flex flex-col justify-center">
        <div className="w-6xl mx-auto flex flex-col gap-8 p-8">
          <span className="w-full uppercase text-sm text-accent font-bold">
            SECTOR DE TRABAJO
          </span>
          <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-16">
            <PracticeArea
              title="Trabajadores"
              description="En R&O ABOGADOS contamos con un equipo de profesionales
                calificados, comprometidos y dispuestos a entregar una asesoría
                integral que le permita dar cumplimiento a la normativa laboral
                y previsional vigente, prevenir infracciones y/o defenderlo ante
                sanciones, demandas o multas generadas con ocasión del trabajo"
              link={URLS.asesoriaTrabajadores()}
            />

            <PracticeArea
              title="Empresas"
              description="En R&O ABOGADOS contamos con un equipo de profesionales
                calificados, comprometidos y dispuestos a entregar una asesoría
                integral que le permita dar cumplimiento a la normativa laboral
                y previsional vigente, prevenir infracciones y/o defenderlo ante
                sanciones, demandas o multas generadas con ocasión del trabajo"
              link={URLS.asesoriaEmpresas()}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

interface PracticeAreaProps {
  title: string;
  description: string;
  link: string;
}

const PracticeArea: React.FC<PracticeAreaProps> = ({
  title,
  description,
  link,
}) => (
  <div className="flex-1 flex flex-col gap-4">
    <h2 className="text-3xl lg:text-4xl font-bold text-white">{title}</h2>
    <p className="text-lg text-white">{description}</p>

    <Link
      className="flex items-center font-semibold mt-4 text-accent"
      href={link}
    >
      Ver más <ArrowRight className="ml-2 stroke-accent" />
    </Link>
  </div>
);
