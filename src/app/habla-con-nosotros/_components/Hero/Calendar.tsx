import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface Day {
  date: string;
  isCurrentMonth?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
}

const days: Day[] = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-22", isCurrentMonth: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];

export const Calendar = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center">
        <span className="flex-auto text-sm font-semibold text-gray-900 dark:text-white">
          January 2022
        </span>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon aria-hidden="true" className="size-5" />
        </button>
      </div>
      <div className="mt-10 grid grid-cols-7 text-center text-xs/6 text-gray-500 dark:text-gray-400">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={day.date}
            data-first-line={dayIdx <= 6 ? "" : undefined}
            className="py-2 not-data-first-line:border-t not-data-first-line:border-gray-200 dark:not-data-first-line:border-white/10"
          >
            <button
              type="button"
              data-is-today={day.isToday ? "" : undefined}
              data-is-selected={day.isSelected ? "" : undefined}
              data-is-current-month={day.isCurrentMonth ? "" : undefined}
              className="mx-auto flex size-8 items-center justify-center rounded-full not-data-is-selected:not-data-is-today:not-data-is-current-month:text-gray-400 not-data-is-selected:hover:bg-gray-200 not-data-is-selected:not-data-is-today:data-is-current-month:text-gray-900 data-is-selected:font-semibold data-is-selected:text-white data-is-selected:not-data-is-today:bg-gray-900 data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-600 data-is-selected:data-is-today:bg-indigo-600 dark:not-data-is-selected:not-data-is-today:not-data-is-current-month:text-gray-500 dark:not-data-is-selected:hover:bg-white/10 dark:not-data-is-selected:not-data-is-today:data-is-current-month:text-white dark:data-is-selected:not-data-is-today:bg-white dark:data-is-selected:not-data-is-today:text-gray-900 dark:not-data-is-selected:data-is-today:text-indigo-400 dark:data-is-selected:data-is-today:bg-indigo-500"
            >
              <time dateTime={day.date}>
                {day.date.split("-").pop()?.replace(/^0/, "")}
              </time>
            </button>
          </div>
        ))}
      </div>

      <Button className="mt-8">
        <span className="text-sm font-semibold">Confirma Reserva</span>
      </Button>
    </div>
  );
};
