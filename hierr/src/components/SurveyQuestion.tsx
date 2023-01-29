import React from "react";
import { QuestionDirection } from "./DemographicsSurvey";

interface SurveyQuestionProps {
  question: string;
  answers: string[];
  updateQuestion: (val: QuestionDirection) => void;
}

export default function SurveyQuestion({question, answers, updateQuestion}: SurveyQuestionProps) {
  return (
    <div>
      <h1>{question}</h1>
      <ul>
        {answers.map(a => {return (
          <li>{a}</li>
        )})}
      </ul>
      <button onClick={() => updateQuestion("Prev")}>Back</button>
      <button onClick={() => updateQuestion("Next")}>Next</button>
    </div>
  )
}