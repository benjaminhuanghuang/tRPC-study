import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '../../backend/src/trpc/appRouter';
import superjson from 'superjson';

const trpc = createTRPCReact<AppRouter>();

const { hostname, protocol, port } = window.location;
const url = `${protocol}//${hostname}:${port}/trpc`;

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url })],
  transformer: superjson,
});

export default trpc;
