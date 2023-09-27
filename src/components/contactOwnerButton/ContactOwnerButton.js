import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ContactOwnerButton.css";
import { useAuth } from "../../context/auth";

const ContactOwnerButton = () => {
  const [auth, setAuth] = useAuth();
  const [ad, setAd] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          //   state: `/ad/${ad.slug}`,
          state: `/`,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className="contact-owner-button" onClick={handleClick}>
      Contact Owner
    </button>
  );
};

export default ContactOwnerButton;
