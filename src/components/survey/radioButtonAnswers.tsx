import { useState } from "react";
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
  const [disabledInput, setDisabledInput] = useState("");
  const handleChange = (val: string) => {
    updateCurrentAnswer(val);
    setDisabled(false);
  };
  const radioBtn = (a: SurveyAnswer) => {
    return (
      <>
        <label>
          <input
            id="radio-button"
            className="form-radio"
            type="radio"
            name="myRadio"
            value={a.answer}
            onClick={(e) => handleChange((e.target as HTMLInputElement).value)}
            onChange={(e) => {
              setDisabledInput("");
              return;
            }}
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
            id="radio-button"
            type="radio"
            className="form-radio"
            name="myRadio"
            value={a.answer}
            onClick={(e) => setDisabledInput(a.answer)}
            onChange={(e) => {
              return;
            }}
          />
          <span className="mx-2">
            {a.answer}
            <input
              className="form-input rounded"
              type={"text"}
              disabled={disabledInput !== a.answer}
              onClick={(e) =>
                handleChange(a.answer + (e.target as HTMLInputElement).value)
              }
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
