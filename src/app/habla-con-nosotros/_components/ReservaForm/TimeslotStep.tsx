import { DaySelectorCalendar } from "./DaySelectorCalendar";

interface TimeSlotStepProps {
  register: any;
  errors: any;
  onNext: () => void;
  onPrev: () => void;
}

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

export const TimeSlotStep: React.FC<TimeSlotStepProps> = ({
  register,
  errors,
  onNext,
  onPrev,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-4">
          Selecciona un horario
        </label>

        <DaySelectorCalendar register={register} errors={errors} />

        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot) => (
            <label key={slot} className="cursor-pointer">
              <input
                {...register("timeSlot")}
                type="radio"
                value={slot}
                className="sr-only"
              />
              <div className="p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-center">
                {slot}
              </div>
            </label>
          ))}
        </div>
        {errors.timeSlot && (
          <p className="text-red-300 text-sm mt-1">{errors.timeSlot.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 bg-transparent border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="flex-1 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Reservar llamada
        </button>
      </div>
    </div>
  );
};
