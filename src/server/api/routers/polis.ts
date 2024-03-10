import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const polisRouter = createTRPCRouter({
  getSurveys: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;

    // const userSurveyAnswers = ctx.prisma.userSurveyAnswers.findMany({
    //   where: { userId: userId },
    //   select: {
    //     questionId: true,
    //     answerId: true,
    //   },
    // });

    // const allSurveys = ctx.prisma.polisSurveys.findMany({
    //   select: {
    //     id: true,
    //     title: true,
    //     description: true,
    //   }
    // });

    // const surveyRules = ctx.prisma.surveyRules.findMany({
    //   select: {
    //     id: true,
    //     surveyId: true,
    //     questionId: true,
    //     requiredAnswerId: true
    //   }
    // });

    return ctx.prisma.polisSurveys.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }),
});
