import Link from "next/link";
import React from "react";

interface NextButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
}

const NextButton = ({
  onClick,
  text,
  disabled,
  className,
}: NextButtonProps) => {
  const style = className ? className : "btn-primary btn text-primary-content";
  return (
    <button onClick={onClick} className={style} disabled={disabled}>
      {text}
    </button>
  );
};

export default NextButton;
