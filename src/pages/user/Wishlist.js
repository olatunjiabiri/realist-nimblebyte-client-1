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
    <div>
      {!ads?.length ? (
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-10%" }}
        >
          <h3 className="text-left">
            Hey{" "}
            {auth.user?.firstName
              ? auth.user?.firstName
              : auth.user?.email?.split("@")[0]}
            {/* , Welcome to Realist App */}
          </h3>
          <h3>
            {/* Hey {auth.user?.firstName ? auth.user?.firstName : auth.user?.email} */}
            , You have not liked any properties yet!
          </h3>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
              <h3>You have liked {ads?.length} properties</h3>
            </div>
          </div>

          <div className="row">
            {ads?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
