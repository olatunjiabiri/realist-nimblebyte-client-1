import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";

export default function Wishlist() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  const fetchAds = async () => {
    try {
      // const { data } = await axios.post("/wishlist", { adId: ad._id, userId: auth?.user?.userId});
      const { data } = await axios.post(`/ad-wishlist`, {
        wishlist: auth.wishlist,
      });
      // console.log('data  =>', data)
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid p-0">
      {!ads?.length ? (
        <div className="card-header bg-secondary text-light bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center"></div>
            <h3 className="text-left">
              Hey{" "}
              {auth.user?.firstName
                ? auth.user?.firstName
                : auth.user?.email?.split("@")[0]}
              ,{/* , Welcome to Realist App */}
            </h3>
            <h3>You have not liked any properties yet!</h3>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          {/* <div className="row"> */}
          <div className="card-header bg-secondary text-light bg-gradient ml-0 py-3">
            <div className="row">
              <div className="col-12 text-center">
                <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                  <h2>You have liked {ads?.length} properties</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row pb-3">
              <div className="col-6"></div>
              <div className="col-6 text-end"></div>
              <div className="row d-flex justify-content-center">
                {ads?.map((ad) => (
                  <AdCard ad={ad} key={ad._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
