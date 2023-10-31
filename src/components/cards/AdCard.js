import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import millify from "millify";
import AdFeatures from "../../components/cards/AdFeatures";
import { useAuth } from "../../context/auth";

// import { formatNumber } from "../../helpers/ad";

import LikeUnlike from "../../components/misc/LikeUnlike";
import {
  ImageGallery,
  generatePhotosArray,
} from "../../components/misc/ImageGallery";
import Modall from "../modal/Modal";

import "./index.css";
import ContactSellerModal from "./../contactSellerModal/ContactSellerModal";

export default function AdCard({ ad }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -200;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="d-flex col-lg-4 p-4 gx-4 gy-4 col-md-6 col-sm-6 card-height">
      <Modall handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ContactSellerModal ad={ad} />
      </Modall>
      <Link className="link" to={`/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad?.type} for ${
            ad?.action === "Sell" ? "Sale" : "Rent"
          }   |   ${ad?.sold}`}
          color={`${ad?.action === "Sell" ? "blue" : "blue"}`}
        >
          <div className="card hoverable p-2 shadow-lg">
            {/* <Link className="link" to={`/ad/${ad.slug}`}> */}
            {/* <img
              src={ad?.photos?.[0].Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              style={{
                height: "250px",
                maxWidth: "350px",
                alignSelf: "center",
                objectFit: "cover",
              }}
            />{" "} */}
            <ImageGallery
              photos={generatePhotosArray(ad?.photos)}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              height={"300"}
              width={"30"}
            />
            {/* </Link> */}
            <div className="card-body ad-card-body">
              <div className="d-flex justify-content-between">
                <h3 className="pt-1">
                  {" "}
                  <span>&#8358;</span>
                  {/* {formatNumber(ad?.price)} */}
                  {millify(ad?.price)}
                </h3>

                {auth?.user === null ? (
                  <Link className="like-unlike-button" to="/login">
                    <LikeUnlike ad={ad} size={"h2 m-3"} />
                  </Link>
                ) : (
                  <Link className="like-unlike-button">
                    <LikeUnlike ad={ad} size={"h2 m-3"} />
                  </Link>
                )}
              </div>

              <div className="card-text address-height">{ad?.address}</div>

              <AdFeatures ad={ad} />
              <div className="d-flex justify-content-between">
                <p className="pt-3 card-text">
                  Posted {dayjs(ad?.createdAt).fromNow()}
                </p>
                <p className="justify-content-end">
                  <Link className="bg-white">
                    <button
                      type="button"
                      className="contact-owner-button"
                      onClick={() => setIsOpen(true)}
                    >
                      Contact Property
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
