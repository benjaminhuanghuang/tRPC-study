import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, ReactNode } from 'react';

import trpc, { trpcClient } from './trpc';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </trpc.Provider>
);

export default Providers;
