import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CookiePolicy() {
  const [showCookieConsent, setShowCookieConsent] = useState(
    !Cookies.get("myCookie")
  );

  const handleButtonClick = () => {
    Cookies.set("myCookie", "accepted", { expires: 365 });
    setShowCookieConsent(false);
  };

  return (
    <div className="d-flex justify-content-center">
      {showCookieConsent && (
        <CookieConsent
          debug={true}
          location="bottom"
          buttonText={<AiOutlineCloseCircle />}
          cookieName="myCookie"
          style={{
            background: "#003366",
            alignContent: "center",
            width: "50%",
            position: "fixed",
            // left: "50%",
          }}
          buttonStyle={{
            background: "none",
            color: "white",
            fontSize: "25px",
            paddingRight: "10px",
            padding: "0px 10px 0px",
            margin: "0px 10px 0px",
          }}
          expires={365}
          onAccept={handleButtonClick}
        >
          We use cookies to understand how visitors use our app, analyze site
          traffic, and personalize content to improve the user experience. To
          find out more, see our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>
        </CookieConsent>
      )}
    </div>
  );
}

export default CookiePolicy;
