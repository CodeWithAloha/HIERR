import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const zipcodeRouter = createTRPCRouter({
  getUserZipCode: publicProcedure.query(({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;
    return ctx.prisma.zipCode.findFirst({
      where: { userId: userId },
    });
  }),
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
  removeZipCode: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;

    return ctx.prisma.zipCode.delete({
      where: { userId: userId },
    });
  }),
});
