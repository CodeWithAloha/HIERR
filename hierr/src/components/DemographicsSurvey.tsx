import React from "react";
import SurveyQuestion from "./SurveyQuestion";

interface SurveyData {
  question: string;
  answers: string[]
}

export default function DemographicsSurvey() {
  const surveyData: SurveyData[] = [
    {question: "How are you today?", answers:["very bad", "bad", "neutral", "good", "very good"]},
    {
      question: "Does pineapple belong on pizza?", answers:["yes", "no"]
    },
    {question: "On a scale of 1 - 5, how well can you draw?", answers: ["1", "2", "3", "4", "5"]}
  ]
  return (
    <>
      <h1>Please answer the following questions</h1>
      {surveyData.map(sd => {return (
        <SurveyQuestion question={sd.question} answers={sd.answers} />
      )})}
    </>
  )
}