import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function CookiePolicy() {
  const [showCookieConsent, setShowCookieConsent] = useState(
    !Cookies.get("myCookie")
  );

  const handleButtonClick = () => {
    Cookies.set("myCookie", "accepted", { expires: 365 });
    setShowCookieConsent(false);
  };

  return (
    <div>
      {showCookieConsent && (
        <CookieConsent
          debug={true}
          location="bottom"
          buttonText="X"
          cookieName="myCookie"
          style={{ background: "#003366", alignContent: "center" }}
          buttonStyle={{ background: "#fff", color: "#000", fontSize: "13px" }}
          expires={365}
          onAccept={handleButtonClick}
        >
          <h6>
            We use cookies to understand how visitors use our app, analyze site
            traffic, and personalize content to improve the user experience. To find
            out more, see our{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </h6>
        </CookieConsent>
      )}
    </div>
  );
}

export default CookiePolicy;
