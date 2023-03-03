import { AnswerType, SurveyAnswer } from "./demographicssurvey";

interface RadioButtonAnswersProps {
  answers: SurveyAnswer[];
  updateCurrentAnswer: (val: string) => void;
}
export default function RadioButtonAnswers({answers, updateCurrentAnswer} : RadioButtonAnswersProps) {
  const radioBtn = (a: SurveyAnswer) => {
    return (
      <>
      <label>
            <input type="radio" name="myRadio" value={a.answer} onChange={(e) => updateCurrentAnswer(e.target.value)} />
            <span className="mx-2">{a.answer}</span> 
        </label>
      </>
    )
  }

  const radioBtnText = (a: SurveyAnswer) => {
    return (
      <>
        <label>
            <input type="radio" name="myRadio" value={a.answer} />
            <span className="mx-2">{a.answer}
            <input className="border-2 border-rose-500" type={"text"} onChange={(e) => updateCurrentAnswer(a.answer + e.target.value)}></input>
            </span> 
        </label>
      </>
    )
  }
  return (
    <>
      <ul>
        {answers.map((a, index) => {return (
          <div key={index}>
            {a.answerType === "option" ? radioBtn(a) : a.answerType === "optionText" ? radioBtnText(a) : null}
          </div> 
        )})}
      </ul>
    </>
  )
}