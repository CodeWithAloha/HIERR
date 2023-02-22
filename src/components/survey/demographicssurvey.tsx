import React, { useCallback, useMemo, useState } from "react";
import SurveyQuestion from "./surveyquestion";
import Link from "next/link";
import { NextPageButtonLink } from "../../UI/NextPageButtonLink";
import { api } from "../../utils/api";

interface SurveyData {
  question: string;
  answers: string[]
}

export type QuestionDirection = "Prev" | "Next"

export default function DemographicsSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const surveyDataDB = api.survey.getSurveyData.useQuery()?.data ?? [];
  const surveyData: SurveyData[]= surveyDataDB.map(sd => {return {question: sd.question, answers: sd.answers.sort((a1, a2) => a1.position - a2.position).map(a => a.answer)}})

  const userAnswers: string[] = useMemo(() => [], []);
  // TODO: make sure questions do not go out of bounds
  const updateCurrentQuestion = useCallback((change: QuestionDirection, answer?: string) => {
    if(change === "Prev") {
      setCurrentQuestion(currentQuestion - 1);
      return;
    }
    if(currentQuestion === surveyData.length - 1) {
      userAnswers.push(answer ?? "")
      console.log("User answers are:", userAnswers)
      setSurveyCompleted(true)
      // TODO: Send user answers to database
      return;
    }
    userAnswers.push(answer ?? "")
    setCurrentQuestion(currentQuestion + 1)
  },[currentQuestion, userAnswers, surveyData.length]);

  const completedSurvey = () => {
    return (
      <>
        <h1 className="text-center text-2xl text-white mb-10">Survey Completed!</h1>
        <NextPageButtonLink pageName="polis" msg="Click here to start the Pol.is survey." />
      </>
    )
  }
  return (
    <div className="bg-[#3276AE] flex flex-col items-center h-screen">
    {
      surveyCompleted ? completedSurvey() :
      <>
        <p className="text-center text-2xl text-white mb-10">Please answer the following questions</p>
        {
          surveyData[currentQuestion]!== undefined ? 
          // TODO: Fix these conditionals
          <SurveyQuestion question={surveyData[currentQuestion]?.question ?? ""} answers={surveyData[currentQuestion]?.answers ?? []} updateQuestion={updateCurrentQuestion} /> : null
        }
      </>
    }
    </div>
  )
}