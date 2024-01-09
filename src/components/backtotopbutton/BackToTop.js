import React, { useState } from "react";
import "./BackToTopButton.css";
import { FaAngleDoubleUp } from "react-icons/fa";
// import backToTop from "../../backToTop.svg"

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Event listener to show/hide the button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    isVisible && (
      <button className="back-to-top-button" onClick={scrollToTop}>
        {/* <backToTop /> */}
        <FaAngleDoubleUp />
      </button>
    )
  );
};

export default BackToTopButton;
