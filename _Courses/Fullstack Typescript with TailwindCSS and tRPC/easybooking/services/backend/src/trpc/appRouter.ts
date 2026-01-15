import { publicProcedure, router } from './trpc';
import { z } from 'zod';

const getServiceTypesOutput = z.array(
  z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
  }),
);

const appRouter = router({
  ping: publicProcedure.output(String).query(() => 'pong'),
  getServiceTypes: publicProcedure
    .output(getServiceTypesOutput)
    .query(async ({ ctx }) => {
      const serviceTypes = await ctx.trx('service_type').select('*');
      return serviceTypes;
    }),
});

export type AppRouter = typeof appRouter;
export default appRouter;
