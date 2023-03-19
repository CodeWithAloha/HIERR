interface TextAnswerProps {
  updateCurrentAnswer: (val: string) => void;
  number?: boolean;
  setDisabled: (val: boolean) => void;
}

export default function TextAnswer({
  updateCurrentAnswer,
  number,
  setDisabled,
}: TextAnswerProps) {
  const handleChange = (val: string) => {
    updateCurrentAnswer(val);
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
