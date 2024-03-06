import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";

import CustomButton from "./../../customButton/CustomButton";
import "./NimbleRentTopBanner.css";

const NimbleRentTopBanner = ({ showButton = true }) => {
  const theme = useTheme();

  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const containerStyle = {
    height: isSmScreen && showButton ? "109px" : "80px",
  };

  const buttonStyle = {
    padding: "3px 8px",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "16px",
  };

  return (
    <div className="nimble-rent-top-banner-container" style={containerStyle}>
      <div className="nimble-rent-top-banner-text">
        <div className="nimble-rent-top-banner-textx">
          <span className="nimble-rent-top-banner-texta">Hurray</span>&nbsp;
          <span className="nimble-rent-top-banner-texta">Nimble rent</span>
          &nbsp;
          <span className="nimble-rent-top-banner-textb">
            <img src="./fire.png"></img>&nbsp;is here!!
          </span>
          &nbsp;
          <span className="nimble-rent-top-banner-textc">
            You can now rent a property and pay later
          </span>
          {showButton && (
            <span className="nimble-rent-top-banner-button">
              <CustomButton label="Check Eligibility" style={buttonStyle} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NimbleRentTopBanner;
