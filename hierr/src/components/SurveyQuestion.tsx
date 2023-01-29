import React from "react";

interface SurveyQuestionProps {
  question: string;
  answers: string[]
}

export default function SurveyQuestion({question, answers}: SurveyQuestionProps) {
  return (
    <div>
      <h1>{question}</h1>
      <ul>
        {answers.map(a => {return (
          <li>{a}</li>
        )})}
      </ul>
    </div>
  )
}