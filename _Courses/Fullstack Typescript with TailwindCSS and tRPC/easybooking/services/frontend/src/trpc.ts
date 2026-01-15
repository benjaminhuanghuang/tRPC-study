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
