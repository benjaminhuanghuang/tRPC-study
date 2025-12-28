import type { AppRouter } from "@advanced-react/server";
import {
  createTRPCQueryUtils,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import { env } from "./lib/utils/env";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
/*
AppRouter tells the client the endpoints available on the server
createTRPCReact creates a fully typed tRPC client for React.
*/
export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: env.VITE_SERVER_BASE_URL,
    }),
  ],
});

export const trpcQueryUtils = createTRPCQueryUtils({
  queryClient,
  client: trpcClient,
});
