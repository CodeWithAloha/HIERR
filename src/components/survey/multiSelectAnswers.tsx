import { useRef, useState } from "react";
import {
  MULTI_ANSWER_DELIMITER,
  type SurveyAnswer,
} from "./demographicssurvey";

interface MultiSelectAnswersProps {
  answers: SurveyAnswer[];
  updateCurrentAnswer: (val: string) => void;
  setDisabled: (val: boolean) => void;
}
export default function MultiSelectAnswers({
  answers,
  updateCurrentAnswer,
  setDisabled,
}: MultiSelectAnswersProps) {
  const [disabledInput, setDisabledInput] = useState<string[]>([]);
  const ref = useRef<HTMLFormElement>(null);
  const handleClick = () => {
    const checkboxesNoText = (ref.current as HTMLFormElement).querySelectorAll(
      "[type=checkbox]:not([id*=optionText])"
    );
    const checkboxesText = (ref.current as HTMLFormElement).querySelectorAll(
      "[type=checkbox][id*=optionText]"
    );
    const checkedAnswers = Array.from(checkboxesNoText).filter(
      (cb) => (cb as HTMLInputElement).checked
    );
    const checkedTextAnswers = Array.from(checkboxesText).filter(
      (cb) => (cb as HTMLInputElement).checked
    );
    const values = checkedAnswers
      .map((ca) => (ca as HTMLInputElement).value)
      .join(MULTI_ANSWER_DELIMITER);
    const textValues = checkedTextAnswers.map(
      (ca) =>
        (ca as HTMLInputElement).value +
        (ca.nextElementSibling?.children[0] as HTMLInputElement).value
    );
    const answerValues = checkedTextAnswers.map(
      (ca) => (ca as HTMLInputElement).value
    );
    setDisabledInput(answerValues);
    const textValuesConcat = textValues.join(MULTI_ANSWER_DELIMITER);
    if (values.length > 0) {
      updateCurrentAnswer(values + MULTI_ANSWER_DELIMITER + textValuesConcat);
    } else {
      updateCurrentAnswer(textValuesConcat);
    }

    setDisabled(false);
  };

  const checkBox = (a: SurveyAnswer, index: number) => {
    return (
      <>
        <input
          type="checkbox"
          className="form-checkbox rounded"
          id={`a-${index}-option`}
          name={`a-${index}`}
          value={a.answer}
          onClick={() => handleClick()}
        />
        <label htmlFor={`a-${index}`}>&nbsp;{a.answer}</label>
        <br />
      </>
    );
  };
  console.log("Disabled inputs are:", disabledInput);
  const checkBoxText = (a: SurveyAnswer, index: number) => {
    return (
      <>
        <input
          type="checkbox"
          className="form-checkbox rounded"
          id={`a-${index}-optionText`}
          name={`a-${index}-optionText`}
          value={a.answer}
          onClick={() => handleClick()}
        />
        <label htmlFor={`a-${index}-optionText`}>
          &nbsp;{a.answer}{" "}
          <input
            disabled={!disabledInput.includes(a.answer)}
            className="form-input rounded"
            id={`${index}-userText`}
            type={"text"}
            onChange={() => handleClick()}
          ></input>
        </label>
        <br />
      </>
    );
  };

  return (
    <form ref={ref}>
      {answers.map((a, index) => {
        return (
          <div key={index}>
            &nbsp;
            {a.answerType === "option"
              ? checkBox(a, index)
              : a.answerType === "optionText"
              ? checkBoxText(a, index)
              : null}
          </div>
        );
      })}
    </form>
  );
}
