import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { tRPC } from "./trpcServer.js";

const appRouter = tRPC.router({
  userList: tRPC.procedure.query(() => {
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
  }),

  createUser: tRPC.procedure
    .input((input) => input)
    .mutation(({ input }) => {
      return { id: Date.now(), name: input.name };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext: () => ({}),
});

server.listen(4000, () => {
  console.log(`tRPC server running on http://localhost:4000`);
});
