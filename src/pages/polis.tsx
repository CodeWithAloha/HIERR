import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";

const Polis: NextPage = () => {
  const surveys = process.env.NEXT_PUBLIC_POLIS_SURVEYS?.split(",")

  return (
    <div className="bg-[#3276AE] flex flex-col items-center h-screen">
      <h1 className="text-center text-2xl text-white mb-10">Please select the Pol.is survey you would wish to complete.</h1>
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