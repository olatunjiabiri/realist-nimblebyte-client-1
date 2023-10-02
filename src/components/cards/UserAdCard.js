import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "../../components/cards/AdFeatures";
import { formatNumber } from "../../helpers/ad";
import millify from "millify";

export default function UserAdCard({ ad }) {
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4 col-md-6">
      <Link to={`/user/ad/${ad.slug}`} className="text-decoration-none">
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action}`}
          color={`${ad?.action === "Sell" ? "blue" : "blue"}`}
        >
          <div className="card hoverable shadow">
            <img
              src={ad?.photos?.[0].Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="card-body">
              <div className="card-body d-flex justify-content-between">
                <div className=" ">
                  <h3>
                    <span>&#8358;</span>
                    {/* {formatNumber(ad?.price)} */}
                    {millify(ad?.price)}
                  </h3>
                </div>
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
              </div>
              <p className="card-text">{ad?.address}</p>

              <AdFeatures ad={ad} />
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
