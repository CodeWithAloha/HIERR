interface TextAnswerProps {
  updateCurrentAnswer: (val: string) => void;
  number?: boolean;
}

export default function TextAnswer({
  updateCurrentAnswer,
  number,
}: TextAnswerProps) {
  return (
    <>
      <input
        className="form-input rounded"
        type="text"
        id="textQuestion"
        name="textQuestion"
        pattern={number ? "^1?[0-9]{1,2}$1[0-9][0-9]" : ""}
        title={number ? "Please enter a number." : ""}
        onChange={(e) => updateCurrentAnswer(e.target.value)}
      />
    </>
  );
}
