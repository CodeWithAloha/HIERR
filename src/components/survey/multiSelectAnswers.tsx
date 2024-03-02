import { useRef, useState } from "react";
import {
  MULTI_ANSWER_DELIMITER,
  type SurveyAnswer,
} from "./demographicssurvey";

interface MultiSelectAnswersProps {
  answers: SurveyAnswer[];
  updateCurrentAnswer: (ans: { id: string; val: string }) => void;
  setDisabled: (val: boolean) => void;
}
export default function MultiSelectAnswers({
  answers,
  updateCurrentAnswer,
  setDisabled,
}: MultiSelectAnswersProps) {
  const [disabledInput, setDisabledInput] = useState<string[]>([]);
  const ref = useRef<HTMLFormElement>(null);
  const handleClick = (answerId: string) => {
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

    const uncheckedTextAnswers = Array.from(checkboxesText).filter(
      (cb) => !(cb as HTMLInputElement).checked
    );

    const justValues = checkedAnswers.map(
      (ca) => (ca as HTMLInputElement).value
    );

    const values = checkedAnswers
      .map((ca) => (ca as HTMLInputElement).value)
      .join(MULTI_ANSWER_DELIMITER);

    const justCheckedTextAnswers = checkedTextAnswers.map(
      (ca) => (ca as HTMLInputElement).value
    );

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
    const valuesAnswerIds = justValues
      .map((v) => answers.find((a) => a.answer === v)?.id)
      .join(",");
    const textAnswerIds = justCheckedTextAnswers
      .map((v) => answers.find((a) => a.answer === v)?.id)
      .join(",");
    if (values.length > 0) {
      updateCurrentAnswer({
        id: valuesAnswerIds + "," + textAnswerIds,
        val: values + MULTI_ANSWER_DELIMITER + textValuesConcat,
      });
    } else {
      updateCurrentAnswer({
        id: valuesAnswerIds + "," + textAnswerIds,
        val: textValuesConcat,
      });
    }
    if (textValuesConcat.length === 0) {
      // clear text boxes
      uncheckedTextAnswers.forEach((ca) => {
        (ca.nextElementSibling?.children[0] as HTMLInputElement).value = "";
        return;
      });
    }
    if (values.length === 0 && textValuesConcat.length === 0) {
      setDisabled(true);
      return;
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
          onClick={() => handleClick(a.id)}
        />
        <label htmlFor={`a-${index}`}>&nbsp;{a.answer}</label>
        <br />
      </>
    );
  };
  const checkBoxText = (a: SurveyAnswer, index: number) => {
    return (
      <>
        <input
          type="checkbox"
          className="form-checkbox rounded"
          id={`a-${index}-optionText`}
          name={`a-${index}-optionText`}
          value={a.answer}
          onClick={() => handleClick(a.id)}
        />
        <label htmlFor={`a-${index}-optionText`}>
          &nbsp;{a.answer}{" "}
          <input
            disabled={!disabledInput.includes(a.answer)}
            className="form-input rounded"
            id={`${index}-userText`}
            type={"text"}
            onChange={() => handleClick(a.id)}
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
