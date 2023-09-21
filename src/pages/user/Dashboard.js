import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";

import Wishlist from "./Wishlist";
// import "./index.css";

export default function Dashboard() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const seller = auth.user?.role?.includes("Seller");

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  useEffect(() => {
    if (page === 1) return;
    fetchAds();
  }, [page]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(
        `/user-ads/${auth.user?.userId}/${page}`
      );
      // setAds(data.ads);
      // console.log("data", data);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container-fluid pt-5 background-color"
      style={{ minHeight: "700px" }}
    >
      {/* className={completed ? 'text-strike' : null} */}
      <div className="card shadow border-0 mt-4">
        {!seller ? (
          <div className=" container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
              <div className="col-12 text-center">
                <h2>
                  Hey{" "}
                  {auth.user?.firstName
                    ? auth.user?.firstName
                    : auth.user?.email?.split("@")[0]}
                  , Welcome to Realist App
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            {total > 1 && (
              <div className="card-header bg-secondary text-light bg-gradient ml-0 py-3">
                <div className="row">
                  <div className="col-12 text-center">
                    <h1>Listed ads - Total {total} ads found</h1>
                  </div>
                </div>
              </div>
            )}

            <div className="card-body p-4">
              <div className="row pb-3">
                <div className="col-6"></div>
                <div className="col-6 text-end"></div>

                <div className="row d-flex justify-content-center">
                  {ads?.map((ad) => (
                    <UserAdCard ad={ad} key={ad._id} />
                  ))}
                </div>

                {ads?.length < total ? (
                  <div className="row">
                    <div className="col text-center mt-4 mb-4">
                      <button
                        disabled={loading}
                        className="btn btn-warning"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                      >
                        {loading
                          ? "Loading..."
                          : `${ads?.length} / ${total} Load more`}
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}

        <Wishlist />
        {/* <pre>{JSON.stringify(auth, null, 4)} </pre> */}
      </div>
    </div>
  );
}
