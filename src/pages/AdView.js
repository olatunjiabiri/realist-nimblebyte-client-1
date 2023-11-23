import { useParams } from "react-router-dom";
import { FiShare } from "react-icons/fi";
import { HiPause } from "react-icons/hi2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ImageGallery,
  generatePhotosArray,
} from "../components/misc/ImageGallery";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import millify from "millify";
import dayjs from "dayjs";
import AdFeatures from "../components/cards/AdFeatures";

import LikeUnlike from "../components/misc/LikeUnlike";
import MapCard from "../components/cards/MapCard";
import AdCard from "../components/cards/AdCard";
import Modall from "../../src/components/modal/Modal";
import ContactSellerModal from "../components/contactSellerModal/ContactSellerModal";
import { useAuth } from "../context/auth";
import "./AdView.css";
import { TiMediaRecord } from "react-icons/ti";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";

dayjs.extend(relativeTime);

export default function AdView() {
  // state
  const [ad, setAd] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [related, setRelated] = useState([]);
  const [soldRented, setSoldRented] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [auth, setAuth] = useAuth();

  // hooks
  const params = useParams();
  const houseType = params.slug;

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      if (data) {
        setAd(data?.ad);
        setSoldRented(data?.related.filter((r) => r.sold === "Sold"));
        setRelated(data?.related.filter((r) => r.sold !== "Sold"));
        setLoading(false);
      } else {
        setIsEmpty(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showTable = () => {
    const tableRows = [];
    for (let i = 0; i < ad?.features.length; i = i + 2) {
      tableRows.push(
        <div className="container">
          <div
            className="row"
            key={ad.features[i] + "-" + ad.features[i + 1] + "-" + i}
          >
            <div className="col">
              <li>{ad.features[i]}</li>
            </div>
            {(ad.features.length - 1 === i && ad.features.length) % 2 === 0 ? (
              <div className="col">
                <li>{ad.features[i + 1]}</li>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    }
    return tableRows;
  };

  return (
    <LogoutMessage>
      <div className="container-fluid d-flex flex-column h-100 mt-3">
        {loading ? (
          <div className="display-1 d-flex justify-content-center align-items-center vh-100">
            <span> Loading... </span>
          </div>
        ) : (
          <div>
            <Modall handleClose={() => setIsOpen(false)} isOpen={isOpen}>
              <ContactSellerModal ad={ad} setIsOpen={setIsOpen} />
            </Modall>
            <div className="container mt-5 pt-3 h-100 ">
              {/* large screen */}
              <div className="row mt-2">
                {/* page header */}
                <div className="row  mt-3 justify-content-between">
                  <div className="d-flex  flex-div">
                    <div>
                      <button
                        type="button"
                        className="btn btn-success btn-sm disabled"
                      >
                        {ad.type} for {ad.action === "Sell" ? "SALE" : "RENT"}
                      </button>
                    </div>
                    <div className="flex-test">
                      <span className="ml-auto">
                        {" "}
                        {(ad?.sold === "Sold" && "❌ Off market") ||
                          (ad?.sold === "Available" && "✅ Available ") ||
                          (ad?.sold === "Under Contract" && (
                            <span className="mt-2">
                              <HiPause className="h5 mt-1 under-contract-icon" />
                              {"Under Contract"}
                            </span>
                          ))}
                      </span>

                      <span className="ml-auto share-icon">
                        {auth?.user === null ? (
                          <Link to="/login" state={{ fromAction: "like" }}>
                            <LikeUnlike ad={ad} size={"h4"} />
                          </Link>
                        ) : (
                          <Link>
                            <LikeUnlike ad={ad} size={"h4"} />
                          </Link>
                        )}
                      </span>
                      <span className="save display-icon-description">
                        Save
                      </span>

                      <span>
                        {<FiShare ad={ad} className="h5 pointer share-icon" />}
                      </span>
                      <span className="save display-icon-description">
                        Share
                      </span>
                    </div>
                  </div>
                </div>

                {/* left-view - image_gallery*/}
                <div className="col-8 display-adview-lg">
                  <div>
                    <ImageGallery photos={generatePhotosArray(ad?.photos)} />
                  </div>
                </div>

                {/* right-view - ad_details */}
                <div className="col-4 display-adview-lg">
                  <div>
                    <div className="right-side-screen">
                      <h3 className="mt-3 h2 adview-feature adview-feature-price">
                        {" "}
                        <span>&#8358;</span>
                        {millify(ad?.price)}
                      </h3>
                      <span>
                        {" "}
                        <AdFeatures ad={ad} />
                      </span>
                      <span>Posted: {dayjs(ad?.createdAt).fromNow()}</span>
                      <p className="adview-address mt-1">
                        {/* <span className="adview-address">{ad.address}</span> */}

                        <span className="adview-address">
                          {ad?.googleMap?.map((r) => (
                            <>
                              {r.extra?.neighborhood ||
                                r.administrativeLevels?.level2long}
                              {", "}
                              {r.city}
                              {", "}
                              {r.country}
                            </>
                          ))}
                        </span>
                      </p>

                      <div>
                        <h2>{houseType}</h2>
                      </div>

                      <Link className="bg-white">
                        <button
                          type="button"
                          className="btn btn-primary contact-agent"
                          onClick={() => setIsOpen(true)}
                        >
                          Contact Agent
                        </button>
                      </Link>
                      <div className="mt-2">
                        <MapCard ad={ad} related={related} />
                      </div>

                      {/* overview */}
                      <hr className="hr" />
                      <span>
                        <h5>Overview</h5>
                      </span>
                      <span>{ad.description}</span>

                      {/* features */}
                      {ad.features.length > 0 ? (
                        <>
                          <hr />
                          <span>
                            <h5>Features</h5>
                          </span>
                          <span>{showTable()}</span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* medium and smaller screen */}
            <div className="container justify-content-center display-adview-sm">
              <div>
                <ImageGallery photos={generatePhotosArray(ad?.photos)} />
              </div>
              <div>
                <div>
                  <h3 className="mt-3 h2 adview-feature">
                    {" "}
                    <span>&#8358;</span>
                    {millify(ad?.price)}
                  </h3>
                  <span>
                    {" "}
                    <AdFeatures ad={ad} />
                  </span>
                  <span>Posted: {dayjs(ad?.createdAt).fromNow()}</span>
                  <p className="adview-address mt-1">
                    {/* <span className="adview-address">{ad.address}</span> */}
                    <span className="adview-address">
                      {ad?.googleMap?.map((r) => (
                        <>
                          {r.extra?.neighborhood ||
                            r.administrativeLevels?.level2long}
                          {", "}
                          {r.city}
                          {", "}
                          {r.country}
                        </>
                      ))}
                    </span>
                  </p>
                  {auth.user === null ? (
                    <Link className="bg-white" to="/login">
                      <button
                        type="button"
                        className="btn btn-primary contact-agent"
                        onClick={() => setIsOpen(true)}
                      >
                        Contact Agent
                      </button>
                    </Link>
                  ) : (
                    <Link className="bg-white">
                      <button
                        type="button"
                        className="btn btn-primary contact-agent"
                        onClick={() => setIsOpen(true)}
                      >
                        Contact Agent
                      </button>
                    </Link>
                  )}
                  <div className="mt-2">
                    <MapCard ad={ad} related={related} />
                  </div>

                  <div className="text-center mt-2">
                    <h5>Overview</h5>
                    <hr />
                  </div>
                  <span>{ad.description}</span>

                  {/*features*/}
                  {ad.features.length > 0 && (
                    <>
                      <div className="text-center mt-3">
                        <h5>Features</h5>
                        <hr />
                      </div>
                      <span>{showTable()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* related properties */}
            {related.length > 0 && (
              <>
                <br />
                <div className="container related-margin">
                  <h4 className="text-center mb-3">
                    Related {related.length > 1 ? "Properties" : "Property"}
                  </h4>
                  <hr />
                  <div className="row d-flex justify-content-center">
                    {related?.map((ad) => (
                      <AdCard key={ad._id} ad={ad} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Recently sold/rented properties */}
            {soldRented.length > 0 && (
              <>
                <br />
                <div className="container related-margin">
                  <h4 className="text-center mb-3">
                    Recently{" "}
                    {soldRented?.map((a) =>
                      a.action === "Rent" ? "Rented" : "Sold"
                    )}{" "}
                    {soldRented.length > 1 ? "Properties" : "Property"}
                  </h4>
                  <hr />
                  <div className="row d-flex justify-content-center">
                    {soldRented?.map((ad) => (
                      <AdCard key={ad._id} ad={ad} />
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* <pre>{JSON.stringify(related, null, 4)} </pre>
          <pre>{JSON.stringify(soldRented, null, 4)} </pre> */}
          </div>
        )}
      </div>
    </LogoutMessage>
  );
}
