# Setup tRPC client

https://trpc.io/docs/getting-started

https://tanstack.com/router/v1/docs/framework/react/quick-start

https://tanstack.com/router/v1/docs/framework/react/examples/with-trpc-react-query

Call PRC defined on backend, end to end type safety

create client/src/trpc.ts

```js
import type { AppRouter } from "@advanced-react/server";
import { createTRPCReact } from "@trpc/react-query";

/*
AppRouter tells the client the endpoints available on the server

createTRPCReact creates a fully typed tRPC client for React.
*/
export const trpc = createTRPCReact<AppRouter>();

```

Add trpc.Provider and QueryClientProvider in App.tsx

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        trpc.httpBatchLink({
          url: env.VITE_SERVER_BASE_URL,
        }),
      ],
    })
  );

  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <div></div>
    </QueryClientProvider>
  </trpc.Provider>;
}
```

## Query

```js
function Index() {
  const { data } = trpc.experiences.byId.useQuery({ id: 1 });
  return <div>{data?.title}</div>;
}
```
