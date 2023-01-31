import React, { useState } from "react";
import { QuestionDirection } from "./demographicssurvey";

interface SurveyQuestionProps {
  question: string;
  answers: string[];
  updateQuestion: (val: QuestionDirection, answer?: string) => void;
}

export default function SurveyQuestion({question, answers, updateQuestion}: SurveyQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState(answers[0])
  const updateCurrentAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value)
  }
  return (
    <div>
      <h1>{question}</h1>
      <ul>
        {answers.map((a, index) => {return (
          <label key={index}>
          <input type="radio" name="myRadio" value={a} onChange={(e) => updateCurrentAnswer(e)} />
          {a} 
        </label>
        )})}
      </ul>
      <button onClick={() => updateQuestion("Prev")}>Back</button>
      <button onClick={() => updateQuestion("Next", selectedAnswer)}>Next</button>
    </div>
  )
}