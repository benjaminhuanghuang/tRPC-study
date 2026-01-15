import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { addDays, format, isSameDay, isSameMonth } from 'date-fns';
import { type FC } from 'react';

interface DayProps {
  date: Date;
  isLoading: boolean;
  available: boolean;
  onSelect: (date: Date) => void;
  isSelected?: boolean;
}

const Day: FC<DayProps> = ({
  date,
  isLoading,
  available,
  onSelect,
  isSelected = false,
}) => {
  const isToday = isSameDay(date, new Date());
  const isPast = date.getTime() < Date.now() && !isToday;
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const disabled = isLoading || isPast || isWeekend;

  const className = clsx(
    'flex h-10 w-10 flex-col items-center justify-center rounded p-1.5 transition-colors duration-100',
    {
      'border-2 border-red-600': isToday && !isSelected,
      'border-2 border-indigo-600': isSelected,
      'bg-gray-50 text-gray-400': !disabled,
      'bg-green-100 text-green-800': !disabled && available,
      'bg-yellow-100 text-yellow-800': !disabled && !available,
    },
  );

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={() => onSelect(date)}
    >
      {format(date, 'd')}
    </button>
  );
};

interface CalendarProps {
  month: Date;
  availableDayMap?: { [key: string]: boolean };
  onSelectDay: (day: Date) => void;
  selectedDay?: Date;
  onGoToPreviousMonth?: () => void;
  onGoToNextMonth?: () => void;
}
const OneMonth: FC<CalendarProps> = ({
  month,
  availableDayMap,
  onSelectDay,
  selectedDay,
  onGoToPreviousMonth,
  onGoToNextMonth,
}) => {
  const daysInMonth = Array.from({ length: 42 }, (_, i) =>
    addDays(month, i - ((month.getDay() - 1) % 7)),
  );

  return (
    <div className="flex select-none flex-col items-center">
      <div className="mb-2 flex w-full flex-row items-center justify-center">
        <div>
          {onGoToPreviousMonth && (
            <button
              className="rounded border border-gray-400 p-0.5 hover:bg-gray-50"
              onClick={onGoToPreviousMonth}
              title="Go to previous month"
            >
              <ChevronLeftIcon className="h-4 w-4 text-gray-700" />
            </button>
          )}
        </div>
        <h1 className="*">{format(month, 'MMMM yyyy')}</h1>
        <div>
          {onGoToNextMonth && (
            <button
              className="rounded border border-gray-400 p-0.5 hover:bg-gray-50"
              onClick={onGoToNextMonth}
              title="Go to next month"
            >
              <ChevronRightIcon className="h-4 w-4 text-gray-700" />
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-7 grid-rows-6 gap-1.5">
        {daysInMonth.map((day) => {
          if (!isSameMonth(day, month)) {
            return <div key={day.getTime()} />;
          }
          return (
            <Day
              key={day.getTime()}
              date={day}
              isLoading={!availableDayMap}
              available={availableDayMap?.[format(day, 'yyyy-MM-dd')] ?? true}
              onSelect={() => onSelectDay(day)}
              isSelected={selectedDay && isSameDay(day, selectedDay)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OneMonth;
