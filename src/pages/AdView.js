import { useParams } from "react-router-dom";
import { FiShare } from "react-icons/fi";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ImageGallery,
  generatePhotosArray,
} from "../components/misc/ImageGallery";
import AdFeatures from "../components/cards/AdFeatures";
import millify from "millify";
import dayjs from "dayjs";
import LikeUnlike from "../components/misc/LikeUnlike";
import MapCard from "../components/cards/MapCard";
import AdCard from "../components/cards/AdCard";
import "./AdView.css";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function AdView() {
  // state
  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);
  // hooks
  const params = useParams();

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
      setAd(data?.ad);
      setRelated(data?.related);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container d-flex flex-column">
    
      <div className="mt-5 pt-3">
        <div className="row mt-2">
          <div className="row offset-lg-2 mt-3">
            {/* <div className="mt-4 mb-4">    
              {ad?.sold ? "❌ Off market" : "✅ In market"}
            </div>

            <h1 className="mt-3 h2">{ad.address}</h1>
            <AdFeatures ad={ad} />
            <h3 className="mt-3 h2">
              {" "}
              <span>&#8358;</span>
              {millify(ad?.price)}
            </h3>
            <p className="text-muted">{dayjs(ad?.createdAt).fromNow()}</p> */}

            <div className="d-flex col-lg-8 justify-content-between flex-div">
              <div>
                <button type="button" className="btn btn-primary btn-sm disabled">
                  {ad.type} for {ad.action === "Sell" ? "SALE" : "RENT"}
                </button>
              </div>
              <div className="flex-test">
                <span className="ml-auto">{ <LikeUnlike ad={ad} /> }</span> 
                <span className="save">Save</span>

                <span>{ <FiShare ad={ad} className="h5 pointer share-icon" /> }</span> 
                <span className="save">Share</span>
              </div>
            </div>
            {/* <div className="d-flex justify-content-between flex-div">
              <div className="col-lg-8">
              </div>
            </div> */}
          </div>

          <div className="row  offset-lg-2">
            <div className="col-lg-8">
              <ImageGallery photos={generatePhotosArray(ad?.photos)} />
            </div>
            
          </div>
          
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-4 offset-lg-2 mt-3">
            <MapCard ad={ad} related={related} />

            <h3 className="mt-3 h2">
              {ad?.type} in {ad?.address} for {ad?.action} <span>&#8358;</span>
            
              {millify(ad?.price)}
            </h3>

            {/* <AdFeatures ad={ad} /> */}
          </div>
        </div>
      </div>

      <div className="container">
        <h4 className="text-center mb-3">Related Properties</h4>
        <hr />

        <div className="row d-flex justify-content-center">
          {related?.map((ad) => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
}
