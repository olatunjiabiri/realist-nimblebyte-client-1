import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "../../components/cards/AdFeatures";
import { formatNumber } from "../../helpers/ad";
import dayjs from "dayjs";
import millify from "millify";
import ContactOwnerButton from "../contactOwnerButton/ContactOwnerButton";

export default function AdCard({ ad }) {
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4 col-md-6 col-sm-6">
      <Link className="link" to={`/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action === "Sell" ? "Sale" : "Rent"}`}
          color={`${ad?.action === "Sell" ? "blue" : "blue"}`}
        >
          <div className="card hoverable p-2 shadow-lg">
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
              <div className="d-flex justify-content-between">
                <p className="pt-3 card-text">
                  Posted {dayjs(ad?.createdAt).fromNow()}
                </p>
                <Link className="link" to={`/ad/${ad.slug}`}>
                  <p className="justify-content-end">
                    <ContactOwnerButton />
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
