"use client";

import { useMemo, useRef, useState } from "react";
import { addMonths, format, isBefore, isSameDay, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "react-calendar";
import { Control, FieldValues, Path, useController } from "react-hook-form";

import { classNames } from "@/lib/utils/classNames";

interface DaySelectorCalendarProps<T extends FieldValues> {
  control: Control<T>;
}

export const DaySelectorCalendar = <T extends FieldValues>({
  control,
}: DaySelectorCalendarProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({
    name: "date" as Path<T>,
    control,
    rules: {
      required: "Por favor selecciona una fecha",
    },
  });

  const { today, maxDate } = useMemo(() => {
    const now = new Date();

    return { today: now, maxDate: addMonths(now, 3) };
  }, []);

  const [displayMonthText, setDisplayMonthText] = useState(() =>
    formatMonthYear(today)
  );
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  /* oxlint-disable-next-line typescript/no-explicit-any -- react-calendar exposes no ref type */
  const ref = useRef<any>(null);

  const onGoToPrevMonth = () => {
    if (!ref.current) return;

    const prevMonthDate = addMonths(ref.current.activeStartDate, -1);
    ref.current.setActiveStartDate(prevMonthDate);

    setDisplayMonthText(formatMonthYear(prevMonthDate));
    setPrevDisabled(isBefore(prevMonthDate, today));
    setNextDisabled(false);
  };

  const onGoToNextMonth = () => {
    if (!ref.current) return;

    const nextMonthDate = addMonths(ref.current.activeStartDate, 1);
    ref.current.setActiveStartDate(nextMonthDate);

    const shouldNextDisabled =
      isSameDay(nextMonthDate, maxDate) || isBefore(maxDate, nextMonthDate);

    setDisplayMonthText(formatMonthYear(nextMonthDate));
    setNextDisabled(shouldNextDisabled);
    setPrevDisabled(false);
  };

  return (
    <div className="relative space-y-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-white capitalize">
          {displayMonthText}
        </span>
        <div className="flex items-center gap-1">
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
        minDate={today}
        maxDate={maxDate}
        minDetail="month"
        onChange={onChange}
        formatShortWeekday={(_, date) => {
          return format(date, "EEEEE", { locale: es }).toUpperCase();
        }}
        tileClassName={({ date, activeStartDate }) => {
          const isCurrentDay = isToday(date);
          const isSelected =
            // oxlint-disable-next-line typescript/no-explicit-any -- react-hook-form field value is loosely typed
            (value as any) instanceof Date
              ? isSameDay(date, value as Date)
              : false;

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
        <p className="absolute bottom-0 mt-1 text-sm text-red-400">
          {fieldError.message}
        </p>
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
      className="flex size-8 cursor-pointer items-center justify-center rounded-full hover:bg-white/10 disabled:cursor-not-allowed"
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
