import React, { useEffect, useState } from "react";
import axios from "axios";
import useTheme from "@mui/system/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import AgentsList from "../components/agentsList/AgentsList";
import AgentsMobileList from "../components/agentsList/AgentsMobileList";

import config from "../NewConfig";
import AgentSearchForm from "./../components/forms/AgentSearchForm";

import "./Agents.css";

export default function Agents() {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentLocation, setCurrentLocation] = useState(
    localStorage.getItem("cLocation") ? localStorage.getItem("cLocation") : ""
  );

  // state
  const [agents, setAgents] = useState();
  const [loading, setLoading] = useState(true);

  const [filteredAgents, setFilteredAgents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, [currentLocation]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCallback = (agentSearchFormData) => {
    setFilteredAgents(agentSearchFormData);
  };

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(
        `${config.AUTH_API}/api/Roles/GetUsersByRole?roleName=Seller`
      );
      setAgents(data.responsePayload);
      setLoading(false);
      // console.log("agents new>>", data.responsePayload);

      // console.log("clocation first", currentLocation);
      const afiltered = Object.values(data.responsePayload).filter((agent) =>
        agent.address?.toLowerCase().includes(currentLocation?.toLowerCase())
      );
      // console.log("afiltered", afiltered);

      setFiltered(afiltered.length > 0 ? afiltered : agents);
      // console.log("filteredAgents 234", filtered);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-10%" }}
      >
        <div className="display-1">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {filteredAgents && (
        <div>
          <div>
            <AgentSearchForm
              parentCallback={handleCallback}
              agents={agents}
              agentLocation={currentLocation}
            />
          </div>
          <div className="container">
            <div className="row">
              {filteredAgents.length > 0 ? (
                <>
                  {isSmScreen ? (
                    <AgentsMobileList returnedAgents={filteredAgents} />
                  ) : (
                    <AgentsList returnedAgents={filteredAgents} />
                  )}
                </>
              ) : (
                // <div className="d-flex justify-content-center align-items-center vh-100 agents-page-init-load">
                <>
                  {isSmScreen ? (
                    <AgentsMobileList
                      returnedAgents={filtered ? filtered : agents}
                    />
                  ) : (
                    <AgentsList returnedAgents={filtered ? filtered : agents} />
                  )}
                </>
              )}
              {/* {agents?.map((agent) => (
            <UserCard user={agent} key={agent.userId} />
          ))} */}
            </div>
          </div>
          {/* <pre>{JSON.stringify(currentLocation, null, 4)} </pre> */}
          {/* <pre>{JSON.stringify(agents, null, 4)} </pre> */}
        </div>
      )}
    </>
  );
}
