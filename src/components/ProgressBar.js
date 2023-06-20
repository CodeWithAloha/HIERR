import React from "react";

const ProgressBar = ({ completed }) => {
  const containerStyles = {
    height: 3,
    width: "80%",
    backgroundColor: "white",
    opacity: 0.7,
    borderRadius: 10,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "purple",
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
