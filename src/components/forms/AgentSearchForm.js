import React, { useState, useEffect } from "react";
// import { useCurrentLocation } from "../../context/currentLocation";

// import { agentSpecialty } from "../../helpers/actionTypeList";

// import "./index.css";
import "./AgentSearchForm.css";

export default function AgentSearchForm({ parentCallback, agents }) {
  // const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const [currentLocation, setCurrentLocation] = useState(
    localStorage.getItem("cLocation") ? localStorage.getItem("cLocation") : ""
  );

  // const [specialty, setSpecialty] = useState(true);
  const [agentName, setAgentName] = useState("");
  const [agentLocation, setAgentLocation] = useState(
    localStorage.getItem("cLocation") ? localStorage.getItem("cLocation") : ""
  );
  const [loading, setLoading] = useState(true);
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    setAgentLocation(currentLocation);
  }, [currentLocation]);

  const handleSearch = () => {
    try {
      const filtered = Object.values(agents).filter(
        (agent) =>
          (!agentLocation ||
            agent.applicationUser.address
              ?.toLowerCase()
              .includes(agentLocation.toLowerCase())) &&
          (!agentName ||
            agent.applicationUser.firstName
              ?.toLowerCase()
              .includes(agentName.toLowerCase()) ||
            agent.applicationUser.lastName
              ?.toLowerCase()
              .includes(agentName.toLowerCase()))
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
          className="d-flex justify-content-center align-items-center position-relative"
          style={{
            backgroundImage: "url(/image-resize.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center ",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
          }}
        >
          {" "}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value to control darkness
            }}
          />
          <div
            style={{
              zIndex: "100",
            }}
            className="d-flex row justify-content-evenly col-lg-8 agent-search-controls-container"
          >
            <div className="agent-search-title text-white">
              Contact an Agent to Sell or Lease your Property
            </div>

            <div className="search-buttons">
              <input
                type="search"
                className="form-control form-control-sm pl-1 py-2 col text-center rounded-pill mx-2 my-1"
                aria-label="form-control"
                id="address"
                value={agentLocation}
                placeholder="Agent Location"
                onChange={(e) => setAgentLocation(e.target.value)}
              />

              <input
                type="search"
                className="form-control form-control-sm pl-1 py-2 col text-center rounded-pill mx-2 my-1"
                aria-label="form-control"
                id="agentName"
                value={agentName}
                placeholder="Agent Name"
                onChange={(e) => setAgentName(e.target.value)}
              />

              {/* <select
              className="form-select pl-1 col text-center rounded-pill mx-2 my-1"
              aria-label="form-select select-options"
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option selected disabled>
                Speciality
              </option>
              {agentSpecialty.map((item) => (
                <option className="optgroup" key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select> */}
              <div
                // className="d-grid col mx-2 my-1 text-center"
                className=" btn btn-sm btn-warning form-control form-control-sm pl-1 py-2 col text-center rounded-pill mx-2 my-1"
              >
                <button
                  onClick={() => handleSearch()}
                  className="btn btn-sm btn-warning rounded-pill"
                >
                  Search
                </button>
              </div>
            </div>
            {/* <pre>{JSON.stringify(search, null, 4)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
}
