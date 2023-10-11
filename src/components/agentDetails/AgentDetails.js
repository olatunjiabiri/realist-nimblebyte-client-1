import React from "react";
import "./AgentDetails.css";

const AgentDetails = ({ agent }) => {
  console.log(agent[0]);
  return (
    <div className="container mt-5 py-5">
      <div className="row">
        <div className="col-md-4 agt-left-c">
          {/* <div className="agt-image"> */}
          <img
            className="agt-image"
            src={agent[0]?.photo}
            alt=""
            style={{ height: "250px", objectFit: "cover" }}
          />
          {/* </div> */}
        </div>

        <div className="col-md-8 agt-info">
          <p className="agt-text1">
            {" "}
            {agent[0].firstName.toUpperCase()} {agent[0].lastName.toUpperCase()}
          </p>
          <p className="agt-text2">{agent[0].email ?? " "}</p>
          <p className="agt-text2">{agent[0].company ?? "#Company"}</p>
          <p className="agt-text2">{agent[0].phone ?? "#PhoneNumber"}</p>
          <p className="agt-text2">
            {agent[0].licenceNumber ?? "#licence No."}
          </p>
        </div>
        <div className="agt-address">
          <p className="agt-add">{agent[0].address ?? "#address"}</p>
        </div>
        <div className="agt-about">
          <h3> About me</h3>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
