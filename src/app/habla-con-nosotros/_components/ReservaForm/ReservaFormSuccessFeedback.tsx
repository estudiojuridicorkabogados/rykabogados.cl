export const ReservaFormSuccessFeedback = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/95 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center text-center gap-8 px-4 md:px-8 max-w-3xl">
        <h2 className="text-3xl lg:text-4xl md:text-5xl font-semibold">
          ¡Gracias por reservar una llamada con nosotros!
        </h2>
        <p className="max-w-2xl text-white/80">
          Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto
          para confirmar los detalles de la llamada.
        </p>
      </div>
    </div>
  );
};
