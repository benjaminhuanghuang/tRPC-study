import type { FC } from 'react';
import { useContext } from 'react';

import bookingFlowContext from './bookingFlowContext';
import { PrimaryButton } from './buttons';
import trpc from './trpc';

const ChooseTypePage: FC = () => {
  const { onProceed, state, updateState } = useContext(bookingFlowContext);
  const q = trpc.getServiceTypes.useQuery();

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
        {q.isSuccess && (
          <ul className="space-y-2">
            {q.data.map((serviceType) => (
              <li
                className="flex flex-row items-center space-x-2"
                key={serviceType.id}
              >
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="type"
                  id={`type-${serviceType.id}`}
                  value={serviceType.id}
                  checked={state.serviceTypeId === serviceType.id}
                  onChange={(e) =>
                    updateState({ serviceTypeId: Number(e.target.value) })
                  }
                />
                <label
                  className="cursor-pointer"
                  htmlFor={`type-${serviceType.id}`}
                >
                  {serviceType.name}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4 flex flex-row justify-end">
        <PrimaryButton onClick={onProceed}>Choose Time</PrimaryButton>
      </div>
    </div>
  );
};

export default ChooseTypePage;
