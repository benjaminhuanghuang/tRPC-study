import { t } from "../trpc";
import { useRouter } from "./users";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi";
  }),
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;

      throw new Error("Invalid input: Expected string");
    })
    .mutation((req) => {
      console.log("Client says:", req.input);
    }),
  users: useRouter,
});
