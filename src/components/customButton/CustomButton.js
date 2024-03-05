import React from "react";
import "./CustomButton.css";

// sample of how to use this reusable component

/* <div className="">
          <CustomButton label="Customed Button" />
          <span>{"  "}</span>

          <CustomButton
            className="outlined-button"
            label="Outlined Customed Button"
          />
        </div> */

const CustomButton = ({ label, className, style }) => {
  return (
    <button className={`custom-button ${className}`} style={style}>
      <span className="custom-button-label">{label} </span>
    </button>
  );
};

export default CustomButton;
