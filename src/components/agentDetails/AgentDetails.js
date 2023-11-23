/* eslint-disable react/prop-types */
import React from "react";
// import useTheme from "@mui/system/useTheme";
// import useMediaQuery from "@mui/material/useMediaQuery";
import "./AgentDetails.css";

const AgentDetails = ({ agent }) => {
  // console.log(agent);
  return (
    <div className="container">
      <div className="box-row">
        <div className="agt-left-c agt-details">
          {/* <div className="agt-image"> */}
          <img
            className="agt-image"
            src={agent?.applicationUser.photo ?? "./nimblelogo2.png"}
            alt=""
            style={{ height: "250px", objectFit: "cover" }}
          />
          {/* </div> */}
        </div>

        <div className="agt-info">
          <p className="agt-text1">
            {" "}
            {agent?.applicationUser?.firstName?.toUpperCase()}{" "}
            {agent?.applicationUser?.lastName?.toUpperCase()}
          </p>
          <p className="agt-text2">{agent?.applicationUser?.email ?? " "}</p>
          <p className="agt-text2">
            {agent?.applicationUser?.company ?? "#Company"}
          </p>
          <p className="agt-text2">
            {agent?.applicationUser?.phone ?? "#PhoneNumber"}
          </p>
          <p className="agt-text2">
            {agent?.registrationNumber ?? "#Registration No."}
          </p>
        </div>
      </div>
      <div className="agt-address">
        <p className="agt-add">
          {agent?.applicationUser?.address ?? "#address"}
        </p>
      </div>
      <div className="agt-about">
        <h3> About me</h3>
        <p className="agt-add">
          {agent?.applicationUser?.description ?? "#description"}
        </p>
      </div>
    </div>
  );
};

export default AgentDetails;
