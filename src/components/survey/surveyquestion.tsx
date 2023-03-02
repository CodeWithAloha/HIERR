import React, { useState } from "react";
import { AnswerType, QuestionDirection, QuestionType, SurveyAnswer, SurveyData } from "./demographicssurvey";
import RadioButtonAnswers from "./radioButtonAnswers";
import MultiSelectAnswers from "./multiSelectAnswers";
import TextAnswer from "./textAnswers";

interface SurveyQuestionProps {
  question?: SurveyData;
  updateQuestion: (val: QuestionDirection, answer?: string) => void;
}

export default function SurveyQuestion({question, updateQuestion}: SurveyQuestionProps) {
  if(!question)
  {
    return null;
  }
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const updateCurrentAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value)
  }
  const getAnswers = (questionType: QuestionType, answers: SurveyAnswer[]) => {
    switch(questionType) {
      case "option": return <RadioButtonAnswers answers={answers.map(a => a.answer)} updateCurrentAnswer={setSelectedAnswer} />;
      case "multiSelect": return <MultiSelectAnswers updateCurrentAnswer={setSelectedAnswer} answers={answers.map(a => {return {answer: a.answer, answerType: (a.answerType as AnswerType)}})} />;
      case "text":
      case "number": return <TextAnswer updateCurrentAnswer={setSelectedAnswer} />;
      default: return null;
    }
  }
  return (
    <div className="bg-[#FFFFFF] rounded-md px-10 py-5 ">
      <h1 className="mb-2">{question.question}</h1>
      {
        getAnswers(question.questionType, question.answers)
      }
      <div className="flex flex-row justify-between mt-10">
      <button className="rounded-full px-6 py-2 mx-1 bg-blue-darker text-white hover:bg-blue-default" onClick={() => updateQuestion("Prev")}>Back</button>
      <button className="rounded-full px-6 py-2 mx-1 hover:bg-blue-default bg-blue-darker text-white" onClick={() => updateQuestion("Next", selectedAnswer)}>Next</button>
      </div>
    </div>
  )
}