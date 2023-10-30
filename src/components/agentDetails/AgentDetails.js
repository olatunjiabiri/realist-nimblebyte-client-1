import React from "react";
import "./AgentDetails.css";

const AgentDetails = ({ agent }) => {
  console.log(agent[0]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-12 agt-left-c agt-details">
          {/* <div className="agt-image"> */}
          <img
            className="agt-image"
            src={agent[0]?.photo}
            alt=""
            style={{ height: "250px", objectFit: "cover" }}
          />
          {/* </div> */}
        </div>

        <div className="col-md-8 col-sm-12 agt-info text-center">
          <p className="agt-text1">
            {" "}
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
        <div className="agt-address col-md-8 col-sm-12 ">
          <p className="agt-add">{agent[0].address ?? "#address"}</p>
        </div>
        <div className="agt-about col-md-8 col-sm-12 ">
          <h3> About me</h3>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
