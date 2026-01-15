import { type FC } from 'react';
import { useBookingFlow } from './bookingFlowContext';
import clsx from 'clsx';
import ChooseTypePage from './ChooseTypePage';

const ChooseDatePage: FC = () => <div>Choose date</div>;
const EnterEmailPage: FC = () => <div>Enter email</div>;

const flow = [ChooseTypePage, ChooseDatePage, EnterEmailPage];

const NewBooking: FC = () => {
  const { page, activePageIndex, setActivePageIndex } = useBookingFlow(flow);

  return (
    <div className="min-h-screen w-full bg-gray-50 py-12">
      <div className="mx-auto flex max-w-3xl flex-col rounded border border-gray-200 bg-white px-12 py-8 shadow-lg">
        <div> {page}</div>

        <div className="mx-auto mt-8 flex flex-row space-x-3">
          {flow.map((_, index) => (
            <div
              key={index}
              className={clsx(
                {
                  'bg-green-200 text-green-700': index === activePageIndex,
                  'bg-gray-400 text-white': index > activePageIndex,
                  'bg-gray-200 text-gray-400': index < activePageIndex,
                },
                'flex h-8 w-8 select-none items-center justify-center rounded-full',
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
