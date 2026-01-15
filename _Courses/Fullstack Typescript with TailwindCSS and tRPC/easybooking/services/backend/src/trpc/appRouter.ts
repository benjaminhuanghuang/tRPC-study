import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { serviceType } from '@easybooking/schema/dist/models/public/serviceType';

const getServiceTypesOutput = z.array(serviceType);

const createServiceTypeInput = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
});

const appRouter = router({
  ping: publicProcedure.output(String).query(() => 'pong'),

  getServiceTypes: publicProcedure
    .output(getServiceTypesOutput)
    .query(async ({ ctx }) => {
      const serviceTypes = await ctx.trx('service_type').select('*');
      return serviceTypes;
    }),

  createServiceType: publicProcedure
    .input(createServiceTypeInput)
    .mutation(async ({ ctx, input }) => {
      const [newServiceType] = await ctx
        .trx('service_type')
        .insert(input)
        .returning('*');
      return newServiceType;
    }),
});

export type AppRouter = typeof appRouter;
export default appRouter;
