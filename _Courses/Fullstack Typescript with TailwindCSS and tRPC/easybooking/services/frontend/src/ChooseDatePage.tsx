import { addMonths, startOfMonth } from 'date-fns';
import { type FC, useContext, useState } from 'react';

import { PrimaryButton, SecondaryButton } from './buttons';
import bookingFlowContext from './bookingFlowContext';
import OneMonth from './OneMonth';

// const OneMonth: FC<{ month: Date }> = ({ month }) => (
//   <h1>{format(month, 'MMMM yyyy')}</h1>
// );

const ChooseDatePage: FC = () => {
  const { onGoBack, onProceed } = useContext(bookingFlowContext);
  const [thisMonth] = useState(startOfMonth(new Date()));
  const nextMonth = addMonths(thisMonth, 1);

  return (
    <div>
      <div className="text-2xl font-bold">Please select a day</div>
      <div className="mt-4 flex flex-col space-y-4">
        <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <OneMonth month={thisMonth} />
          <OneMonth month={nextMonth} />
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
