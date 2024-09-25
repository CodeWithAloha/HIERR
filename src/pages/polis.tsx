import { type NextPage } from "next";
import Link from "next/link";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import PrevButton from "../components/PrevButton";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";

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

  return (
    <>
      <PageLayout>
        <PageHeader title="Step 3: Please select the Pol.is survey you wish to complete." />
        <div className={`flex flex-row flex-wrap sm:gap-2 md:gap-4 lg:gap-6`}>
          {surveys?.map(({ id, title }, index) => {
            return (
              <div
                className="mb-4 flex items-center justify-center"
                key={`survey-button-next-page-${index}`}
              >
                <div className="w-full">
                  <Link
                    href={{
                      pathname: `./polissurvey`,
                      query: { surveyId: id },
                    }}
                  >
                    <button className="btn-primary btn bg-[#FFF] text-primary-content md:min-w-[150px]">
                      {title}
                    </button>
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
      </PageLayout>
    </>
  );
};

export default Polis;
