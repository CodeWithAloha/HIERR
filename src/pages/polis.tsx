import { type NextPage } from "next";
import ProgressBar from "../components/ProgressBar";
import Link from "next/link";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

interface PolisSurvey {
  id: string;
  title: string;
  description: string;
}

const Polis: NextPage = () => {
  const [surveys, setSurveys] = useState<PolisSurvey[]>([]);

  const polisSurveys = api.polis.getSurveys.useQuery();

  useEffect(() => {
    if (polisSurveys.data) {
      setSurveys(polisSurveys.data);
    }
  }, [polisSurveys.data]);

  const gridItemStyle = surveys.length > 2 ? "grid-cols-3" : "grid-cols-1";
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full flex-col items-center">
        <h1 className="mb-8 text-lg font-semibold text-white md:mt-6 md:text-3xl">
          Step 3: Please select the Pol.is survey you wish to complete.
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
          <br />
          <br />
          <hr />
          <Link href={{ pathname: "./survey" }}>
            <button className="mb-1 mt-4 flex flex-row items-center justify-center gap-1 rounded-full bg-white/70 px-4 py-1 text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out hover:translate-y-1  hover:bg-white">
              <IoMdArrowBack />
              Retake Demographic Survey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Polis;
