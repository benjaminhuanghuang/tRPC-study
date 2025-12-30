import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/api";

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});

async function main() {
  const result = await client.sayHi.query();
  console.log(result); // Should print "Hi"

  console.log(await client.users.getUser.query());
}

main();
