import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const t = initTRPC.create();

const appRouter = t.router({
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
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

export type AppRouter = typeof appRouter;
