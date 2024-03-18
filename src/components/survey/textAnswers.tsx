interface TextAnswerProps {
  updateCurrentAnswer: (ans: { id: string; val: string }) => void;
  number?: boolean;
  setDisabled: (val: boolean) => void;
  answers: { id: string; answer: string }[];
}

export default function TextAnswer({
  updateCurrentAnswer,
  number,
  setDisabled,
  answers,
}: TextAnswerProps) {
  const handleChange = (val: string) => {
    if (answers === undefined || answers.length === 0) return;
    const answerId = answers[0]?.id ?? "";
    updateCurrentAnswer({ id: answerId, val });
    setDisabled(false);
  };
  return (
    <>
      <input
        className="form-input rounded"
        type="text"
        id="textQuestion"
        name="textQuestion"
        pattern={number ? "^1?[0-9]{1,2}$1[0-9][0-9]" : ""}
        title={number ? "Please enter a number." : ""}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}
