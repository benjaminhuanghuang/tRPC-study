import { addMonths, format, startOfDay, startOfMonth } from 'date-fns';
import { type FC, useContext, useState } from 'react';

import { PrimaryButton, SecondaryButton } from './buttons';
import bookingFlowContext from './bookingFlowContext';
import OneMonth from './OneMonth';

import trpc from './trpc';
import SelectSlot from './SelectSlot';

function uniqueBy<T>(elements: Array<T>, fn: (element: T) => string): Array<T> {
  return elements.reduce((acc, element) => {
    if (!acc.some((accElement) => fn(accElement) === fn(element))) {
      acc.push(element);
    }
    return acc;
  }, [] as Array<T>);
}

const ChooseDatePage: FC = () => {
  const { onGoBack, onProceed, state, updateState } =
    useContext(bookingFlowContext);
  const [thisMonth, setThisMonth] = useState(startOfMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    state.time && startOfDay(state.time),
  );

  const selectDay = (day: Date) => {
    setSelectedDay(day);
    updateState({ time: undefined });
  };

  const nextMonth = addMonths(thisMonth, 1);

  const goToPreviousMonth = () => setThisMonth(addMonths(thisMonth, -1));
  const goToNextMonth = () => setThisMonth(addMonths(thisMonth, 1));

  const q = trpc.getAvailability.useQuery({
    startDate: thisMonth,
    numberOfDays: 62,
  });

  let availableDays;
  let availableSlots:
    | {
        time: Date;
        providerId: number;
      }[]
    | undefined;

  if (q.isSuccess) {
    const slotsPerDay = q.data.reduce(
      (acc, slot) => {
        const date = format(slot.time, 'yyyy-MM-dd');
        const slots = acc[date] || [];
        slots.push(slot);
        acc[date] = slots;
        return acc;
      },
      {} as { [key: string]: typeof q.data },
    );

    availableDays = Object.entries(slotsPerDay).reduce(
      (acc, [date, slots]) => {
        const isAvailable = slots.some((slot) => !slot.booked);

        acc[date] = isAvailable;
        return acc;
      },
      {} as { [key: string]: boolean },
    );

    if (selectedDay) {
      const availableSlotsForAllProviders = (
        slotsPerDay[format(selectedDay, 'yyyy-MM-dd')] || []
      )
        .filter((slot) => !slot.booked)
        .map(({ time, providerId }) => ({ time, providerId }));

      availableSlots = uniqueBy(availableSlotsForAllProviders, (slot) =>
        slot.time.toUTCString(),
      );
    }
  }

  return (
    <div>
      <div className="text-2xl font-bold">Please select a day</div>
      <div className="mt-4 flex flex-col space-y-4">
        <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <OneMonth
            month={thisMonth}
            availableDayMap={availableDays}
            onSelectDay={setSelectedDay}
            selectedDay={selectedDay}
            onGoToPreviousMonth={goToPreviousMonth}
          />
          <OneMonth
            month={nextMonth}
            availableDayMap={availableDays}
            onSelectDay={setSelectedDay}
            selectedDay={selectedDay}
            onGoToNextMonth={goToNextMonth}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-row justify-between">
        <SecondaryButton onClick={onGoBack}>Go Back</SecondaryButton>
        <PrimaryButton onClick={onProceed}>Proceed</PrimaryButton>
      </div>
    </div>
  );
};

export default ChooseDatePage;
