import { type NextPage } from "next";
import Link from "next/link";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import PrevButton from "../components/PrevButton";

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
                    <PrevButton text={title} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-20">
          <Link href={{ pathname: "./survey" }}>
            <PrevButton text={"Retake Demographic Survey"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Polis;
