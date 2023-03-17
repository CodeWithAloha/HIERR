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
  disabled: boolean;
  setDisabled: (val: boolean) => void;
  question?: SurveyData;
  updateQuestion: (val: QuestionDirection, answer?: string) => void;
}

export default function SurveyQuestion({
  question,
  updateQuestion,
  disabled,
  setDisabled,
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
            setDisabled={setDisabled}
            answers={answers}
            updateCurrentAnswer={setSelectedAnswer}
          />
        );
      case "multiSelect":
        return (
          <MultiSelectAnswers
            setDisabled={setDisabled}
            updateCurrentAnswer={setSelectedAnswer}
            answers={answers}
          />
        );
      case "text":
      case "number":
        return (
          <TextAnswer
            setDisabled={setDisabled}
            updateCurrentAnswer={setSelectedAnswer}
            number={questionType === "number"}
          />
        );
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
          disabled={disabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}
