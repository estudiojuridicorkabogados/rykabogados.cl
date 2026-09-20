/**
 * Placeholder for the booking form while its chunk loads. Sized to the real
 * form so swapping it in does not shift the page.
 */
export const BookingFormSkeleton = () => (
  <div
    className="w-full max-w-md space-y-4"
    aria-busy="true"
    aria-label="Cargando formulario de reserva"
  >
    <div className="loading-background-animation h-[320px] w-full rounded-2xl" />
    <div className="loading-background-animation h-12 w-full rounded-xl" />
  </div>
);
