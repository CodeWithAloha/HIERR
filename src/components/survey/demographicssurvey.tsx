import React, { useCallback, useMemo, useState } from "react";
import SurveyQuestion from "./surveyquestion";
import Link from "next/link";
import { NextPageButtonLink } from "../../UI/NextPageButtonLink";

interface SurveyData {
  question: string;
  answers: string[]
}

export type QuestionDirection = "Prev" | "Next"

export default function DemographicsSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyCompleted, setSurveyCompleted] = useState(false)

  const surveyData: SurveyData[] = [
    {question: "How are you today?", answers:["very bad", "bad", "neutral", "good", "very good"]},
    {
      question: "Does pineapple belong on pizza?", answers:["yes", "no"]
    },
    {question: "On a scale of 1 - 5, how well can you draw?", answers: ["1", "2", "3", "4", "5"]}
  ]
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
        <h1>Survey Completed!</h1>
        <NextPageButtonLink pageName="polis" msg="Click here to start the Pol.is survey." />
      </>
    )
  }
  return (
    <>
    {
      surveyCompleted ? completedSurvey() :
      <>
        <h1>Please answer the following questions</h1>
        {
          surveyData[currentQuestion]!== undefined ? 
          // TODO: Fix these conditionals
          <SurveyQuestion question={surveyData[currentQuestion]?.question ?? ""} answers={surveyData[currentQuestion]?.answers ?? []} updateQuestion={updateCurrentQuestion} /> : null
        }
      </>
    }
    </>
  )
}