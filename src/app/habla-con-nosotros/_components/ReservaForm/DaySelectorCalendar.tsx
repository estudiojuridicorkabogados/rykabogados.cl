import { useRef, useState } from "react";
import Calendar from "react-calendar";
import { Control, useController } from "react-hook-form";
import { addMonths, format, isBefore, isSameDay, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { classNames } from "@/lib/utils/classNames";

import { FormData } from "./types";

interface DaySelectorCalendarProps {
  control: Control<FormData>;
}

export const DaySelectorCalendar: React.FC<DaySelectorCalendarProps> = ({
  control,
}) => {
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({
    name: "date",
    control,
    rules: {
      required: "Por favor selecciona una fecha",
    },
  });

  const [displayMonthText, setDisplayMonthText] = useState(
    formatMonthYear(new Date())
  );
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const ref = useRef<any>(null);

  const onGoToPrevMonth = () => {
    if (!ref.current) return;

    const prevMonthDate = addMonths(ref.current.activeStartDate, -1);
    ref.current.setActiveStartDate(prevMonthDate);

    setDisplayMonthText(formatMonthYear(prevMonthDate));
    setPrevDisabled(isBefore(prevMonthDate, new Date()));
    setNextDisabled(false);
  };

  const onGoToNextMonth = () => {
    if (!ref.current) return;

    const nextMonthDate = addMonths(ref.current.activeStartDate, 1);
    ref.current.setActiveStartDate(nextMonthDate);

    const shouldNextDisabled =
      isSameDay(nextMonthDate, addMonths(new Date(), 3)) ||
      isBefore(addMonths(new Date(), 3), nextMonthDate);

    setDisplayMonthText(formatMonthYear(nextMonthDate));
    setNextDisabled(shouldNextDisabled);
    setPrevDisabled(false);
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-white capitalize">
          {displayMonthText}
        </span>
        <div className="flex gap-1 items-center">
          <MonthSelectorButton
            direction="prev"
            disabled={prevDisabled}
            onClick={onGoToPrevMonth}
          />

          <MonthSelectorButton
            direction="next"
            disabled={nextDisabled}
            onClick={onGoToNextMonth}
          />
        </div>
      </div>

      <Calendar
        showNeighboringMonth
        ref={ref}
        value={value}
        locale="es"
        minDate={new Date()}
        maxDate={addMonths(new Date(), 3)}
        minDetail="month"
        onChange={onChange}
        formatShortWeekday={(_, date) => {
          return format(date, "EEEEE", { locale: es }).toUpperCase();
        }}
        tileClassName={({ date, activeStartDate }) => {
          const isCurrentDay = isToday(date);
          const isSelected =
            value instanceof Date ? isSameDay(date, value) : false;

          const isDifferentMonth =
            date.getMonth() !== activeStartDate.getMonth();

          return classNames("button-calendar", {
            selected: isSelected,
            "current-day": isCurrentDay,
            "different-month": isDifferentMonth,
          });
        }}
        tileDisabled={({ date, view }) => {
          const day = date.getDay();

          return view === "month" && (day === 0 || day === 6); // Disable Sundays and Saturdays
        }}
      />

      {fieldError && (
        <p className="absolute bottom-0 text-red-400 text-sm mt-1">{fieldError.message}</p>
      )}
    </div>
  );
};

interface MonthSeletorButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

const MonthSelectorButton: React.FC<MonthSeletorButtonProps> = ({
  direction,
  disabled,
  onClick,
}) => {
  return (
    <button
      className="flex items-center justify-center size-8 hover:bg-white/10 rounded-full cursor-pointer disabled:cursor-not-allowed"
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {direction === "prev" ? (
        <ChevronLeft
          size={16}
          className={disabled ? "stroke-white/30" : "stroke-white"}
        />
      ) : (
        <ChevronRight
          size={16}
          className={disabled ? "stroke-white/30" : "stroke-white"}
        />
      )}
    </button>
  );
};

function formatMonthYear(date: Date) {
  return format(date, "MMMM yyyy", { locale: es });
}
