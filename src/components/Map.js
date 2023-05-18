import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { formatNumber } from "../helpers/ad";
import { Avatar } from "antd";
import { Fragment } from "react";

const Map = (props) => {
  const { ad, related } = props;
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // const handleOnload = (map) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   ad.forEach(({ coordinate }) => bounds.extend(coordinate));
  //   map.fitBounds(bounds);
  // };

  const containerStyle = {
    width: "100%",
    height: "300px",
  };
  console.log(ad);
  //   6.5244° N, 3.3792° E
  const center = {
    lat: parseFloat(ad?.location?.coordinates[1]),
    lng: parseFloat(ad?.location?.coordinates[0]),
  };

  return (
    <Fragment>
      <GoogleMap
        // onLoad={handleOnload}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        ad?.location?.coordinates?.length && (
        <Marker
          key={ad._id}
          position={center}
          icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
          onClick={() => handleActiveMarker(ad._id)}
          zIndex={500}
        >
          {activeMarker === ad._id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div className="ml-1 mt-2 map-info-window">
                <Link to={`/ad/${ad.slug}`} onClick={() => {}}>
                  <Avatar
                    src={ad?.photos[0].Location}
                    shape="square"
                    size="46"
                    className="float-left mr-1"
                  />

                  <h6>
                    {" "}
                    <span>&#8358;</span>
                    {formatNumber(ad?.price)}
                    {ad?.bedrooms !== null ? (
                      <p>{`${ad?.bedrooms} bd ${ad?.bathrooms} ba`}</p>
                    ) : (
                      <p>{`${ad?.landsize}`}</p>
                    )}
                  </h6>
                </Link>
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
        )
        {related?.map((r) => (
          <Marker
            key={r?._id}
            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            position={{
              lat: parseFloat(r?.location?.coordinates[1]),
              lng: parseFloat(r?.location?.coordinates[0]),
            }}
            zindex={110}
            onClick={() => handleActiveMarker(r._id)}
          >
            {activeMarker === r._id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="ml-1 mt-2 map-info-window">
                  <Link
                    to={`/ad/${r.slug}`}
                    onClick={() => window.location.reloadPage()}
                  >
                    <Avatar
                      src={r?.photos[0].Location}
                      shape="square"
                      size="46"
                      className="float-left mr-1"
                    />

                    <h6>
                      {" "}
                      <span>&#8358;</span>
                      {formatNumber(r?.price)}
                      {r?.bedrooms !== null ? (
                        <p>{`${r?.bedrooms} bd ${r?.bathrooms} ba`}</p>
                      ) : (
                        <p>{`${r?.landsize}`}</p>
                      )}
                    </h6>
                  </Link>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </Fragment>
  );
};

export default Map;
