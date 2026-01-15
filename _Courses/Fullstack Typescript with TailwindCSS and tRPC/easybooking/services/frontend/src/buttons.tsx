import makeStyledComponent from './makeStyledComponent';

const basis =
  'inline-flex items-center px-6 py-2 text-sm font-semibold rounded-md shadow-sm';

export const PrimaryButton = makeStyledComponent(
  'button',
  basis,
  'bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
);

export const SecondaryButton = makeStyledComponent(
  'button',
  basis,
  'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-400',
);
