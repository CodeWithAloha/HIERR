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
    .input(z.object({ answerId: z.string(), questionId: z.string() }))  
    .mutation(async ({input, ctx}) => {
      if(!ctx.session){
        console.log("Not authenticated")
        return null;
      }
      const { id: userId } = ctx.session.user
      const answerId = input.answerId;
      const questionId = input.questionId;
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
            questionId,
            answerId
          }
        })
      }
      return ctx.prisma.userSurveyAnswers.create({
        data: {
          userId,
          questionId,
          answerId
        }
      });
    })
});
