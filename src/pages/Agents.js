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
  // state
  const [agents, setAgents] = useState();
  const [loading, setLoading] = useState(true);

  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCallback = (agentSearchFormData) => {
    setFilteredAgents(agentSearchFormData);
  };
  // console.log("agentSearchFormData", filteredAgents);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(
        `${config.AUTH_API}/api/Roles/GetUsersByRole?roleName=Seller`
      );
      setAgents(data.responsePayload);
      setLoading(false);
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
    <div>
      <div>
        <AgentSearchForm parentCallback={handleCallback} agents={agents} />
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
            <div className="d-flex justify-content-center align-items-center vh-100 agents-page-init-load">
              <img
                className="agent-search-image"
                src="searching-magnifying-glass.png"
                alt=""
              />
              <h3 className="agent-search-text">
                Find agents in your area.
                <p className="mt-3">
                  Enter your location or search for a specific agent by name.
                </p>
              </h3>
            </div>
          )}
          {/* {agents?.map((agent) => (
            <UserCard user={agent} key={agent.userId} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
