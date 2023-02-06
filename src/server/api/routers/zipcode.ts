import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

interface ZipCode {
  id: string;
  userId: string;
  zipcode: string;
}

export const zipcodeRouter = createTRPCRouter({
  postZipCode: publicProcedure
    .input(z.object({ userId: z.string(), zipcode: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if(!ctx.session){
        console.log("Not authenticated")
        return null;
      }
      const { id: userId } = ctx.session.user
      const zipcode = input.zipcode;
      const post: ZipCode = await ctx.prisma.post.create({
        data: {
          userId,
          zipcode
        }
      }) as ZipCode;
      return {
        zipcode: `User: ${input.userId} zipcode: ${input.zipcode}`,
      };
    }),

  // getAllZipCodes: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.zipcodes.findMany();
  // }),
});
