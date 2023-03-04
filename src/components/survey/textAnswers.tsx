interface TextAnswerProps {
  updateCurrentAnswer: (val: string) => void;
  number?:boolean
}

export default function TextAnswer({ updateCurrentAnswer, number}: TextAnswerProps) {

  if (number) {
    return (
      <>
          <input className="border-2 border-rose-500" type="text" id="textQuestion" name="textQuestion" 
                pattern="^1?[0-9]{1,2}$1[0-9][0-9]" title="Please enter a number." onChange={(e) => updateCurrentAnswer(e.target.value)} />
      </>
    )
  } return (
    <>
        <input className="border-2 border-rose-500" type="text" id="textQuestion" name="textQuestion" onChange={(e) => updateCurrentAnswer(e.target.value)} />
    </>
  )
}