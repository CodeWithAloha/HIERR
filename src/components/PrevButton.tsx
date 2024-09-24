import Link from "next/link";
import React from "react";

interface PrevButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}

const PrevButton = ({ onClick, text, disabled }: PrevButtonProps) => {
  return (
    <button onClick={onClick} className="btn-secondary btn" disabled={disabled}>
      {text}
    </button>
  );
};

export default PrevButton;
