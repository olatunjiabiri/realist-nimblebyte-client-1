import React from "react";

import "./NimbleRentTopBanner.css";
import CustomButton from "./../../customButton/CustomButton";
import { Padding } from "@mui/icons-material";

const NimbleRentTopBanner = ({ showButton = true }) => {
  return (
    <div className="nimble-rent-top-banner-container">
      <div className="nimble-rent-top-banner-text">
        <span className="nimble-rent-top-banner-texta">Hurray</span>&nbsp;
        <span className="nimble-rent-top-banner-textb">Nimble rent</span>&nbsp;
        <span className="">
          <img src="./fire.png"></img>
        </span>
        &nbsp;
        <span className="nimble-rent-top-banner-textc">
          is here!! You can now rent a property and pay later
        </span>
      </div>
      {showButton && (
        <div className="nimble-rent-top-banner-button">
          <CustomButton
            label="Check Eligibility"
            style={{ padding: "4px 12px" }}
          />
        </div>
      )}
    </div>
  );
};

export default NimbleRentTopBanner;
