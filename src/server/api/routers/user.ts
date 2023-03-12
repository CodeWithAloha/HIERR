import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  addCensusTract: publicProcedure
    .input(z.object({ censusTract: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        console.log("Not authenticated");
        return null;
      }
      const { id: userId } = ctx.session.user;
      const censusTract = input.censusTract;

      return ctx.prisma.user.update({
        where: { id: userId },
        data: {
          censusTractId: censusTract,
        },
      });
    }),
  getDemoSurveyCompleted: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;
    return ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        demoSurveyCompleted: true,
      },
    });
  }),
  getCensusTract: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;
    return ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        censusTractId: true,
      },
    });
  }),
  postDemoSurveyCompleted: publicProcedure
    .input(z.object({ completed: z.boolean() }))
    .mutation(({ input, ctx }) => {
      if (!ctx.session) {
        console.log("Not authenticated");
        return null;
      }
      const { id: userId } = ctx.session.user;
      return ctx.prisma.user.update({
        where: { id: userId },
        data: {
          demoSurveyCompleted: input.completed,
        },
      });
    }),
  removeCensusTract: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;

    return ctx.prisma.user.update({
      where: { id: userId },
      data: {
        censusTractId: null,
      },
    });
  }),
});
