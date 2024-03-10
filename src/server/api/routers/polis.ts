import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { PolisSurveys, SurveyRules } from "@prisma/client";

export const polisRouter = createTRPCRouter({
  getSurveys: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      console.log("Not authenticated");
      return null;
    }
    const { id: userId } = ctx.session.user;

    const userSurveyAnswers = await ctx.prisma.userSurveyAnswers.findMany({
      where: { userId: userId },
      select: {
        questionId: true,
        answerId: true,
      },
    });

    const allSurveys: PolisSurveys[] = await ctx.prisma.polisSurveys.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    const surveyRules: SurveyRules[] = await ctx.prisma.surveyRules.findMany({
      select: {
        id: true,
        surveyId: true,
        questionId: true,
        requiredAnswerId: true,
      },
    });

    const surveysWithRules = new Set(surveyRules.map((rule) => rule.surveyId));

    const filteredSurveys: PolisSurveys[] = allSurveys.filter(
      (survey) => !surveysWithRules.has(survey.id)
    );

    surveyRules.map((rule) => {
      const surveyId = rule.surveyId;
      const questionId = rule.questionId;
      const requiredAnswerId = rule.requiredAnswerId;

      // Returns all the answers for a certain question
      const userAnswer = userSurveyAnswers.find(
        (answer) => answer.questionId === questionId
      );

      if (userAnswer && userAnswer.answerId === requiredAnswerId) {
        const filteredSurvey = allSurveys.find(
          (survey) => survey.id === surveyId
        );
        if (filteredSurvey !== undefined) {
          filteredSurveys.push(filteredSurvey);
        }
      }
    });

    return filteredSurveys;
  }),
});
