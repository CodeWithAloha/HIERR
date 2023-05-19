import { useEffect, useMemo, useState } from "react";
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
  const uniqueCounties = useMemo(() => {
    const counties = answers.map((a) => a.answer.split("-")[0]);
    return ["--", ...new Set(counties)] as string[];
  }, [answers]);

  const [county, setCounty] = useState(uniqueCounties[0] ?? "");

  const getFilteredWorkshopsByCounty = (val: string) => {
    const filteredWorkshops: string[] = answers
      .map((a) => a.answer)
      .filter((c) => c.includes(val));
    return [
      "--",
      ...(filteredWorkshops.map((c) => c.split("-")[1]) as string[]),
    ];
  };

  const [countyWorkshops, setCountyWorkshops] = useState<string[]>(
    getFilteredWorkshopsByCounty(uniqueCounties[0] ?? "")
  );

  useEffect(() => {
    if (county === "--") {
      setDisabled(true);
    }
    setCountyWorkshops(getFilteredWorkshopsByCounty(county));
  }, [county, answers]);

  const handleChange = (val: string) => {
    updateCurrentAnswer(`${county}-${val}`);
    if (county !== "--" && val !== "--") {
      setDisabled(false);
    }
    if (county === "--" || val === "--") {
      setDisabled(true);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <>
          <label htmlFor="county" className="text-med mb-5 mr-2">
            Select your county
          </label>
          <select
            id="county"
            className="form-select mb-5 w-64 rounded"
            onChange={(e) => setCounty((e.target as HTMLSelectElement).value)}
          >
            {uniqueCounties.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </>
        {countyWorkshops.length > 0 && (
          <>
            <label htmlFor="workshop" className="mb-5 mr-2 text-base">
              Select your workshop
            </label>
            <select
              id="workshop"
              className="form-select mb-5 w-64 rounded"
              onChange={(e) =>
                handleChange((e.target as HTMLSelectElement).value)
              }
            >
              {countyWorkshops.map((w, index) => (
                <option key={index} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </>
  );
}
