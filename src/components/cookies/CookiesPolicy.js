import React from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

function CookiePolicy() {
  return (
    <CookieConsent
      debug={true}
      location="bottom"
      buttonText="X"
      cookieName="myAwesomeCookieName2"
      style={{ background: "#003366", alignContent: "center" }}
      buttonStyle={{ background: "#fff", color: "#000", fontSize: "13px" }}
      expires={365}
    >
      <h6>
        We use cookies to understand how visitors use our app, analyze site
        traffic, and personalize content to improve the user experience. To find
        out more, see our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </h6>
    </CookieConsent>
  );
}

export default CookiePolicy;
