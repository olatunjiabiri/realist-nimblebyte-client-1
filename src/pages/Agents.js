import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/cards/UserCard";
import SearchForm from "../components/forms/SearchForm";
import config from "../NewConfig";

export default function Agents() {
  // state
  const [agents, setAgents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(
        `${config.AUTH_API}/user/GetUsersByRole?roleName=Seller`
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
        <SearchForm />
      </div>
      <div className="container">
        <div className="row">
          {agents?.map((agent) => (
            <UserCard user={agent} key={agent.userId} />
          ))}
        </div>
      </div>
    </div>
  );
}
