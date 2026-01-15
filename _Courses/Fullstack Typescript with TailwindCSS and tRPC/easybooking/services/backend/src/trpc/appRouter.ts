import { publicProcedure, router } from './trpc';

const appRouter = router({
  ping: publicProcedure.output(String).query(() => 'pong'),
  getServiceTypes: publicProcedure.query(() => {
    return ['Cleaning', 'Plumbing', 'Electrical', 'Landscaping'];
  }),
});

export type AppRouter = typeof appRouter;
export default appRouter;
