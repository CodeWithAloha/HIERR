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
        onChange={(e) => updateCurrentAnswer(e.target.value)}
      />
    </>
  );
}
