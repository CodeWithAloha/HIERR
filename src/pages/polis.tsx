import { type NextPage } from "next";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";

const Polis: NextPage = () => {
  const surveys = process.env.NEXT_PUBLIC_POLIS_SURVEYS?.split(",");

  return (
    <div className="flex h-screen flex-col items-center bg-blue-default">
      <h1 className="my-6 text-white">
        Please select the Pol.is survey you wish to complete.
      </h1>
      {surveys?.map((survey, index) => {
        return (
          <div className="mb-4" key={`survey-button-next-page-${index}`}>
            <NextPageButtonLink
              key="survey-{index}"
              pageName="polissurvey"
              msg={survey}
              query={{ surveyId: survey }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Polis;
