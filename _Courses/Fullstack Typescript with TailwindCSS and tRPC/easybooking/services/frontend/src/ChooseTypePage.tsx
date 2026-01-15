import type { FC } from 'react';
import { useContext } from 'react';

import bookingFlowContext from './bookingFlowContext';

const ChooseTypePage: FC = () => {
  const { onProceed, state, updateState } = useContext(bookingFlowContext);

  return (
    <div>
      <div>
        <div className="text-2xl font-bold">How can we help you?</div>
        <div className="text-gray-700">
          We offer multiple services. Quickly decide what you need and we'll get
        </div>
      </div>
      <div className="my-4 flex flex-col">
        <textarea
          className="rounded border border-gray-300 p-2"
          onChange={(e) => updateState({ description: e.target.value })}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <h1 className="font-bold">Choose a service type:</h1>
        <ul className="space-y-2">
          <li className="flex flex-row items-center space-x-2">
            <input
              className="cursor-pointer"
              type="radio"
              name="type"
              id="type-1"
              checked={state.serviceTypeId === 1}
              onChange={() => updateState({ serviceTypeId: 1 })}
            />
            <label className="cursor-pointer" htmlFor="type-1">
              Type 1
            </label>
          </li>
          <li className="flex flex-row items-center space-x-2">
            <input
              className="cursor-pointer"
              type="radio"
              name="type"
              id="type-2"
              checked={state.serviceTypeId === 2}
              onChange={() => updateState({ serviceTypeId: 2 })}
            />
            <label className="cursor-pointer" htmlFor="type-2">
              Type 2
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4 flex flex-row justify-end">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={onProceed}
        >
          Choose Time
        </button>
      </div>
    </div>
  );
};

export default ChooseTypePage;
