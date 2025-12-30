import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { appRouter } from "./routes/index.js";

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
