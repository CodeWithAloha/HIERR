import { type NextPage } from "next";
import ProgressBar from "../components/ProgressBar";
import Link from "next/link";

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

  const gridItemStyle = surveys.length > 2 ? "grid-cols-3" : "grid-cols-1";
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full flex-col items-center">
        <h1 className="mb-8 text-lg font-semibold text-white md:mt-6 md:text-3xl">
          Step 5: Please select the Pol.is survey you wish to complete.
        </h1>
        <ProgressBar completed={85} />
        <div className={`grid ${gridItemStyle} gap-4`}>
          {surveys?.map(({ id, title }, index) => {
            return (
              <div
                className="mb-4 flex translate-y-10 flex-col items-center justify-center"
                key={`survey-button-next-page-${index}`}
              >
                <div className="w-full">
                  <Link
                    href={{
                      pathname: `./polissurvey`,
                      query: { surveyId: id },
                    }}
                  >
                    <button
                      className="mb-1 w-full rounded-full   bg-white/80 px-6
                      py-2 text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
                       hover:translate-y-1  hover:bg-white "
                    >
                      {title}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Polis;
