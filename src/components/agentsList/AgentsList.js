import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useAgent } from "../../context/agent";

import "./AgentsList.css";

const AgentsList = ({ returnedAgents }) => {
  const [agent, setAgent] = useAgent();
  setAgent(returnedAgents);

  return (
    <div className="table-responsive mt-5">
      <table className="table table-striped">
        <thead className="table-heading">
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Agent</th>
            <th scope="col"></th>
            <th scope="col">Location</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {returnedAgents.map((ag) => (
            <tr key={ag.userId} className="table-item">
              {/* <th scope="row">{1}</th> */}
              <td>
                <img
                  className="agent-image"
                  src={ag?.photo ?? "nimblelogo2.png"}
                  alt={"nimblelogo2.png"}
                />
              </td>
              <td className="data-width">
                {" "}
                <Link
                  className="link"
                  // to={`/agent/${agent.userId}`}
                  to={{
                    pathname: `/agent/${ag?.userId}`,
                    state: ag.userId,
                  }}
                >
                  <p className="agent-text1">
                    {ag.firstName}, &nbsp; {ag.lastName}
                  </p>
                </Link>
                <p className="agent-text2">{ag.company ?? "#Company"}</p>
                <p className="agent-text2">{ag.phone ?? "#PhoneNumber"}</p>
                <p className="agent-text2">
                  {ag.licenceNumber ?? "#licence No."}
                </p>
              </td>

              <td>{ag.address}</td>
              <td>{ag.email}</td>
              <td>
                <Link
                  className="link"
                  to={{
                    pathname: `/agent/${ag?.userId}`,
                    state: ag.userId,
                  }}
                >
                  <span className="more-button">
                    <FiChevronRight />
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentsList;
