import { Key } from "react";

interface SummaryQuestionAnswerProps {
  question: string;
  answer: string;
  key?: Key;
}

export default function SummaryQuestionAnswer({
  question,
  answer,
  key,
}: SummaryQuestionAnswerProps) {
  return (
    <li key={key} className="mt-2">
      <h3 className="font-medium text-gray">{question}</h3>
      <p className="text-primary-content">{answer}</p>
    </li>
  );
}
