import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { serviceType } from '@easybooking/schema/dist/models/public/serviceType';

const getServiceTypesOutput = z.array(serviceType);

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
