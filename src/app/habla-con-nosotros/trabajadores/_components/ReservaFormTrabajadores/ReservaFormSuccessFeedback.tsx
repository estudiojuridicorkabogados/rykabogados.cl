"use client";

import { motion } from "framer-motion";

export interface BookingInfo {
  date: string;
  timeSlot: string;
}
interface ReservaFormSuccessFeedbackProps {
  bookingInfo?: BookingInfo | null;
}

export const ReservaFormSuccessFeedback: React.FC<
  ReservaFormSuccessFeedbackProps
> = ({ bookingInfo }) => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-primary flex h-fit w-7xl max-w-3xl flex-col items-center justify-center gap-8 rounded-lg border border-white/20 p-8 px-4 text-center text-white md:px-8 lg:px-32 lg:py-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-3xl font-semibold md:text-5xl lg:text-4xl">
          ¡Gracias por reservar una llamada con nosotros!
        </h2>
        <p className="max-w-2xl">
          Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto
          para confirmar los detalles de la llamada.
        </p>

        <div className="flex w-full flex-row items-center justify-between rounded border-2 border-[#00C3FF] px-4 py-2">
          <p className="text-lg text-white/80">Cita</p>

          <div className="flex flex-row gap-8">
            <p className="text-lg text-white/80">{bookingInfo?.date}</p>
            <p className="text-lg text-white/80">{bookingInfo?.timeSlot}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
