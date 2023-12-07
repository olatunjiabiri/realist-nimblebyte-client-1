import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";
import "./index.css";

export default function Wishlist() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  useEffect(() => {
    fetchAds();
  }, [auth.wishlist]);

  // useEffect(() => {
  //   // Scroll to the top of the page when the component mounts
  //   window.scrollTo(0, 0);
  // }, []);

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
        <>
          <div className="d-flex justify-content-center text-light align-items-center card-header-color">
            <div className="row">
              <div className="col-12 text-center">
                <h3>You have not liked any properties yet!</h3>
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            <div className="row pb-3">
              <div className="col-6"></div>
              <div className="col-6 text-end"></div>
              <div className="row d-flex justify-content-center">
                <div className="empty-state">
                  <img src="./empty.svg" alt="Empty" height={400} width={400} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container-fluid p-0">
          {/* <div className="row"> */}
          <div className="text-light ml-0 py-3 card-header-color">
            <div className="row">
              <div className="col-12 text-center">
                <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                  <h2>
                    You have liked {auth.wishlist.length}{" "}
                    {ads?.length > 1 ? "properties" : "property"}
                  </h2>
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
