import { describe, expect, it } from 'vitest';

import appRouter from './appRouter';
import useTestDatabase from '../test-helpers/useTestDatabase';

describe('appRouter', () => {
  useTestDatabase();

  it('should ping/pong', async () => {
    const caller = appRouter.createCaller({});

    const r = await caller.ping();
    expect(r).toBe('pong');
  });

  it('should return the existing service types', async () => {
    const caller = appRouter.createCaller({});

    const serviceTypes = await caller.getServiceTypes();
    expect(serviceTypes).toMatchObject([]);
  });

  it('should create service type and return the ID', async () => {
    const caller = appRouter.createCaller({});

    const createdServiceType = await caller.createServiceType({
      name: 'Test Service Type',
      description: 'Test Service Type Description',
    });

    // We don't really care about the actually ID, but if it's not 1,
    // something, somewhere is wrong so this assertion does provide value.
    expect(createdServiceType).toMatchObject({
      id: 1,
      name: 'Test Service Type',
      description: 'Test Service Type Description',
    });
  });
});
