import React, { useState, useEffect } from "react";
import { setKey, geocode, RequestType } from "react-geocode";

import { agentSpecialty } from "../../helpers/actionTypeList";
import config from "../../NewConfig";

// import "./index.css";
import "./AgentSearchForm.css";

export default function AgentSearchForm({ parentCallback, agents }) {
  const [specialty, setSpecialty] = useState(true);
  const [agentName, setAgentName] = useState("");
  const [agentLocation, setAgentLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredAgents, setFilteredAgents] = useState([]);

  setKey(config.GOOGLE_MAPS_KEY);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  const success = (position) => {
    geocode(
      RequestType.LATLNG,
      `${position.coords.latitude},${position.coords.longitude}`,
      {
        location_type: "ROOFTOP", // Override location type filter for this request.
        enable_address_descriptor: true, // Include address descriptor in response.
      }
    )
      .then(({ results }) => {
        const neighborhood = results[0].address_components[2].long_name;
        const { city, state, country, sublocality } =
          results[0].address_components.reduce((acc, component) => {
            if (component.types.includes("locality"))
              acc.city = component.long_name;
            else if (component.types.includes("neighborhood"))
              acc.state = component.long_name;
            else if (component.types.includes("administrative_area_level_2"))
              acc.state = component.long_name;
            else if (component.types.includes("country"))
              acc.country = component.long_name;
            return acc;
          }, {});
        // console.log(city, state, country, sublocality);
        // console.log(neighborhood);

        setAgentLocation(neighborhood || city);

        // console.log(address);
      })
      .catch(console.error);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

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
            <div className="agent-search-title">Find an Agent</div>
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
                Speciality
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
