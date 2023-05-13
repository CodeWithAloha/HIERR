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
  const handleChange = (val: string) => {
    updateCurrentAnswer(val);
    setDisabled(false);
  };

  const dropdown = (a: SurveyAnswer) => {
    return (
      <>
        <option value={a.answer}>{a.answer}</option>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <select
          className="form-select w-64 rounded"
          onChange={(e) => handleChange((e.target as HTMLSelectElement).value)}
        >
          {answers.map((a) => dropdown(a))}
        </select>
      </div>
    </>
  );
}
