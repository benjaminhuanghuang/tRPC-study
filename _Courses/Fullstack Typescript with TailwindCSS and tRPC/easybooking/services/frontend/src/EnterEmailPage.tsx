import { type FC, useContext } from 'react';
import { format } from 'date-fns';

import bookingFlowContext from './bookingFlowContext';
import { SecondaryButton, PrimaryButton } from './buttons';
import trpc from './trpc';

const EnterEmailPage: FC = () => {
  const { onGoBack, onProceed, state, updateState } =
    useContext(bookingFlowContext);

  const q = trpc.getServiceTypes.useQuery();
  const m = trpc.createBooking.useMutation();

  const handleSubmit = async () => {
    if (
      !state.description ||
      !state.time ||
      !state.serviceTypeId ||
      !state.email
    ) {
      return;
    }

    await m.mutateAsync({
      description: state.description,
      serviceTypeId: state.serviceTypeId,
      time: state.time,
      email: state.email,
    });
    onProceed();
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Confirm and enter email address</h1>
      <div className="mt-4 flex flex-col space-y-4">
        <div className="flex flex-row space-x-2">
          <div className="font-bold">Service:</div>
          <div className="flex flex-row justify-between">
            {q.isSuccess &&
              q.data.find((s) => s.id === state.serviceTypeId)?.name}
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="font-bold">Time:</div>
          <div className="flex flex-row justify-between">
            {format(state.time!, 'dd/MM, haaa')}
          </div>
        </div>
        <h1 className="font-bold">Description:</h1>
        <div className="flex flex-row justify-between italic">
          {state.description}
        </div>
        <h1 className="font-bold mt-2">Email:</h1>
        <input
          type="email"
          defaultValue={state.email}
          onChange={({ target }) => updateState({ email: target.value })}
          className="rounded border p-2"
          placeholder="Enter your email address"
        />
        We'll send you a confirmation email.
        <div className="mt-4 flex flex-row justify-between">
          <SecondaryButton onClick={onGoBack}>Go Back</SecondaryButton>
          <PrimaryButton onClick={handleSubmit}>Confirm Booking</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default EnterEmailPage;
