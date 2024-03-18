import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveyRouter = createTRPCRouter({
  getSurveyData: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }

    return ctx.prisma.surveyQuestion.findMany({
      include: {
        answers: true,
      },
    });
  }),
  addUserAnswer: publicProcedure
    .input(
      z.array(
        z.object({
          questionId: z.string(),
          answerId: z.string(),
          answerValue: z.string(),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        console.log("Not authenticated");
        return null;
      }
      const { id: userId } = ctx.session.user;
      const userAnswers = input;
      if (userAnswers.length < 1 || userAnswers[0]?.questionId === undefined) {
        return null;
      }
      // userAnswers should be 1 or more values. All multiple values should have the same questionId
      const questionId = userAnswers[0].questionId;

      const existingUserAnswers = await ctx.prisma.userSurveyAnswers.findMany({
        where: {
          userId,
          questionId,
        },
      });
      if (existingUserAnswers) {
        // Remove any existing answers tied to a certain question
        await ctx.prisma.userSurveyAnswers.deleteMany({
          where: {
            userId: userId,
            questionId: questionId,
          },
        });
      }
      const data = userAnswers.map((a) => {
        return {
          userId: userId,
          questionId: questionId,
          answerId: a.answerId,
          answerValue: a.answerValue,
        };
      });
      return ctx.prisma.userSurveyAnswers.createMany({
        data: data,
      });
    }),
  removeAllUserDemoSurveyAnswers: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;

    return ctx.prisma.userSurveyAnswers.deleteMany({
      where: { userId: userId },
    });
  }),
});
