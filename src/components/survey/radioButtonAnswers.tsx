import type { SurveyAnswer } from "./demographicssurvey";
import { useState } from 'react';

interface RadioButtonAnswersProps {
  answers: SurveyAnswer[];
  updateCurrentAnswer: (val: string) => void;
}
export default function RadioButtonAnswers({
  answers,
  updateCurrentAnswer,
}: RadioButtonAnswersProps) {
  const radioBtn = (a: SurveyAnswer) => {
    return (
      <>
        <label>
          <input
            type="radio"
            name="myRadio"
            value={a.answer}            
            onChange={(e) => updateCurrentAnswer(e.target.value)}
          />
          <span className="mx-2">{a.answer}</span>
        </label>
      </>
    );
  };
  const radioBtnText = (a: SurveyAnswer) => {
    // document.querySelectorAll("[value=Female]")[0].checked
    const isActive = (answerVal: string) => {
      const answerInput = (document.querySelectorAll(`[value='${answerVal}']`)[0] as HTMLInputElement)
      console.log("Answer Input:", answerInput)
      if(answerInput)
      {
        console.log("Checked:", answerInput.checked)
      }
      return answerInput && !answerInput.checked;
    }

    return (
      <>
        <label>
          <input type="radio" name="myRadio" value={a.answer} />
          <span className="mx-2">
            {a.answer}
            <input
            disabled={isActive(a.answer)}
              className="border-rose-500 border-2"
              type={"text"}
              onChange={(e) => updateCurrentAnswer(a.answer + e.target.value)}
            ></input>
          </span>
        </label>
      </>
    );
  };

  // const radioBtnText = (a: SurveyAnswer) => {
  //   return (
  //     <>
  //       <label>
  //         <input type="radio" name="myRadio" value={a.answer} />
  //         <span className="mx-2">
  //           {a.answer}
  //           <input
  //             className="border-rose-500 border-2"
  //             type={"text"}
  //             onChange={(e) => updateCurrentAnswer(a.answer + e.target.value)}
  //           ></input>
  //         </span>
  //       </label>
  //     </>
  //   );
  // };
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
