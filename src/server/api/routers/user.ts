import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  addCensusTract: publicProcedure
    .input(z.object({ censusTract: z.string() }))
    .mutation(({ input, ctx }) => {
      if(!ctx.session){
        console.log("Not authenticated")
        return null;
      }
      const { id: userId } = ctx.session.user
      const censusTract = input.censusTract;
      // TODO: Since each user is unique check if the user already has a zip code first
      return ctx.prisma.user.update({
        where: {id: userId},
        data: {
          censusTractId: censusTract
        }
      })
    })
});
