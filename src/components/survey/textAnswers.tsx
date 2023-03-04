interface TextAnswerProps {
  updateCurrentAnswer: (val: string) => void;
  number?:boolean
}

export default function TextAnswer({ updateCurrentAnswer, number}: TextAnswerProps) {
  
  return (
    <>
        <input className="border-2 border-rose-500" type="text" id="textQuestion" name="textQuestion" onChange={(e) => updateCurrentAnswer(e.target.value)} />
    </>
  )
}