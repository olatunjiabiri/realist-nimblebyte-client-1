import React from "react";
import "./ContentWrapper.css";

const ContentWrapper = ({ children }) => {
  return (
    <div className="container-fluid my-5 p-5 content-container">
      <div className="container mt-5 pt-5">{children}</div>{" "}
    </div>
  );
};

export default ContentWrapper;
