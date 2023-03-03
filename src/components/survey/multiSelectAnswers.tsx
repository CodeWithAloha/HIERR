import { MouseEvent, useRef, useState } from "react";
import { AnswerType } from "./demographicssurvey";

interface MultiSelectAnswersProps {
  answers: {answer: string, answerType: AnswerType}[];
  updateCurrentAnswer: (val: string) => void;
}
export default function MultiSelectAnswers({answers, updateCurrentAnswer}: MultiSelectAnswersProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
  const checkboxes = (ref.current as HTMLDivElement).querySelectorAll('[type=checkbox]');
  const checkedAnswers = Array.from(checkboxes).filter(cb => (cb as HTMLInputElement).checked);
  const values = checkedAnswers.map(ca => (ca as HTMLInputElement).value).join(";")
  updateCurrentAnswer(values)
  }

  return (
    <div ref={ref}>
      {
        answers.map(
          (a, index) => {
            return (
              <div key={index}>
              <input type="checkbox" id={`a-${index}`} name={`a-${index}`} value={a.answer} onClick={() => handleClick()} />
              <label htmlFor={`a-${index}`}>{a.answer}</label><br/>
              </div>
            )
          }
        )
      }
    </div>
  )
}



