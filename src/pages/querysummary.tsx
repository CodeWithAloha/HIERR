import { type NextPage } from "next";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import { SurveyData } from "../components/survey/demographicssurvey";
import { api } from "../utils/api";
import Link from "next/link";

const QuerySummary: NextPage = () => {
  const [userCensusTract, setUserCensusTract] = useState<string>("");
  const [userZipCode, setUserZipCode] = useState<string>("");
  const [demographicQuestions, setDemographicQuestions] = useState<
    SurveyData[]
  >([]);
  const [userDemoSurveyAnswers, setUserDemoSurveyAnswers] = useState<string[]>(
    []
  );

  const userCensusTractDB = api.user.getCensusTract.useQuery();
  const userZipCodeDB = api.zipcode.getUserZipCode.useQuery();
  const demographicQuestionsDB = api.survey.getSurveyData.useQuery();
  const userDemoSurveyAnswersDB = api.user.getDemoSurveyAnswers.useQuery();

  const sortedDemoQuestions =
    demographicQuestionsDB.data?.sort((a, b) => {
      return a.position - b.position;
    }) ?? [];

  const sortedAnswers = userDemoSurveyAnswersDB.data?.sort((a, b) => {
    const questionIdA = Number(a.questionId);
    const questionIdB = Number(b.questionId);
    return questionIdA - questionIdB;
  });

  const answersResult = sortedAnswers?.reduce((acc, answer) => {
    if (acc[answer.questionId] === undefined) {
      acc[answer.questionId] = answer.answerValue;
    } else {
      acc[answer.questionId] += ", " + answer.answerValue;
    }
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full flex-col items-center">
        <h1 className="mb-8 text-lg font-semibold text-white md:mt-6 md:text-3xl">
          Here is a summary of your demographic information.
        </h1>
        <ProgressBar completed={85} />
        <div className="flex w-[80%] flex-col items-center">
          <h2 className="text-lg font-semibold text-white">Census Tract</h2>
          <p className="text-white">{userCensusTractDB.data?.censustract}</p>
          <h2 className="text-lg font-semibold text-white">Zip Code</h2>
          <p className="text-white">{userZipCodeDB.data?.zipcode}</p>
          <h2 className="text-lg font-semibold text-white">
            Demographic Questions
          </h2>
          <ul className="self-center">
            {sortedDemoQuestions.map((question, index) => {
              let userAnswer = "No Answer";
              if (answersResult) {
                userAnswer = answersResult[index + 1] ?? "No answer";
              }
              return (
                <li key={`question-${index}`} className="text-white">
                  {question.question}: {userAnswer}
                </li>
              );
            })}
          </ul>
          <Link href={{ pathname: "./polis" }}>
            <button
              className="mb-1 mt-4 flex flex-row items-center justify-center gap-1 rounded-full border-2 
                border-dashed border-lightGreen bg-yellowGreen px-6 py-1 text-right text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
            hover:translate-y-1  hover:bg-lightGreen"
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuerySummary;
