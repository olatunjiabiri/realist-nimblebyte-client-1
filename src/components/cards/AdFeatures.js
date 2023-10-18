import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";

export default function AdFeatures({ ad }) {
  return (
    <p className="card-text d-flex justify-content-between">
      {ad?.bedrooms ? (
        <span>
          <IoBedOutline /> {ad?.bedrooms}{ad.bedrooms === 1 ? 'bed' : 'beds'}
        </span>
      ) : (
        ""
      )}

      {ad?.bathrooms ? (
        <span>
          <TbBath /> {ad?.bathrooms}{ad.bathrooms === 1 ? 'bath' : 'baths'}
        </span>
      ) : (
        ""
      )}

      {ad?.landsize ? (
        <span>
          <BiArea /> {ad?.landsize}
        </span>
      ) : (
        ""
      )}
    </p>
  );
}
