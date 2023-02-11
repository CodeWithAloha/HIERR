import { createTRPCRouter } from "./trpc";
import { zipcodeRouter } from "./routers/zipcode";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  zipcode: zipcodeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
