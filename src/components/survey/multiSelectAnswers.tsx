import { MouseEvent } from "react";
import { AnswerType } from "./demographicssurvey";

interface MultiSelectAnswersProps {
  answers: {answer: string, answerType: AnswerType}[];
  updateCurrentAnswer: (val: string) => void;
}
export default function MultiSelectAnswers({answers, updateCurrentAnswer}: MultiSelectAnswersProps) {

  return (
    <>
      {
        answers.map(
          (a, index) => {
            return (
              <div key={index}>
              <input type="checkbox" id={`a-${index}`} name={`a-${index}`} value={a.answer} onClick={(e) => updateCurrentAnswer((e.target as HTMLInputElement).value)} />
              <label htmlFor={`a-${index}`}>{a.answer}</label><br/>
              </div>
            )
          }
        )
      }
    </>
  )
}



