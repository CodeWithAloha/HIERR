import React, { useCallback, useState } from "react";
import SurveyQuestion from "./SurveyQuestion";

interface SurveyData {
  question: string;
  answers: string[]
}

export type QuestionDirection = "Prev" | "Next"

export default function DemographicsSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const surveyData: SurveyData[] = [
    {question: "How are you today?", answers:["very bad", "bad", "neutral", "good", "very good"]},
    {
      question: "Does pineapple belong on pizza?", answers:["yes", "no"]
    },
    {question: "On a scale of 1 - 5, how well can you draw?", answers: ["1", "2", "3", "4", "5"]}
  ]
  const updateCurrentQuestion = useCallback((change: QuestionDirection) => {
    if(change === "Prev") {
      setCurrentQuestion(currentQuestion - 1);
      return;
    }
    setCurrentQuestion(currentQuestion + 1)
  },[currentQuestion])
  return (
    <>
      <h1>Please answer the following questions</h1>
      <SurveyQuestion question={surveyData[currentQuestion].question} answers={surveyData[currentQuestion].answers} updateQuestion={updateCurrentQuestion} />
    </>
  )
}