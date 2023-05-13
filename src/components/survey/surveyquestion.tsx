import React, { useState } from "react";
import type {
  DemographicSurveyInfo,
  QuestionDirection,
  QuestionType,
  SurveyAnswer,
  SurveyData,
} from "./demographicssurvey";
import RadioButtonAnswers from "./radioButtonAnswers";
import MultiSelectAnswers from "./multiSelectAnswers";
import TextAnswer from "./textAnswers";
import DropdownAnswers from "./dropdownAnswers";

interface SurveyQuestionProps {
  surveyInfo: DemographicSurveyInfo;
  disabled: boolean;
  setDisabled: (val: boolean) => void;
  question?: SurveyData;
  updateQuestion: (val: QuestionDirection, answer?: string) => void;
}

export default function SurveyQuestion({
  surveyInfo,
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
      case "dropdown":
        return (
          <DropdownAnswers
            setDisabled={setDisabled}
            updateCurrentAnswer={setSelectedAnswer}
            answers={answers}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex w-[32rem] flex-col rounded-md bg-[#FFFFFF] px-10 py-5 ">
      <h1 className="mb-2">{question.question}</h1>
      {getAnswers(question.questionType, question.answers)}
      <div className="mt-10 flex flex-row justify-between">
        <button
          className="mx-1 rounded-full border-2 border-blue-darker bg-white px-6 py-2 text-blue-darker hover:border-2 hover:border-[#777777] hover:bg-[#777777] hover:text-white "
          onClick={() => updateQuestion("Prev")}
        >
          Back
        </button>
        <span className="my-2">
          {surveyInfo.totalQuestions - surveyInfo.questionNumber} questions
          remaining
        </span>
        <button
          className="mx-1 rounded-full bg-blue-darker px-6 py-2 text-white enabled:hover:bg-blue-default disabled:cursor-not-allowed disabled:opacity-75"
          onClick={() => updateQuestion("Next", selectedAnswer)}
          disabled={disabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}
