import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";
import Modall from "../../components/modal/Modal";
import LogoutMessage from "../../components/misc/logoutMessage/LogoutMessage";

import Wishlist from "./Wishlist";
import "./index.css";

export default function Dashboard() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const agent = auth.user?.role?.includes("Agent");

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  useEffect(() => {
    // console.log("aagent", auth);
    if (page === 1) return;
    fetchAds();
  }, [page, agent]);

  // useEffect(() => {
  //   // Scroll to the top of the page when the component mounts
  //   window.scrollTo(0, 0);
  // }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(
        `/user-ads/${auth.user?.userId}/${page}/${perPage}`
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
    <>
      <LogoutMessage>
        <Modall handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <p className="header-modal">Request Pending Approval</p>
          <div className="info-modal">
            Dear {auth?.user?.lastName},
            <br />
            <br />
            Your application to become an agent is under review. We typically
            process requests within 1-3 business days. You will receive an email
            once a decision is made.
            <br />
            <br />
            For any queries, feel free to contact us.
            <br />
            <br />
            Best,
            <br />
            NimbleCasa Team
          </div>
        </Modall>
        <div
          className="container-fluid pt-5 background-color"
          style={{ minHeight: "700px" }}
        >
          {/* className={completed ? 'text-strike' : null} */}
          <div className="card shadow border-0 mt-5">
            {!auth?.user?.info?.isApproved &&
              auth?.user?.role?.includes("Agent") && (
                <div className="notice">
                  Your request to become an agent is pending approval
                </div>
              )}
            {!auth?.user?.info?.isApproved &&
              auth?.user?.role?.includes("Admin") && (
                <div className="notice">
                  Your request to become an agent is pending approval
                </div>
              )}
            {!agent ? (
              <div className="d-flex justify-content-center text-light align-items-center card-header-color">
                <div className="row">
                  <div className="col-12 text-center">
                    <h2>
                      Hey{" "}
                      {auth.user?.firstName
                        ? auth.user?.firstName
                        : auth.user?.email?.split("@")[0]}
                      , Welcome to NimbleCasa
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                {total > 0 ? (
                  <div className="text-light ml-0 py-5 card-header-color">
                    <div className="row">
                      <div className="col-12 text-center">
                        <h1>
                          Listed Ads - Total {total}{" "}
                          {ads?.length > 1 ? "Ads" : "Ad"} found
                        </h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-light ml-0 py-2 card-header-color">
                    <div className="row">
                      <div className="col-12 text-center">
                        <h1>You have not listed any ads yet!</h1>
                      </div>
                    </div>
                  </div>
                )}

                <div className="card-body p-4">
                  <div className="row pb-3">
                    <div className="col-6"></div>
                    <div className="col-6 text-end"></div>

                    <div className="row d-flex justify-content-center">
                      {ads?.length > 0 ? (
                        ads?.map((ad) => (
                          <UserAdCard
                            setIsOpen={setIsOpen}
                            approved={!auth?.user?.info?.isApproved}
                            ad={ad}
                            key={ad._id}
                          />
                        ))
                      ) : (
                        <div className="empty-state">
                          <img
                            src="./empty.svg"
                            alt="Empty"
                            height={400}
                            width={400}
                          />
                        </div>
                      )}
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
      </LogoutMessage>
    </>
  );
}
