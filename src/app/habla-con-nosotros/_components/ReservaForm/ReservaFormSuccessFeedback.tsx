"use client";

import { motion } from "framer-motion";

export const ReservaFormSuccessFeedback = () => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-7xl h-fit p-8 bg-white/90 border text-black border-white/20 rounded-lg flex flex-col items-center justify-center text-center gap-8 px-4 md:px-8 max-w-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-3xl lg:text-4xl md:text-5xl font-semibold">
          ¡Gracias por reservar una llamada con nosotros!
        </h2>
        <p className="max-w-2xl text-black">
          Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto
          para confirmar los detalles de la llamada.
        </p>
      </motion.div>
    </motion.div>
  );
};
