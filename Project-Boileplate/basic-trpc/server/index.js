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
    .mutation((opt) => {
      console.log("Creating user:", opt);
      return { id: Date.now(), name: opt.input.name };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext: () => ({}),
});

server.listen(4000, () => {
  console.log(`tRPC server running on http://localhost:4000`);
});
