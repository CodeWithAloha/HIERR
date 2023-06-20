import React from "react";

const ProgressBar = ({ completed }) => {
  const containerStyles = {
    height: 3,
    width: "400px",
    backgroundColor: "white",
    opacity: 0.7,
    borderRadius: 10,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "yellowGreen",
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
