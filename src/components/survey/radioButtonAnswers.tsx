import type { SurveyAnswer } from "./demographicssurvey";

interface RadioButtonAnswersProps {
  answers: SurveyAnswer[];
  updateCurrentAnswer: (val: string) => void;
  setDisabled: (val: boolean) => void;
}
export default function RadioButtonAnswers({
  answers,
  updateCurrentAnswer,
  setDisabled,
}: RadioButtonAnswersProps) {
  const handleChange = (val: string) => {
    updateCurrentAnswer(val);
    setDisabled(false);
  };
  const radioBtn = (a: SurveyAnswer) => {
    return (
      <>
        <label>
          <input
            className="form-radio"
            type="radio"
            name="myRadio"
            value={a.answer}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span className="mx-2">{a.answer}</span>
        </label>
      </>
    );
  };

  const radioBtnText = (a: SurveyAnswer) => {
    return (
      <>
        <label>
          <input
            type="radio"
            className="form-radio"
            name="myRadio"
            value={a.answer}
          />
          <span className="mx-2">
            {a.answer}
            <input
              className="form-input rounded"
              type={"text"}
              onChange={(e) => handleChange(a.answer + e.target.value)}
            ></input>
          </span>
        </label>
      </>
    );
  };
  return (
    <>
      <ul>
        {answers.map((a, index) => {
          return (
            <div key={index}>
              {a.answerType === "option"
                ? radioBtn(a)
                : a.answerType === "optionText"
                ? radioBtnText(a)
                : null}
            </div>
          );
        })}
      </ul>
    </>
  );
}
