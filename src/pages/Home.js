import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

export default function Home() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [adsForSell, setAdsForSell] = useState();
  const [adsForRent, setAdsForRent] = useState();

  useEffect(() => {
    if(auth.user === null){
      auth.token = ""
    }
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div >
      <SearchForm />

      </div>
      
      {/* <h1 className="display-1 bg-primary text-light p-5">For Sell</h1> */}
      <div className="container">
        <div className="row">
          {adsForSell?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        {/* </div> */}
      {/* </div> */}

      {/* <h1 className="display-1 bg-primary text-light p-5">For Rent</h1> */}
      {/* <div className="container"> */}
        {/* <div className="row"> */}
          {adsForRent?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
      {/* <pre>{JSON.stringify(auth, null, 4)} </pre>  */}
    </div>
  );
}
