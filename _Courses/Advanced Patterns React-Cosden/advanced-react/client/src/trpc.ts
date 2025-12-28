import type { AppRouter } from "@advanced-react/server";
import { createTRPCReact } from "@trpc/react-query";

/*
AppRouter tells the client the endpoints available on the server
createTRPCReact creates a fully typed tRPC client for React.
*/
export const trpc = createTRPCReact<AppRouter>();
