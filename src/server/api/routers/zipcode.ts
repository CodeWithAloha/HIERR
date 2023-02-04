import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const zipcodeRouter = createTRPCRouter({
  postZipCode: publicProcedure
    .input(z.object({ userId: z.string(), zipcode: z.string() }))
    .query(({ input }) => {
      // .mutation(async ({ input, ctx }) => {
      //   const { name } = ctx.user;
      //   const post = await prisma.post.create({
      //     data: {
      //       ...input,
      //       name,
      //       source: 'GITHUB',
      //     },
      //   });
      //   ee.emit('add', post);
      //   delete currentlyTyping[name];
      //   ee.emit('isTypingUpdate');
      //   return post;
      return {
        zipcode: `User: ${input.userId} zipcode: ${input.zipcode}`,
      };
    }),

  // getAllZipCodes: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.zipcodes.findMany();
  // }),
});
