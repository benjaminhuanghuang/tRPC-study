import { addMonths, startOfDay, startOfMonth } from 'date-fns';
import { type FC, useContext, useState } from 'react';

import { PrimaryButton, SecondaryButton } from './buttons';
import bookingFlowContext from './bookingFlowContext';
import OneMonth from './OneMonth';

// const OneMonth: FC<{ month: Date }> = ({ month }) => (
//   <h1>{format(month, 'MMMM yyyy')}</h1>
// );

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

  const availableDays = {};
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
