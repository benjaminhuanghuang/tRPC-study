# React trpc

```js
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '../../backend/src/trpc/appRouter';

const trpc = createTRPCReact<AppRouter>();

const { hostname, protocol, port } = window.location;
const url = `${protocol}//${hostname}:${port}/trpc`;

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url })],
});

export default trpc;

```

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

import trpc, { trpcClient } from "./trpc";

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
```
