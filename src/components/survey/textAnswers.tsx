interface TextAnswerProps {
  updateCurrentAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  number?:boolean
}

export default function TextAnswer({ updateCurrentAnswer, number}: TextAnswerProps) {
  const handleSubmit = (e: any) => {
    console.log(e)
  }
  return (
    <>
        <input className="border-2 border-rose-500" type="text" id="textQuestion" name="textQuestion" />
        <button className="rounded-full px-6 py-2 mx-1 hover:bg-blue-default bg-blue-darker text-white" value="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
    </>
  )
}