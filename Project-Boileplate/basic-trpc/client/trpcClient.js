import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const trpcClient = createTRPCClient({
  links: [httpBatchLink({ url: "http://localhost:4000" })],
});

export default trpcClient;
