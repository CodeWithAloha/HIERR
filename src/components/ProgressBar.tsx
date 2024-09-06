import React from "react";

interface ProgressBarProps {
  completed: number;
}

const ProgressBar = ({ completed }: ProgressBarProps) => {
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "yellowGreen",
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
    minHeight: "100%",
  };

  return (
    <div className="border-radius-10 m-2 h-2 w-[400px] bg-white opacity-70">
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
