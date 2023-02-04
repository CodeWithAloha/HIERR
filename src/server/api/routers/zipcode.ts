import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const zipcodeRouter = createTRPCRouter({
  postZipCode: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        zipcode: `User's zipcode: ${input.text}`,
      };
    }),

  // getAllZipCodes: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.zipcodes.findMany();
  // }),
});
