import Router from '@koa/router';
import Koa from 'koa';
import koaLogger from 'koa-logger';
// tRPC imports
import { createKoaMiddleware } from 'trpc-koa-adapter';
import appRouter from './trpc/appRouter';

async function main(): Promise<void> {
  const app = new Koa();
  app.use(koaLogger());

  const router = new Router();
  router.get('/ping', async (ctx) => (ctx.body = 'pong'));

  app.use(router.routes());
  app.use(router.allowedMethods());

  // Attach tRPC middleware
  const adapter = createKoaMiddleware({ router: appRouter, prefix: '/trpc' });
  app.use(adapter);

  app.listen(3000, async () => {
    console.info('Server is listening');
  });
}

main();
