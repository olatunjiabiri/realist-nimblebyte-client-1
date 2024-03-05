import React from "react";
import "./CustomButton.css";

// CustomButton component with label and style props
const CustomButton = ({ label, className, style }) => {
  return (
    <button className={`custom-button ${className}`} style={style}>
      <span className="custom-button-label">{label} </span>
    </button>
  );
};

export default CustomButton;
