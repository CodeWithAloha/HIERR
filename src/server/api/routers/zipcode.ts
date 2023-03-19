import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const zipcodeRouter = createTRPCRouter({
  getUserZipCode: publicProcedure.query(({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;
    return ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        zipcode: true,
      },
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
      return ctx.prisma.user.update({
        where: { id: userId },
        data: {
          zipcode: input.zipcode,
        },
      });
    }),
  removeZipCode: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;

    return ctx.prisma.user.update({
      where: { id: userId },
      data: {
        zipcode: null,
      },
    });
  }),
});
