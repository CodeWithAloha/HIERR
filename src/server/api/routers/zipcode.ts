import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const zipcodeRouter = createTRPCRouter({
  postZipCode: publicProcedure
    .input(z.object({ zipcode: z.string() }))
    .mutation(({ input, ctx }) => {
      if (!ctx.session) {
        console.log("Not authenticated");
        return null;
      }
      const { id: userId } = ctx.session.user;
      const zipcode = input.zipcode;
      // TODO: Since each user is unique check if the user already has a zip code first
      return ctx.prisma.zipCode.create({
        data: {
          userId,
          zipcode,
        },
      });
    }),

  // getAllZipCodes: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.zipcodes.findMany();
  // }),
});
