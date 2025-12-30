import { initTRPC } from "@trpc/server";
// Singleton instance of tRPC
// Every import of t shares the same instance, because Node.js caches modules.
export const t = initTRPC.create();
