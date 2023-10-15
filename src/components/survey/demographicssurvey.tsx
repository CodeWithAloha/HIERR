import React, { useCallback, useEffect, useMemo, useState } from "react";
import SurveyQuestion from "./surveyquestion";
import { api } from "../../utils/api";
import Link from "next/link";
import { TiInputChecked } from "react-icons/ti";
import ProgressBar from "../ProgressBar";

export interface SurveyData {
  questionId: string;
  question: string;
  questionType: QuestionType;
  answers: SurveyAnswer[];
}

export interface SurveyAnswer {
  answer: string;
  answerType: AnswerType;
}

export type QuestionDirection = "Prev" | "Next";
export type QuestionType =
  | "option"
  | "multiSelect"
  | "text"
  | "number"
  | "dropdown";
export type AnswerType = "option" | "text" | "number" | "optionText";
export interface DemographicSurveyInfo {
  questionNumber: number;
  totalQuestions: number;
}

export const MULTI_ANSWER_DELIMITER = "---";

export default function DemographicsSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const surveyCompletedDB = api.user.getDemoSurveyCompleted.useQuery();
  const removeAllUserSurveyAnswersDB =
    api.survey.removeAllUserDemoSurveyAnswers.useMutation();
  const updateSurveyCompletedDB =
    api.user.postDemoSurveyCompleted.useMutation();
  const surveyDataDB = (api.survey.getSurveyData.useQuery()?.data ?? []).sort(
    (d1, d2) => d1.position - d2.position
  );
  const surveyData: SurveyData[] = surveyDataDB.map((sd) => {
    return {
      questionId: sd.id,
      question: sd.question,
      questionType: sd.questionType as QuestionType,
      answers: sd.answers
        .sort((a1, a2) => a1.position - a2.position)
        .map((a) => {
          return { answer: a.answer, answerType: a.answerType as AnswerType };
        }),
    };
  });

  const postUserAnswer = api.survey.addUserAnswer.useMutation();

  const userAnswers: string[] = useMemo(() => [], []);

  useEffect(() => {
    if (surveyCompletedDB && surveyCompletedDB.data) {
      if (surveyCompletedDB.data.demoSurveyCompleted !== false) {
        setSurveyCompleted(true);
      }
    }
  }, [surveyCompletedDB.data?.demoSurveyCompleted]);

  const handleSubmit = () => {
    updateSurveyCompletedDB.mutate({ completed: true });
  };

  const handleRetakeSurvey = () => {
    setDisabled(true);
    setSurveyCompleted(false);
    setCurrentQuestion(0);
    updateSurveyCompletedDB.mutate({ completed: false });
    removeAllUserSurveyAnswersDB.mutate();
  };

  const updateCurrentQuestion = useCallback(
    (change: QuestionDirection, answer?: string) => {
      setDisabled(true);
      if (change === "Prev" && currentQuestion !== 0) {
        setCurrentQuestion(currentQuestion - 1);
        return;
      }

      if (change === "Prev" && currentQuestion === 0) {
        return;
      }
      const questionId = surveyData[currentQuestion]?.questionId;
      let answers = [answer];
      if (answer?.includes(MULTI_ANSWER_DELIMITER)) {
        answers = answer.split(MULTI_ANSWER_DELIMITER).filter((a) => a !== "");
      }

      // TODO: Fix these conditionals
      const submissionData = answers.map((a) => {
        return { questionId: questionId ?? "", answerValue: a ?? "" };
      });

      if (currentQuestion === surveyData.length - 1) {
        userAnswers.push(answer ?? "");
        postUserAnswer.mutate(submissionData);
        setSurveyCompleted(true);
        return;
      }

      userAnswers.push(answer ?? "");

      postUserAnswer.mutate(submissionData);
      setCurrentQuestion(currentQuestion + 1);
      if (document?.getElementsByClassName("form-radio")) {
        const radioButtonArray: Element[] = Array.from(
          document.getElementsByClassName("form-radio")
        );
        radioButtonArray.forEach((el: Element) => {
          (el as HTMLInputElement).checked = false;
        });
      }
    },
    [currentQuestion, userAnswers, surveyData.length]
  );

  const completedSurvey = () => {
    return (
      <div className="relative top-2 flex flex-col items-center justify-center">
        <h1 className="mb-6 text-lg font-semibold text-white md:mt-6 md:text-3xl ">
          Step 4 complete!
        </h1>
        <ProgressBar completed={71} />
        <h2 className=" my-6 mb-12 w-96 self-center border border-dashed  p-4 text-center text-white">
          <TiInputChecked className="mx-auto text-6xl text-yellowGreen" /> Thank
          you for completing the demographics survey! Please click continue to
          start the last part of the HIERR survey.
        </h2>
        <div className="flex flex-row items-center justify-center gap-5">
          <button
            className="mb-1 mt-4 rounded-full bg-white/80 px-6 py-2 text-blue-darker no-underline
             transition hover:translate-y-1 hover:bg-white hover:text-blue-darker "
            onClick={() => handleRetakeSurvey()}
          >
            Retake demographic survey
          </button>
          <Link href={{ pathname: "./polis" }}>
            <button
              className="mb-1 mt-4 flex flex-row items-center justify-center gap-1 rounded-full border-2 
              border-dashed border-lightGreen bg-yellowGreen px-6 py-1 text-right text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
           hover:translate-y-1  hover:bg-lightGreen"
              onClick={() => handleSubmit()}
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="flex h-screen flex-col items-center">
      {surveyCompleted ? (
        completedSurvey()
      ) : (
        <>
          <h1 className="mb-6 text-lg font-semibold text-white md:mt-6 md:text-3xl ">
            Step 4: Complete the Demographic Survey
          </h1>
          <ProgressBar completed={57} />

          {surveyData[currentQuestion] !== undefined ? (
            // TODO: Fix these conditionals
            <SurveyQuestion
              surveyInfo={{
                questionNumber: currentQuestion,
                totalQuestions: surveyData.length,
              }}
              disabled={disabled}
              setDisabled={setDisabled}
              question={surveyData[currentQuestion]}
              updateQuestion={updateCurrentQuestion}
            />
          ) : null}
          <p
            className="mx-auto mt-8 w-[70%] border border-dashed border-white p-1
        text-center text-sm text-white md:m-4 md:w-1/2 md:p-4 xl:w-1/3 2xl:text-lg "
          >
            Please answer the following questions <strong>anonymously</strong>.
            Your answers will be combined with others and used to report on the
            diversity of our community. This helps us make sure that we hear
            from as many different perspectives as possible during our process.
          </p>
        </>
      )}
    </div>
  );
}
