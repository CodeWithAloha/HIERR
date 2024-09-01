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

    const userPlanningRegion = await ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        planningRegion: true,
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
        search: true,
      },
    });

    const surveysWithRules = new Set(surveyRules.map((rule) => rule.surveyId));

    const filteredSurveys: PolisSurveys[] = allSurveys.filter(
      (survey) => !surveysWithRules.has(survey.id)
    );

    surveyRules.map((rule) => {
      const surveyId = rule.surveyId;
      const filterTerm = rule.search;

      if (
        userPlanningRegion &&
        userPlanningRegion.planningRegion?.includes(filterTerm)
      ) {
        const filteredSurvey = allSurveys.find(
          (survey) => survey.id === surveyId
        );
        if (
          filteredSurvey !== undefined &&
          !filteredSurveys.includes(filteredSurvey)
        ) {
          filteredSurveys.push(filteredSurvey);
        }
      }
    });

    return filteredSurveys;
  }),
});
