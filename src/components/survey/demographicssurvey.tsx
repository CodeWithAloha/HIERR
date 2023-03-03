import React, { useCallback, useMemo, useState } from "react";
import SurveyQuestion from "./surveyquestion";
import Link from "next/link";
import { NextPageButtonLink } from "../../UI/NextPageButtonLink";
import { api } from "../../utils/api";

export interface SurveyData {
  questionId: string;
  question: string;
  questionType: QuestionType;
  answers: SurveyAnswer[]
}

export interface SurveyAnswer {
  answer: string;
  answerId: string;
  answerType: string;
}

export type QuestionDirection = "Prev" | "Next";
export type QuestionType = "option" | "multiSelect" | "text" | "number";
export type AnswerType = "option" | "text" | "number" | "optionText";

export default function DemographicsSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const surveyDataDB = (api.survey.getSurveyData.useQuery()?.data  ?? []).sort((d1, d2) => d1.position - d2.position );
  const surveyData: SurveyData[] = surveyDataDB.map(sd => {return {questionId: sd.id, question: sd.question, questionType: (sd.questionType as QuestionType), answers: sd.answers.sort((a1, a2) => a1.position - a2.position).map(a => {return {answer: a.answer, answerId: a.id, answerType: a.answerType}})}})

  const postUserAnswer = api.survey.addUserAnswer.useMutation();

  const userAnswers: string[] = useMemo(() => [], []);

  const updateCurrentQuestion = useCallback((change: QuestionDirection, answer?: string) => {
    if(change === "Prev" && currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1);
      return;
    }

    if(change === "Prev" && currentQuestion === 0) {
      return;
    }
    const questionId = surveyData[currentQuestion]?.questionId;
    let answers = [answer];
    if(answer?.includes(";")) {
      answers = answer.split(";");
    }
      
    // TODO: Fix these conditionals
    const submissionData = answers.map(a => {return {questionId: questionId ?? "", answerValue: a ?? ""}})

    if(currentQuestion === surveyData.length - 1) {
      userAnswers.push(answer ?? "")
      postUserAnswer.mutate(submissionData)
      setSurveyCompleted(true)
      return;
    }
    
    userAnswers.push(answer ?? "")

    postUserAnswer.mutate(submissionData)
    setCurrentQuestion(currentQuestion + 1)
  },[currentQuestion, userAnswers, surveyData.length]);

  const completedSurvey = () => {
    return (
      <>
        <h1 className="text-center text-2xl text-white mb-10">Survey Completed!</h1>
        <NextPageButtonLink pageName="polis" msg="Click here to start the Pol.is survey." />
      </>
    )
  }
  return (
    <div className="bg-[#3276AE] flex flex-col items-center h-screen">
    {
      surveyCompleted ? completedSurvey() :
      <>
        <p className="text-center text-2xl text-white my-6">Please answer the following questions. <u>These questions are to be answered anonymously and will not be attributed to you in any way.</u></p>
        <p className="text-center text-xl text-white my-6">
        Answers to these questions will be collected from all Pol.is participants and will be used for the purposes of reporting on demographic representation. This reporting ensures that our process seeks to hear from as many perspectives in our community as possible. 
        </p>
        {
          surveyData[currentQuestion]!== undefined ? 
          // TODO: Fix these conditionals
          <SurveyQuestion question={surveyData[currentQuestion]} updateQuestion={updateCurrentQuestion} /> : null
        }
      </>
    }
    </div>
  )
}