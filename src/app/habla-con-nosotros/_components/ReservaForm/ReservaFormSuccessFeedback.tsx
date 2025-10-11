export const ReservaFormSuccessFeedback = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs">
      <div className="w-7xl h-fit p-8 bg-white/90 border text-black border-white/20 rounded-lg flex flex-col items-center justify-center text-center gap-8 px-4 md:px-8 max-w-3xl">
      <h2 className="text-3xl lg:text-4xl md:text-5xl font-semibold">
        ¡Gracias por reservar una llamada con nosotros!
      </h2>
      <p className="max-w-2xl text-black">
        Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto
        para confirmar los detalles de la llamada.
      </p>

      </div>
      {/* <div className="flex flex-col items-center justify-center text-center gap-8 px-4 md:px-8 max-w-3xl">
      </div> */}
    </div>
  );
};
