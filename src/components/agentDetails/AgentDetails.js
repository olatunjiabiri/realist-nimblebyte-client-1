/* eslint-disable react/prop-types */
import React from "react";
// import useTheme from "@mui/system/useTheme";
// import useMediaQuery from "@mui/material/useMediaQuery";
import "./AgentDetails.css";

const AgentDetails = ({ agent }) => {
  console.log("agent", agent[0]);
  // const theme = useTheme();
  // const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="container">
      <div className="row">
        <div className="box">
          <img src={agent[0]?.photo} alt="" className="agt-image" />
          <div className="box-details">
            <p className="agt-text1">
              {agent[0]?.firstName?.toUpperCase()}{" "}
              {agent[0]?.lastName?.toUpperCase()}
              Hillary Clinton
            </p>
            <p className="agt-text2">
              {agent[0]?.email ?? "somethin@mail.com"}
            </p>
            <p className="agt-text2">{agent[0]?.company ?? "#Company"}</p>
            <p className="agt-text2">{agent[0]?.phone ?? "#PhoneNumber"}</p>
            <p className="agt-text2">
              {agent[0]?.licenceNumber ?? "#licence No."}
            </p>
          </div>
        </div>

        <div className="agt-address col-md-8 col-sm-12 ">
          <p className="agt-add">{agent[0]?.address ?? "#address"}</p>
        </div>
        <div className="agt-about col-md-8 col-sm-12 ">
          <h3> About me</h3>
          <p className="agt-text2">
            {agent[0]?.description ?? "#No description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
