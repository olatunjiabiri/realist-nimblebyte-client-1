import { Badge } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AdFeatures from "../../components/cards/AdFeatures";
import { formatNumber } from "../../helpers/ad";
import millify from "millify";
import { useNavigate } from "react-router-dom";

export default function UserAdCard({ ad, setIsOpen, approved }) {
  let navigate = useNavigate();

  const handleClick = (event) => {
    // Prevent default link behavior
    event.preventDefault();

    // Check if the modal should be opened
    if (approved) {
      navigate(`/user/ad/${ad._id}`);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4 col-md-6 card-width">
      <Link
        to={`/user/ad/${ad._id}`}
        // onClick={handleClick}
        className="text-decoration-none"
      >
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action === "Sell" ? "Sale" : "Rent"}`}
          color={`${ad?.action === "Sell" ? "green" : "blue"}`}
        >
          <div className="card hoverable shadow">
            <img
              src={ad?.photos?.[0].Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="card-body ad-card-body">
              <div className="d-flex justify-content-between">
                <div className=" ">
                  <h3>
                    <span>&#8358;</span>
                    {/* {formatNumber(ad?.price)} */}
                    {millify(ad?.price)}
                  </h3>
                </div>
              </div>
              <p className="card-text address-height">{ad?.address}</p>

              <AdFeatures ad={ad} />
              <div className="d-flex justify-content-between">
                <div className="">
                  <button
                    className={`btn ${
                      ad.publishedStatus === "Published"
                        ? "btn-primary"
                        : "btn-warning"
                    }`}
                  >
                    {ad.publishedStatus === "Published"
                      ? "Published"
                      : "Pending"}
                  </button>
                </div>
                <div className="">
                  <button
                    className={`btn ${
                      (ad.sold === "Sold" && "btn-danger") ||
                      (ad.sold === "Available" && "btn-success") ||
                      (ad.sold === "Under Contract" && "btn-warning")
                    }`}
                    style={{ width: "150px" }}
                  >
                    {ad.sold === "Sold" && ad?.action === "Rent"
                      ? "Rented"
                      : ad?.sold}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
