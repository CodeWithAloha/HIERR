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
  addUserAnswer: publicProcedure
    .input(z.object({ questionId: z.string(), answerValue: z.string() }))  
    .mutation(async ({input, ctx}) => {
      if(!ctx.session){
        console.log("Not authenticated")
        return null;
      }
      const { id: userId } = ctx.session.user
      const { questionId, answerValue} = input;
      // TODO: Revisit this for multiselect
      const existingUserAnswer = await ctx.prisma.userSurveyAnswers.findFirst({
        where: {
          userId,
          questionId
        }
      });
      if(existingUserAnswer)
      {
        return ctx.prisma.userSurveyAnswers.update({
          where: {
            id: existingUserAnswer.id
          },
          data: {
            userId,
            questionId
          }
        })
      }
      return ctx.prisma.userSurveyAnswers.create({
        data: {
          userId,
          questionId,
          answerValue
        }
      });
    })
});
