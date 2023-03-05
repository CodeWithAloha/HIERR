import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  retrieveXid: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;
    const user = await ctx.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      console.log("User not found");
      return null;
    }
    return user.xid;
  }),
  mergeUserIds: publicProcedure
    .input(
      z.object({
        xid: z.string(),
        pid: z.string(),
        sid: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        console.log("Not authenticated");
        return null;
      }
      const { xid, pid, sid } = input;
      return ctx.prisma.polisuser.create({
        data: {
          xid,
          pid,
          sid,
        },
      });
  }),
  addCensusTract: publicProcedure
    .input(z.object({ censusTract: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        console.log("Not authenticated");
        return null;
      }
      const { id: userId } = ctx.session.user;
      const censusTract = input.censusTract;
      const existingCensusTracts = await ctx.prisma.censusTract.findMany({
        where: { id: censusTract },
      });
      if (existingCensusTracts.length === 0) {
        await ctx.prisma.censusTract.create({
          data: {
            id: censusTract,
            name: censusTract,
          },
        });
      }
      // TODO: Since each user is unique check if the user already has a zip code first
      return ctx.prisma.user.update({
        where: { id: userId },
        data: {
          censusTractId: censusTract,
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
});
