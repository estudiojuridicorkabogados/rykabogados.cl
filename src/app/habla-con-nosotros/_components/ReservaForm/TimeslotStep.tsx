import { DaySelectorCalendar } from "./DaySelectorCalendar";

interface TimeSlotStepProps {
  register: any;
  errors: any;
}

const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export const TimeSlotStep: React.FC<TimeSlotStepProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <DaySelectorCalendar register={register} errors={errors} />

      <div className="grid lg:grid-cols-7 gap-3">
        {timeSlots.map((slot) => (
          <label key={slot} className="cursor-pointer">
            <input
              {...register("timeSlot")}
              type="radio"
              value={slot}
              className="sr-only peer"
            />
            <div className="p-2 rounded-sm border border-white/20 transition-colors text-center peer-checked:bg-white peer-checked:text-primary hover:bg-white/10 peer-checked:hover:bg-white">
              {slot}
            </div>
          </label>
        ))}
      </div>
      {errors.timeSlot && (
        <p className="text-red-300 text-sm mt-1">{errors.timeSlot.message}</p>
      )}
    </div>
  );
};
