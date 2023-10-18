import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import millify from "millify";
import { HashLink } from "react-router-hash-link";
import AdFeatures from "../../components/cards/AdFeatures";
// import { formatNumber } from "../../helpers/ad";

import ContactOwnerButton from "../contactOwnerButton/ContactOwnerButton";
import LikeUnlike from "../../components/misc/LikeUnlike";

import {
  ImageGallery,
  generatePhotosArray,
} from "../../components/misc/ImageGallery";
import "./index.css";

export default function AdCard({ ad }) {
  const { pathname } = useLocation();

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
      <Link className="link" to={`/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad?.type} for ${
            ad?.action === "Sell" ? "Sale" : "Rent"
          }   |   ${ad?.sold ? "Not Available" : "Available"}`}
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
                <section className="like-unlike-button">
                  <LikeUnlike ad={ad} />
                </section>
              </div>

              <div className="card-text address-height">{ad?.address}</div>

              <AdFeatures ad={ad} />
              <div className="d-flex justify-content-between">
                <p className="pt-3 card-text">
                  Posted {dayjs(ad?.createdAt).fromNow()}
                </p>
                <p className="justify-content-end">
                  <HashLink
                    className="bg-white"
                    smooth
                    to={`/ad/${ad.slug}/#contact-owner`}
                    scroll={(el) => scrollWithOffset(el)}
                  >
                    <ContactOwnerButton />
                  </HashLink>
                </p>
              </div>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
