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
    <div className="bg-[#FFFFFF] rounded-md px-10 py-5 ">
      <h1 className="mb-2">{question}</h1>
      <ul>
        {answers.map((a, index) => {return (
          <div key={index}>
            <label>
            <input type="radio" name="myRadio" value={a} onChange={(e) => updateCurrentAnswer(e)} />
            <span className="mx-2">{a}</span> 
          </label>
          </div>
        )})}
      </ul>
      <div className="flex flex-row justify-between mt-10">
      <button className="rounded-full px-6 py-2 mx-1 bg-blue-darker text-white hover:bg-blue-default" onClick={() => updateQuestion("Prev")}>Back</button>
      <button className="rounded-full px-6 py-2 mx-1 hover:bg-blue-default bg-blue-darker text-white" onClick={() => updateQuestion("Next", selectedAnswer)}>Next</button>
      </div>
    </div>
  )
}