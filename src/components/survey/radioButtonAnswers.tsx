interface RadioButtonAnswersProps {
  answers: string[];
  updateCurrentAnswer: (val: string) => void;
}
export default function RadioButtonAnswers({answers, updateCurrentAnswer} : RadioButtonAnswersProps) {
  return (
    <>
      <ul>
        {answers.map((a, index) => {return (
          <div key={index}>
            <label>
            <input type="radio" name="myRadio" value={a} onChange={(e) => updateCurrentAnswer(e.target.value)} />
            <span className="mx-2">{a}</span> 
          </label>
          </div>
        )})}
      </ul>
    </>
  )
}