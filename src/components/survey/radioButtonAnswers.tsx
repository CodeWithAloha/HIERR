interface RadioButtonAnswersProps {
  answers: string[];
  updateCurrentAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function RadioButtonAnswers({answers, updateCurrentAnswer} : RadioButtonAnswersProps) {
  return (
    <>
      <ul>
        {answers.map((a, index) => {return (
          <div key={index}>
            <label>
            <input type="radio" name="myRadio" value={a} onChange={(e) => updateCurrentAnswer(e)} />
            <span className="mx-2">{a}</span> 
          </label>
          </div>
        )})}
      </ul>
    </>
  )
}