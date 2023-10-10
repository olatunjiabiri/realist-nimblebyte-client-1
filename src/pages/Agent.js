import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/cards/UserCard";
import AdCard from "../components/cards/AdCard";

export default function Agent({ user }) {
  // state
  const [agent, setAgent] = useState(null);
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetchAds();
  }, [user?.Id]);

  console.log(params);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(
        `/user-ads/${params.userId}/${page}/${perPage}`
      );
      console.log("Ads data", data);
      setAds([data.ads]);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
      <div className="container">
        <div className="row">
          <div className="col-lg-4"></div>
          <UserCard user={user} />
          <div className="col-lg-4"></div>
        </div>
      </div>

      <h2 className="text-center m-5">Recent Listings</h2>

      <div className="container">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
      <pre>{JSON.stringify(ads, null, 4)} </pre>
    </div>
  );
}
