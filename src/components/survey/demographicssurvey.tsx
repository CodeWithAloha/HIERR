import React, { useCallback, useEffect, useMemo, useState } from "react";
import SurveyQuestion from "./surveyquestion";
import { api } from "../../utils/api";
import Link from "next/link";

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
export type QuestionType = "option" | "multiSelect" | "text" | "number";
export type AnswerType = "option" | "text" | "number" | "optionText";
export interface DemographicSurveyInfo {
  questionNumber: number;
  totalQuestions: number;
}

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
      if (answer?.includes(";")) {
        answers = answer.split(";");
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
    <div className="flex h-screen flex-col items-center bg-[#3276AE]">
      {surveyCompleted ? (
        completedSurvey()
      ) : (
        <>
          <h1 className="mt-6 text-3xl font-bold text-white">
            Demographic Survey
          </h1>
          <p className="my-6 w-3/5 text-center text-2xl text-white">
            Please answer the following questions.{" "}
            <u>
              These questions are to be answered anonymously and will not be
              attributed to you in any way.
            </u>
          </p>
          <p className="my-6 w-3/5 text-center text-xl text-white">
            Answers to these questions will be collected from all Pol.is
            participants and will be used for the purposes of reporting on
            demographic representation. This reporting ensures that our process
            seeks to hear from as many perspectives in our community as
            possible.
          </p>
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
        </>
      )}
    </div>
  );
}
