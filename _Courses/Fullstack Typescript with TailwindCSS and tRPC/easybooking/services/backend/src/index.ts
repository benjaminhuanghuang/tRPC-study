import Router from '@koa/router';
import Koa from 'koa';
import koaLogger from 'koa-logger';

async function main(): Promise<void> {
  const app = new Koa();
  app.use(koaLogger());

  const router = new Router();
  router.get('/ping', async (ctx) => (ctx.body = 'pong'));

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(3000, async () => {
    console.info('Server is listening');
  });
}

main();
