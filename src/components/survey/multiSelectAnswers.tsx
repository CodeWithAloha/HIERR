import { AnswerType } from "./demographicssurvey";

interface MultiSelectAnswersProps {
  answers: {answer: string, answerType: AnswerType}[];
  updateCurrentAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function MultiSelectAnswers({answers, updateCurrentAnswer}: MultiSelectAnswersProps) {
  const handleSubmit = (e: any) => {
    console.log("Event is:", e)
    // TODO: Get all checked elements
    // Concatenate results
    // Submit as one csv
  }
  return (
    <>
      {
        answers.map(
          (a, index) => {
            return (
              <div key={index}>
              <input type="checkbox" id={`a-${index}`} name={`a-${index}`} value={a.answer} />
              <label htmlFor={`a-${index}`}>{a.answer}</label><br/>
              </div>
            )
          }
        )
      }
      <button className="rounded-full px-6 py-2 mx-1 bg-blue-darker text-white hover:bg-blue-default" type="submit" value="Submit" onClick={(e) => handleSubmit(e)}></button>
    </>
  )
}



