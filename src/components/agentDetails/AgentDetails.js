/* eslint-disable react/prop-types */
import React from "react";
import useTheme from "@mui/system/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./AgentDetails.css";

const AgentDetails = ({ agent }) => {
  console.log("agent", agent[0]);
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="container">
      <div className="row">
        <div
          style={{
            display: "flex",
            flexDirection: isSmScreen ? "column" : "row",
            justifyContent: isSmScreen ? "center" : "flex-start",
            alignItems: isSmScreen ? "center" : "center",
          }}
        >
          <img
            // className="agt-image"
            src={agent[0]?.photo}
            alt=""
            style={{
              height: "250px",
              width: "250px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              marginTop: isSmScreen ? "20px" : "0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: isSmScreen ? "center" : "flex-start",
              alignItems: isSmScreen ? "center" : "flex-start",
              paddingLeft: isSmScreen ? "0px" : "20px",
            }}
          >
            <p className="agt-text1">
              {agent[0]?.firstName?.toUpperCase()}{" "}
              {agent[0]?.lastName?.toUpperCase()}
            </p>
            <p className="agt-text2">{agent[0].email ?? " "}</p>
            <p className="agt-text2">{agent[0].company ?? "#Company"}</p>
            <p className="agt-text2">{agent[0].phone ?? "#PhoneNumber"}</p>
            <p className="agt-text2">
              {agent[0].licenceNumber ?? "#licence No."}
            </p>
          </div>
        </div>

        <div className="agt-address col-md-8 col-sm-12 ">
          <p className="agt-add">{agent[0].address ?? "#address"}</p>
        </div>
        <div className="agt-about col-md-8 col-sm-12 ">
          <h3> About me</h3>
          <p className="agt-text2">
            {agent[0].description ?? "#No description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
