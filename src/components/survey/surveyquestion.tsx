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
import NextButton from "../NextButton";
import PrevButton from "../PrevButton";

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
    <div className="rounded-md bg-white shadow-xl sm:w-[325px] sm:p-4 md:w-[500px] md:p-6 lg:p-8">
      <h1 className="font-semibold text-primary-content sm:mb-2 md:mb-4 lg:mb-6">
        {surveyInfo.questionNumber + 1}. {question.question}
      </h1>
      {getAnswers(question.questionType, question.answers)}
      <div className="flex flex-row justify-between sm:mt-4 md:mt-6 lg:mt-10">
        <PrevButton text="Back" onClick={() => updateQuestion("Prev")} />
        <span className="my-2 pt-8 text-primary-content opacity-75">
          Question {surveyInfo.questionNumber + 1} /{surveyInfo.totalQuestions}
        </span>
        <NextButton
          text="Next"
          onClick={() => updateQuestion("Next", selectedAnswer)}
          disabled={disabled}
          className="btn-primary btn border-secondary"
        />
      </div>
    </div>
  );
}
