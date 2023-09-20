import React, { useState } from 'react';
import './BackToTopButton.css';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Event listener to show/hide the button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    isVisible && (
      <button className="back-to-top-button" onClick={scrollToTop}>
        Back to Top
      </button>
    )
  );
};

export default BackToTopButton;
