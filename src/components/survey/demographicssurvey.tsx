import React, { useCallback, useEffect, useMemo, useState } from "react";
import SurveyQuestion from "./surveyquestion";
import { api } from "../../utils/api";
import Link from "next/link";
// import ProgressBar from "../ProgressBar";

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
      <div className="relative top-1/3 flex flex-col">
        <h1 className="my-6 self-center text-white">
          <strong>You have completed the demographics survey</strong>
        </h1>
        <div className="flex gap-5">
          <button
            className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
            onClick={() => handleRetakeSurvey()}
          >
            Retake demographic survey
          </button>
          <Link href={{ pathname: "./polis" }}>
            <button
              className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
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
    <div className="flex h-screen flex-col items-center justify-center bg-spectrum2">
      {surveyCompleted ? (
        completedSurvey()
      ) : (
        <>
          <h1 className="mb-6 text-lg font-semibold text-white md:mt-6 md:text-3xl ">
            Step 4: Complete the Demographic Survey
          </h1>
          {/* <ProgressBar completed={40} /> */}

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
