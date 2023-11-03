import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useTheme from "@mui/system/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import AgentDetails from "../components/agentDetails/AgentDetails";
import ContactAgentForm from "../components/forms/contactAgentForm/ContactAgentForm";
import config from "../NewConfig";
import AgentAdsTable from "../components/agentAdsTable/AgentAdsTable";
import AgentAdsMobileTable from "../components/agentAdsTable/AgentAdsMobileTable";

export default function Agent({ user }) {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // state
  const [agent, setAgent] = useState(null);
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [agents, setAgents] = useState();

  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetchAds();
    fetchAgents();
  }, [user?.Id]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(
        `/user-ads/${params.userId}/${page}/${perPage}`
      );
      // console.log("Ads data", data);
      setAds([data.ads]);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(
        `${config.AUTH_API}/api/Roles/GetUsersByRole?roleName=Agent`
      );
      setAgents(data.responsePayload);
      setAgent(
        data?.responsePayload.filter((a) => {
          return a.userId === params.userId;
        })
      );
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
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-7">
            {agent && <AgentDetails agent={agent} />}
          </div>

          <div className="col-lg-5 agent-contact-f">
            <ContactAgentForm agent={agent} />
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center pt-5 ads-listing">Recent Listings</h2>
        <div className="row">
          {ads.length > 0 ? (
            <>
              {isSmScreen ? (
                <AgentAdsMobileTable ads={ads} />
              ) : (
                <AgentAdsTable ads={ads} />
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <pre>{JSON.stringify(params.userId, null, 4)} </pre>
      <pre>{JSON.stringify(agent, null, 4)} </pre>
      <pre>{JSON.stringify(ads, null, 4)} </pre> */}
    </div>
  );
}
