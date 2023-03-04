import React, { useState } from "react";
import {
  AnswerType,
  QuestionDirection,
  QuestionType,
  SurveyAnswer,
  SurveyData,
} from "./demographicssurvey";
import RadioButtonAnswers from "./radioButtonAnswers";
import MultiSelectAnswers from "./multiSelectAnswers";
import TextAnswer from "./textAnswers";

interface SurveyQuestionProps {
  question?: SurveyData;
  updateQuestion: (val: QuestionDirection, answer?: string) => void;
}

export default function SurveyQuestion({
  question,
  updateQuestion,
}: SurveyQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  if (!question) {
    return null;
  }

  const getAnswers = (questionType: QuestionType, answers: SurveyAnswer[]) => {
    switch (questionType) {
      case "option":
        return (
          <RadioButtonAnswers
            answers={answers}
            updateCurrentAnswer={setSelectedAnswer}
          />
        );
      case "multiSelect":
        return (
          <MultiSelectAnswers
            updateCurrentAnswer={setSelectedAnswer}
            answers={answers}
          />
        );
      case "text":
      case "number":
        return <TextAnswer updateCurrentAnswer={setSelectedAnswer} />;
      default:
        return null;
    }
  };
  return (
    <div className="rounded-md bg-[#FFFFFF] px-10 py-5 ">
      <h1 className="mb-2">{question.question}</h1>
      {getAnswers(question.questionType, question.answers)}
      <div className="mt-10 flex flex-row justify-between">
        <button
          className="mx-1 rounded-full bg-blue-darker px-6 py-2 text-white hover:bg-blue-default"
          onClick={() => updateQuestion("Prev")}
        >
          Back
        </button>
        <button
          className="mx-1 rounded-full bg-blue-darker px-6 py-2 text-white hover:bg-blue-default"
          onClick={() => updateQuestion("Next", selectedAnswer)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
