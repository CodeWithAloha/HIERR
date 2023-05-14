import { useState } from "react";
import type { SurveyAnswer } from "./demographicssurvey";

interface DropdownAnswersProps {
  answers: SurveyAnswer[];
  updateCurrentAnswer: (val: string) => void;
  setDisabled: (val: boolean) => void;
}

export default function DropdownAnswers({
  answers,
  updateCurrentAnswer,
  setDisabled,
}: DropdownAnswersProps) {
  const counties = answers.map((a) => a.answer.split("-")[0]);
  const uniqueCounties = [...new Set(counties)] as string[];
  const [county, setCounty] = useState(uniqueCounties[0] ?? "");

  const getFilteredWorkshopsByCounty = (val: string) => {
    const filteredWorkshops: string[] = answers
      .map((a) => a.answer)
      .filter((c) => c.includes(val));
    return filteredWorkshops.map((c) => c.split("-")[1]) as string[];
  };

  const [countyWorkshops, setCountyWorkshops] = useState<string[]>(
    getFilteredWorkshopsByCounty(uniqueCounties[0] ?? "")
  );

  const handleCountyChange = (val: string) => {
    setCounty(val);
    setCountyWorkshops(getFilteredWorkshopsByCounty(val));
  };

  const handleChange = (val: string) => {
    updateCurrentAnswer(`${county}-${val}`);
    setDisabled(false);
  };

  const dropdown = (a: string, index: number) => {
    return (
      <>
        <option key={index} value={a}>
          {a}
        </option>
      </>
    );
  };

  const countiesDropdown = uniqueCounties.map((c, index) => dropdown(c, index));

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <span>
          <label htmlFor="county" className="text-med mb-5 mr-2">
            Select your county
          </label>
          <select
            id="county"
            className="form-select mb-5 w-64 rounded"
            onChange={(e) =>
              handleCountyChange((e.target as HTMLSelectElement).value)
            }
          >
            {countiesDropdown}
          </select>
        </span>
        {countyWorkshops.length > 0 ? (
          <>
            <span>
              <label htmlFor="workshop" className="mb-5 mr-2 text-base">
                Select your workshop
              </label>
              <select
                id="workshop"
                className="form-select w-64 rounded"
                onChange={(e) =>
                  handleChange((e.target as HTMLSelectElement).value)
                }
              >
                {countyWorkshops.map((w, index) => dropdown(w, index))}
              </select>
            </span>
          </>
        ) : null}
      </div>
    </>
  );
}
