import { type SetupServer, setupServer } from 'msw/node';
import { createTRPCMsw } from 'msw-trpc';
import superjson from 'superjson';
import { afterAll, beforeAll } from 'vitest';
import { type AppRouter } from '../../../backend/src/trpc/appRouter';

function useMockedRouter(
  makeMocks: (
    trpcMsw: ReturnType<typeof createTRPCMsw<AppRouter>>,
  ) => Parameters<typeof setupServer>[0],
): () => SetupServer {
  const trpcMsw = createTRPCMsw<AppRouter>({
    transformer: { input: superjson, output: superjson },
  });
  let server: SetupServer;

  beforeAll(() => {
    server = setupServer(makeMocks(trpcMsw));
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  return () => server;
}

export default useMockedRouter;
