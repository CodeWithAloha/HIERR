import { type NextPage } from "next";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";

interface PolisSurvey {
  id: string;
  title: string;
  description: string;
}

const Polis: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const surveys: PolisSurvey[] = JSON.parse(
    process.env.NEXT_PUBLIC_POLIS_SURVEYS ?? ""
  );

  return (
    <div className="flex h-screen flex-col items-center">
      <div className="relative top-1/3">
        <h1 className="my-6 text-white">
          Please select the Pol.is survey you wish to complete.
        </h1>
        <div className="justify-items-left flex flex-col">
          {surveys?.map(({ id, title }, index) => {
            return (
              <div className="mb-12" key={`survey-button-next-page-${index}`}>
                <NextPageButtonLink
                  key="survey-{index}"
                  pageName="polissurvey"
                  msg={title}
                  query={{ surveyId: id }}
                  text=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Polis;
