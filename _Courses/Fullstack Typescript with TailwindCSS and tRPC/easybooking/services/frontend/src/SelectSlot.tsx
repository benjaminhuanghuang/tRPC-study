import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { addHours, format } from 'date-fns';
import { type FC } from 'react';

const SelectSlot: FC<{
  selectedDay: Date;
  selectedSlot?: Date;
  setSelectedSlot: (slot: Date) => void;
  availableSlots?: {
    time: Date;
    providerId: number;
  }[];
}> = ({ selectedDay, availableSlots, selectedSlot, setSelectedSlot }) => (
  <div className="flex flex-col space-y-2">
    <div className="text-xl font-bold">
      {format(selectedDay, 'EEEE dd. MMMM')}
    </div>
    <div className="flex flex-row space-x-2">
      {availableSlots?.map((slot) => (
        <button
          key={slot.time.toISOString() + slot.providerId.toString()}
          className={clsx(
            'flex flex-row items-center rounded-md border-2 bg-white px-6 py-4 shadow transition-colors duration-200 hover:bg-gray-50',
            {
              'border-indigo-700':
                selectedSlot?.getTime() === slot.time.getTime(),
              'border-white': selectedSlot?.getTime() !== slot.time.getTime(),
            },
          )}
          onClick={() => setSelectedSlot(slot.time)}
        >
          {format(slot.time, 'HH:mm')}{' '}
          <ArrowLongRightIcon className="mx-2 h-4 w-4" />{' '}
          {format(addHours(slot.time, 3), 'HH:mm')}
        </button>
      ))}
    </div>
  </div>
);

export default SelectSlot;
