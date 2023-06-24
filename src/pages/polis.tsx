import { type NextPage } from "next";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";
import ProgressBar from "../components/ProgressBar";

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
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-lg font-semibold text-white md:mt-6 md:text-3xl">
          Step 5: Please select the Pol.is survey you wish to complete.
        </h1>
        <ProgressBar completed={85} />
        <div className="flex flex-col items-center justify-center  ">
          {surveys?.map(({ id, title }, index) => {
            return (
              <div
                className="mb-4 flex translate-y-10 flex-col items-center justify-center"
                key={`survey-button-next-page-${index}`}
              >
                <NextPageButtonLink
                  key="survey-{index}"
                  pageName="polissurvey"
                  msg={title}
                  query={{ surveyId: id }}
                  text=""
                  successMessage={false}
                  whiteDesignButton={true}
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
