import React, { useState, useEffect } from "react";

import { agentSpecialty } from "../../helpers/actionTypeList";
import "./index.css";

export default function AgentSearchForm({ parentCallback, agents }) {
  const [specialty, setSpecialty] = useState(true);
  const [agentName, setAgentName] = useState("");
  const [agentLocation, setAgentLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    //
  }, []);

  const handleSearch = () => {
    try {
      const filtered = Object.values(agents).filter(
        (agent) =>
          (!agentLocation ||
            agent.address
              ?.toLowerCase()
              .includes(agentLocation.toLowerCase())) &&
          (!agentName ||
            agent.firstName?.toLowerCase().includes(agentName.toLowerCase()) ||
            agent.lastName?.toLowerCase().includes(agentName.toLowerCase()))
      );
      setFilteredAgents(filtered);

      parentCallback(filtered); // returns the search results to parent component

      setAgentLocation("");
      setAgentName("");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="searchForm-container pt-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: "url(/image-resize.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center ",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="d-flex row justify-content-evenly col-lg-8 agent-search-controls-container">
            <input
              type="search"
              className="form-control pl-1 py-2 col text-center rounded-pill mx-2 my-1"
              aria-label="form-control"
              id="address"
              value={agentLocation}
              placeholder="Agent Location"
              onChange={(e) => setAgentLocation(e.target.value)}
            />

            <input
              type="search"
              className="form-control pl-1 py-2 col text-center rounded-pill mx-2 my-1"
              aria-label="form-control"
              id="agentName"
              value={agentName}
              placeholder="Agent Name"
              onChange={(e) => setAgentName(e.target.value)}
            />

            <select
              className="form-select pl-1 col text-center rounded-pill mx-2 my-1"
              aria-label="form-select select-options"
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option selected disabled>
                Specialities
              </option>
              {agentSpecialty.map((item) => (
                <option className="optgroup" key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="d-grid col mx-2 my-1 text-center">
              <button
                onClick={() => handleSearch()}
                className="btn btn-warning rounded-pill"
              >
                Search
              </button>
            </div>
            {/* <pre>{JSON.stringify(search, null, 4)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
}
