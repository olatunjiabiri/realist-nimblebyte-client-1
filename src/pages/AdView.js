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
    <div className="container-fluid d-flex flex-column h-100 mt-3">
    
      <div className="container mt-5 pt-3 h-100">
        <div className="row mt-2">
          <div className="row  mt-3 justify-content-between">
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

            <div className="d-flex  flex-div">
              <div>
                <button type="button" className="btn btn-primary btn-sm disabled">
                  {ad.type} for {ad.action === "Sell" ? "SALE" : "RENT"}
                </button>
              </div>
              <div className="flex-test">
              <span className="ml-auto"> {ad?.sold ? "❌ Off market" : "✅ In market"}</span> 

                <span className="ml-auto share-icon">{ <LikeUnlike ad={ad} /> }</span> 
                <span className="save">Save</span>

                <span>{ <FiShare ad={ad} className="h5 pointer share-icon" /> }</span> 
                <span className="save">Share</span>
              </div>
            </div>
          </div>

          <div class="col-8">
           <div>
              <ImageGallery photos={generatePhotosArray(ad?.photos)} />
            </div>
          </div>
          <div class="col-4">
            <div>
              <div className="right-side-screen">
                  <h3 className="mt-3 h2 adview-feature">
                    {" "}
                    <span>&#8358;</span>
                    {millify(ad?.price)}
                  </h3> 
                  <span> <AdFeatures ad={ad} /></span>
                  <span>Posted: {dayjs(ad?.createdAt).fromNow()}</span>
                  <p className="adview-address mt-1">
                       <span className="adview-address">{ad.address}</span>
                  </p>
                    <button type="button" class="btn btn-primary contact-agent">Contact Owner</button>
                  <div className="mt-2">
                   <MapCard ad={ad} related={related} />
                  </div>
                  <hr className="hr"/>
                  
                  <span><h5>Overview</h5></span>
                  <span>Welcome to your sun-drenched oasis where Lakeview meets Lincoln Park! This stunning 2-bedroom, 2-bathroom gem is nestled within a boutique elevator building, offering the perfect blend of modern convenience and comfort. One of the standout features of this home is the private balcony, where you can bask in the sun's rays while enjoying your morning coffee or unwind with a glass of wine in the evening. And with a deeded garage parking spot included, you'll never have to worry about finding a spot when you return home. You'll find ample closet space throughout, including three convenient hallway closets.</span>
                  
                  <h5 className="mt-3">Related Properties</h5>
                      <div className="row justify-content-center related-props">
                        {related?.map((ad) => (
                          <AdCard key={ad._id} ad={ad} />
                        ))}
                      </div>
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="row adview-flex-details">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="mt-3 h2">
                    {" "}
                    <span>&#8358;</span>
                    {millify(ad?.price)}
                    <p className="adview-address overflow-wrap overflow-wrap--break-word">
                       <span className="adview-address">{ad.address}</span>
                    </p>
                  </h3> 
                </div>
               
                <div className="adview-detail-contact-button rounded border border-muted">
                  <button type="button" className="btn btn-primary">
                    <span className="contact-agent">Contact Owner</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div>
                <MapCard ad={ad} related={related} />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className="container mb-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-2 mt-3">
            <MapCard ad={ad} related={related} />
          </div>
        </div>
      </div> */}

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
