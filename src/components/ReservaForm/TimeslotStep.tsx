import { useEffect } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { DaySelectorCalendar } from "./DaySelectorCalendar";

interface FieldsWithTimeSlotAndDate {
  timeSlot: string;
  date: Date | null;
}

interface TimeSlotStepProps<T extends FieldValues & FieldsWithTimeSlotAndDate> {
  register: UseFormRegister<T>;
  control: Control<T>;
  errors: FieldErrors<FieldsWithTimeSlotAndDate>;
  setValue: UseFormSetValue<T>;
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

export const TimeSlotStep = <
  T extends FieldValues & FieldsWithTimeSlotAndDate,
>({
  register,
  control,
  errors,
  setValue,
}: TimeSlotStepProps<T>) => {
  const selectedDate = useWatch({
    control,
    name: "date" as Path<T>,
  }) as T["date"];
  const selectedTimeSlot = useWatch({
    control,
    name: "timeSlot" as Path<T>,
  }) as string;

  const isFriday = selectedDate instanceof Date && selectedDate.getDay() === 5;

  useEffect(() => {
    if (isFriday && selectedTimeSlot >= "16:30") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue("timeSlot" as Path<T>, "" as any);
    }
  }, [isFriday, selectedTimeSlot, setValue]);

  const availableSlots = isFriday
    ? timeSlots.filter((slot) => slot < "16:30")
    : timeSlots;

  return (
    <div className="flex flex-col gap-8">
      <DaySelectorCalendar control={control} />

      <div className="relative grid grid-cols-3 lg:grid-cols-7 gap-3">
        {availableSlots.map((slot) => (
          <label key={slot} className="cursor-pointer">
            <input
              {...register("timeSlot" as Path<T>)}
              type="radio"
              value={slot}
              className="sr-only peer"
            />
            <div className="p-2 rounded-sm border border-white/20 transition-colors text-center peer-checked:bg-white peer-checked:text-primary hover:bg-white/10 peer-checked:hover:bg-white">
              {slot}
            </div>
          </label>
        ))}

        {errors.timeSlot && (
          <p className="absolute -bottom-7 text-red-400 text-sm mt-1">
            {errors.timeSlot.message}
          </p>
        )}
      </div>
    </div>
  );
};
