import { describe, expect, it } from 'vitest';

import appRouter from './appRouter';

describe('appRouter', () => {
  it('should ping/pong', async () => {
    const caller = appRouter.createCaller({});

    const r = await caller.ping();
    expect(r).toBe('pong');
  });
});
