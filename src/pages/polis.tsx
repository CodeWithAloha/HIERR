import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";

const Polis: NextPage = () => {
  const surveys = process.env.NEXT_PUBLIC_POLIS_SURVEYS?.split(",")

  return (
    <div className="bg-blue-default flex flex-col items-center h-screen">
      <h1 className="my-6 text-white">Please select the Pol.is survey you wish to complete.</h1>
      {
        surveys?.map(survey => {
          return (
            <NextPageButtonLink pageName="polissurvey" msg={survey} query={{surveyId: survey}} />
          )
        })
      }
    </div>
  )
}

export default Polis