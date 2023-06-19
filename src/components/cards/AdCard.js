import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "../../components/cards/AdFeatures";
import { formatNumber } from "../../helpers/ad";
import dayjs from "dayjs";
import millify from "millify";

export default function AdCard({ ad }) {
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4 col-md-6 col-sm-6">
      <Link className="link" to={`/ad/${ad.slug}`}>
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
              <h3>
                {" "}
                <span>&#8358;</span>
                {/* {formatNumber(ad?.price)} */}
                {millify(ad?.price)}
              </h3>
              <p className="card-text">{ad?.address}</p>

              <AdFeatures ad={ad} />
              <p className="card-text">
                Posted {dayjs(ad?.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
