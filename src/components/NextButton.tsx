import Link from "next/link";
import React from "react";

interface NextButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}

const NextButton = ({ onClick, text, disabled }: NextButtonProps) => {
  return (
    <button onClick={onClick} className="btn" disabled={disabled}>
      {text}
    </button>
  );
};

export default NextButton;
