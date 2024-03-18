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
    const checkedAnswersNoText = Array.from(checkboxesNoText).filter(
      (cb) => (cb as HTMLInputElement).checked
    );
    const checkedAnswersText = Array.from(checkboxesText).filter(
      (cb) => (cb as HTMLInputElement).checked
    );

    const uncheckedAnswersText = Array.from(checkboxesText).filter(
      (cb) => !(cb as HTMLInputElement).checked
    );

    const checkedValuesNoText = checkedAnswersNoText.map(
      (ca) => (ca as HTMLInputElement).value
    );

    const joinedCheckedValuesNoText = checkedValuesNoText.join(
      MULTI_ANSWER_DELIMITER
    );

    const checkedValuesText = checkedAnswersText.map(
      (ca) => (ca as HTMLInputElement).value
    );

    const valuesText = checkedAnswersText.map(
      (ca) =>
        (ca as HTMLInputElement).value +
        (ca.nextElementSibling?.children[0] as HTMLInputElement).value
    );

    setDisabledInput(checkedValuesText);
    const textValuesConcat = valuesText.join(MULTI_ANSWER_DELIMITER);
    const valuesAnswerIds = checkedValuesNoText
      .map((v) => answers.find((a) => a.answer === v)?.id)
      .join(",");
    const textAnswerIds = checkedValuesText
      .map((v) => answers.find((a) => a.answer === v)?.id)
      .join(",");

    if (joinedCheckedValuesNoText.length > 0) {
      updateCurrentAnswer({
        id: valuesAnswerIds + "," + textAnswerIds,
        val:
          joinedCheckedValuesNoText + MULTI_ANSWER_DELIMITER + textValuesConcat,
      });
    } else {
      updateCurrentAnswer({
        id: valuesAnswerIds + "," + textAnswerIds,
        val: textValuesConcat,
      });
    }
    if (textValuesConcat.length === 0) {
      // clear text boxes
      uncheckedAnswersText.forEach((ca) => {
        (ca.nextElementSibling?.children[0] as HTMLInputElement).value = "";
        return;
      });
    }
    if (
      joinedCheckedValuesNoText.length === 0 &&
      textValuesConcat.length === 0
    ) {
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
