import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";

export default function Buy() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState();

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-sell");
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <LogoutMessage>
        <SearchForm navMenuProperty={true} />
        <div className="container">
          <div className="row d-flex justify-content-center">
            {ads?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </div>
      </LogoutMessage>
      {/* <pre>{JSON.stringify(auth, null, 4)} </pre> */}
    </div>
  );
}
