# Setting up Tanstack Router

https://tanstack.com/router/v1/docs/framework/react/quick-start

https://tanstack.com/router/latest/docs/framework/react/installation/with-vite

```sh
pnpm add @tanstack/react-router
npm install -D @tanstack/router-plugin
```

Add the plugin to vite.config.ts

Create client/src/router.tsx

Modify client/src/trpc.ts, integrate trpc with react-query

```js
export const trpcQueryUtils = createTRPCQueryUtils({
  queryClient,
  client: trpcClient,
});
```

Use the router

```js
const utils = trpc.useUtils();
```
