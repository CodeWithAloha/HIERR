import { type NextPage } from "next";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
import { SurveyData } from "../components/survey/demographicssurvey";
import { api } from "../utils/api";
import Link from "next/link";
import SummaryQuestionAnswer from "../components/SummaryQuestionAnswer";

const QuerySummary: NextPage = () => {
  const [userCensusTract, setUserCensusTract] = useState<string>("");
  const [userZipCode, setUserZipCode] = useState<string>("");
  const [userPlanningRegion, setUserPlanningRegion] = useState<string>("");
  const [userIsland, setUserIsland] = useState<string>("");
  const [userCounty, setUserCounty] = useState<string>("");
  const [demographicQuestions, setDemographicQuestions] = useState<
    SurveyData[]
  >([]);
  const [userDemoSurveyAnswers, setUserDemoSurveyAnswers] = useState<string[]>(
    []
  );

  const userCensusTractDB = api.user.getCensusTract.useQuery();
  const userZipCodeDB = api.zipcode.getUserZipCode.useQuery();
  const planningRegionDB = api.user.getPlanningRegion.useQuery();
  const demographicQuestionsDB = api.survey.getSurveyData.useQuery();
  const userDemoSurveyAnswersDB = api.user.getDemoSurveyAnswers.useQuery();

  useEffect(() => {
    if (userCensusTractDB && userCensusTractDB.data) {
      if (userCensusTractDB.data.censustract !== null) {
        setUserCensusTract(userCensusTractDB.data?.censustract);
      }
    }
    if (userZipCodeDB && userZipCodeDB.data) {
      if (userZipCodeDB.data.zipcode !== null) {
        setUserZipCode(userZipCodeDB.data?.zipcode);
      }
    }
    if (planningRegionDB && planningRegionDB.data) {
      if (planningRegionDB.data.planningRegion !== null) {
        const [islandData, countyData, planningRegionData] =
          planningRegionDB.data.planningRegion.split(",");
        setUserIsland(islandData ?? "");
        setUserCounty(countyData ?? "");
        setUserPlanningRegion(planningRegionData ?? "");
      }
    }
  }, [
    userCensusTractDB.data?.censustract,
    userZipCodeDB.data?.zipcode,
    planningRegionDB.data?.planningRegion,
  ]);

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
          Demographic Information Summary
        </h1>
        <div>
          <ProgressBar completed={85} />
        </div>
        <Link href={{ pathname: "./polis" }}>
          <button className="btn btn-next">Continue</button>
        </Link>
        <div className="mt-8 flex flex-col rounded-md bg-[#FFFFFF] px-8 py-8 shadow-xl sm:w-[300px] md:w-[500px] lg:w-[600px]">
          <div className="flex w-[80%] flex-col items-center">
            <div className="mb-4 self-start">
              <h2 className="text-lg font-semibold ">Location Questions</h2>
              <ul>
                <SummaryQuestionAnswer
                  question={"Census tract"}
                  answer={userCensusTract}
                />
                <SummaryQuestionAnswer
                  question={"ZIP Code"}
                  answer={userZipCode}
                />
                <SummaryQuestionAnswer
                  question={"Island"}
                  answer={userIsland}
                />
                <SummaryQuestionAnswer
                  question={"County"}
                  answer={userCounty}
                />
                <SummaryQuestionAnswer
                  question={"Planning Region"}
                  answer={userPlanningRegion}
                />
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold ">Demographic Questions</h2>
              <ul className="">
                {sortedDemoQuestions.map((question, index) => {
                  let userAnswer = "No Answer";
                  if (answersResult) {
                    userAnswer = answersResult[index + 1] ?? "No answer";
                  }
                  return (
                    <SummaryQuestionAnswer
                      question={question.question}
                      answer={`Answer: ${userAnswer}`}
                      key={`question-${index}`}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 pb-[50px] md:grid-cols-2">
          <div className="flex flex-col justify-start">
            <Link href={{ pathname: "./address" }}>
              <button className="btn btn-back">Re-enter Address</button>
            </Link>
            <Link href={{ pathname: "./survey" }}>
              <button className="btn btn-back">
                Retake Demographic Survey
              </button>
            </Link>
          </div>
          <div className="flex justify-end">
            <Link href={{ pathname: "./polis" }}>
              <button className="btn btn-next">Continue</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuerySummary;
