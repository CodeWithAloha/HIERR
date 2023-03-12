import { MouseEvent, useRef, useState } from "react";
import { AnswerType, SurveyAnswer } from "./demographicssurvey";

interface MultiSelectAnswersProps {
  answers: SurveyAnswer[];
  updateCurrentAnswer: (val: string) => void;
}
export default function MultiSelectAnswers({
  answers,
  updateCurrentAnswer,
}: MultiSelectAnswersProps) {
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
      .join(";");
    const textValues = checkedTextAnswers
      .map(
        (ca) =>
          (ca as HTMLInputElement).value +
          (ca.nextElementSibling?.children[0] as HTMLInputElement).value
      )
      .join(";");
    updateCurrentAnswer(values + ";" + textValues);
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
        <label htmlFor={`a-${index}`}>{a.answer}</label>
        <br />
      </>
    );
  };

  // TODO: Fix this
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
          {a.answer}{" "}
          <input
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
