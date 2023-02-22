import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveyRouter = createTRPCRouter({
  getSurveyData: publicProcedure
    .query(async({ ctx }) => {
      if(!ctx.session){
        console.log("Not authenticated")
        return null;
      }
      const { id: userId } = ctx.session.user

      return ctx.prisma.surveyQuestion.findMany({
        include: {
          answers: true
        }
      });
    }),
});
