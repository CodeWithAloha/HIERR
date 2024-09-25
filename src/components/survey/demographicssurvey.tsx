import React, { useCallback, useEffect, useMemo, useState } from "react";
import SurveyQuestion from "./surveyquestion";
import { api } from "../../utils/api";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Infobox from "../Infobox";
import NextButton from "../NextButton";
import PrevButton from "../PrevButton";
import PageHeader from "../PageHeader";
import PageLayout from "../PageLayout";

export interface SurveyData {
  questionId: string;
  question: string;
  questionType: QuestionType;
  answers: SurveyAnswer[];
}

export interface SurveyAnswer {
  id: string;
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
          return {
            id: a.id,
            answer: a.answer,
            answerType: a.answerType as AnswerType,
          };
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
    (change: QuestionDirection, answer?: { id: string; val: string }) => {
      setDisabled(true);
      if (change === "Prev" && currentQuestion !== 0) {
        setCurrentQuestion(currentQuestion - 1);
        return;
      }

      if (change === "Prev" && currentQuestion === 0) {
        return;
      }
      if (answer === undefined) {
        return;
      }
      const questionId = surveyData[currentQuestion]?.questionId;
      let answers = [answer];
      if (answer?.val.includes(MULTI_ANSWER_DELIMITER)) {
        const multiAnswerId = answer?.id.split(",");
        answers = answer?.val
          .split(MULTI_ANSWER_DELIMITER)
          .filter((a) => a !== "")
          .map((a, i) => {
            return { id: multiAnswerId[i] ?? "", val: a };
          });
      }

      // TODO: Fix these conditionals
      const submissionData = answers.map((a) => {
        return {
          answerId: a?.id,
          questionId: questionId ?? "",
          answerValue: a.val ?? "",
        };
      });

      if (currentQuestion === surveyData.length - 1) {
        userAnswers.push(answer?.val ?? "");
        postUserAnswer.mutate(submissionData);
        setSurveyCompleted(true);
        return;
      }

      userAnswers.push(answer?.val ?? "");

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

  const completedSurveyMessage =
    " Thank you for completing the demographics survey! Please click continue to start the last part of the HIERR survey.";

  const completedSurvey = () => {
    return (
      <>
        <PageLayout>
          <h1 className="mb-6 text-lg font-semibold text-white md:mt-6 md:text-3xl ">
            Step 2 complete!
          </h1>
          <Infobox message={completedSurveyMessage} greenCheck={true} />
          <div className="flex flex-row items-center justify-center gap-5 sm:flex-wrap md:flex-nowrap">
            <Link href={{ pathname: "./address" }}>
              <PrevButton text="Re-enter Address" />
            </Link>
            <PrevButton
              onClick={() => handleRetakeSurvey()}
              text="Retake demographic survey"
            />
            <Link href={{ pathname: "./querysummary" }}>
              <NextButton text="Next" onClick={() => handleSubmit()} />
            </Link>
          </div>
        </PageLayout>
      </>
    );
  };
  const infoboxMessage =
    "Please answer the following questions anonymously. Your answers will be combined with others and used to report on the diversity of our community. This helps us make sure that we hear from as many different perspectives as possible during our process.";

  return (
    <>
      <PageLayout>
        {surveyCompleted ? (
          completedSurvey()
        ) : (
          <>
            <PageHeader title="Step 2: Complete the Demographic Survey" />
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
            {/* <div className="mx-auto mt-8 "> */}
            <div className="">
              <Infobox message={infoboxMessage} greenCheck={false} />
            </div>

            <Link href={{ pathname: "./address" }}>
              <PrevButton text="Re-enter Address" />
            </Link>
          </>
        )}
      </PageLayout>
    </>
  );
}
