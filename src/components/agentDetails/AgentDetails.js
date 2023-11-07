/* eslint-disable react/prop-types */
import React from "react";
// import useTheme from "@mui/system/useTheme";
// import useMediaQuery from "@mui/material/useMediaQuery";
import "./AgentDetails.css";

const AgentDetails = ({ agent }) => {
  // console.log(agent);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-12 agt-left-c agt-details">
          {/* <div className="agt-image"> */}
          <img
            className="agt-image"
            src={agent?.applicationUser.photo}
            alt=""
            style={{ height: "250px", objectFit: "cover" }}
          />
          {/* </div> */}
        </div>

        <div className="col-md-8 col-sm-12 agt-info text-center">
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
        <div className="agt-address col-md-8 col-sm-12 ">
          <p className="agt-add">
            {agent?.applicationUser?.address ?? "#address"}
          </p>
        </div>
        <div className="agt-about col-md-8 col-sm-12 ">
          <h3> About me</h3>
          <p className="agt-add">
            {agent?.applicationUser?.description ?? "#description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
