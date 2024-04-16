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
  updateQuestion: (
    val: QuestionDirection,
    answer?: { id: string; val: string }
  ) => void;
}

export default function SurveyQuestion({
  surveyInfo,
  question,
  updateQuestion,
  disabled,
  setDisabled,
}: SurveyQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState({ id: "", val: "" });
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
            answers={answers}
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
    <div className="mt-8 flex flex-col rounded-md bg-[#FFFFFF] px-8 py-8 shadow-xl sm:w-[300px] md:w-[500px] lg:w-[600px]">
      <h1 className="mb-8 font-semibold">
        {surveyInfo.questionNumber + 1}. {question.question}
      </h1>
      {getAnswers(question.questionType, question.answers)}
      <div className="mt-10 flex flex-row justify-between">
        <button
          className="mb-1 mt-4 flex flex-row items-center justify-center gap-1 rounded-full border-2 
              border-dashed border-blue-darker  bg-white py-1 text-right text-lg text-blue-darker
          no-underline shadow-xl transition  ease-in-out hover:translate-y-1 hover:bg-blue-darker/20 sm:px-2 
           md:px-4  lg:px-6"
          onClick={() => updateQuestion("Prev")}
        >
          Back
        </button>
        <span className="my-2 pt-8 opacity-75">
          Question {surveyInfo.questionNumber + 1} /{surveyInfo.totalQuestions}
        </span>
        <button
          className="mb-1 mt-4 flex flex-row items-center justify-center gap-1 rounded-full border-2 
              border-dashed border-lightGreen
            bg-yellowGreen py-1 text-right text-lg text-blue-darker
          no-underline shadow-xl transition  ease-in-out hover:translate-y-1 hover:bg-lightGreen sm:px-2 
           md:px-4  lg:px-6"
          onClick={() => updateQuestion("Next", selectedAnswer)}
          disabled={disabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}
