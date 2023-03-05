import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
const randomUserAgent = require("random-useragent");

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
  retrieveAndMergeUserIds: publicProcedure
    .input(
      z.object({
        xid: z.string(),
        sid: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        console.log("Not authenticated");
        return null;
      }
      const { xid, sid } = input;
      let pid = "";

      const params = new URLSearchParams();
      params.append("xid", xid);
      params.append("conversation_id", sid);
      params.append("pid", "mypid"); // Seriously, this is the way to self-get a pid

      const apiUrl = "https://pol.is/api/v3/participationInit?" + params.toString();
      const response = await fetch(
        apiUrl,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": randomUserAgent.getRandom(),
          },
        });
      const htmlResponse = await response.text();
      console.error(htmlResponse);
      const responseJSON = await response.json();
      console.error("RESPONSE JSON", responseJSON);
      const { ptpt: participant } = responseJSON;
      pid = participant.pid;

      // if this combination of xid, pid, sid already exists, return it
      const existingPolisUsers = await ctx.prisma.polisUser.findMany({
        where: { xid, pid, sid },
      });
      if (existingPolisUsers.length > 0) {
        return existingPolisUsers[0];
      }

      return ctx.prisma.polisUser.create({
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
