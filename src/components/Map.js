import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { Avatar } from "antd";
import millify from "millify";
// import { formatNumber } from "../helpers/ad";

const Map = (props) => {
  // const google = window.google;
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
    height: "230px",
  };
  // console.log(ad);
  //   6.5244° N, 3.3792° E
  const center = {
    lat: parseFloat(ad?.landmarkLocation?.coordinates[0]),
    lng: parseFloat(ad?.landmarkLocation?.coordinates[1]),
  };

  return (
    <div className="d-flex">
      <GoogleMap
        // onLoad={handleOnload}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        ad?.landmarkLocation?.coordinates?.length && (
        <Marker
          key={ad._id}
          position={center}
          icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
          onClick={() => handleActiveMarker(ad._id)}
          zIndex={500}
        >
          {activeMarker === ad._id ? (
            <InfoWindow
              onCloseClick={() => setActiveMarker(null)}
              anchor={null}
              marker={activeMarker}
            >
              <div className="ml-1 mt-2 map-info-window">
                <Link
                  className="text-decoration-none"
                  to={`/ad/${ad._id}`}
                  onClick={() => {}}
                >
                  <Avatar
                    src={ad?.photos[0].Location}
                    shape="square"
                    size="46"
                    className="float-left mr-1"
                  />

                  <div className="d-flex justify-content-between">
                    <h5>
                      {" "}
                      <span>&#8358;</span>
                      {/* {formatNumber(ad?.price)} */}
                      {millify(ad?.price)}
                    </h5>
                    {ad?.bedrooms !== null ? (
                      <h5> {`${ad?.bedrooms} bd ${ad?.bathrooms} ba`}</h5>
                    ) : (
                      <h5>{`${ad?.landsize}`}</h5>
                    )}
                  </div>
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
              lat: parseFloat(r?.landmarkLocation?.coordinates[0]),
              lng: parseFloat(r?.landmarkLocation?.coordinates[1]),
            }}
            zindex={110}
            onClick={() => handleActiveMarker(r._id)}
          >
            {activeMarker === r._id ? (
              <InfoWindow
                onCloseClick={() => setActiveMarker(null)}
                anchor={null}
                position={center}
                marker={activeMarker}
              >
                <div className="ml-1 mt-2 map-info-window">
                  <Link
                    className="text-decoration-none"
                    to={`/ad/${r._id}`}
                    onClick={() => window.landmarkLocation.reloadPage()}
                  >
                    <Avatar
                      src={r?.photos[0].Location}
                      shape="square"
                      size="46"
                      className="float-left mr-1"
                    />
                    <div className="d-flex justify-content-between">
                      <h5>
                        {" "}
                        <span>&#8358;</span>
                        {/* {formatNumber(r?.price)} */}
                        {millify(r?.price)}{" "}
                      </h5>
                      {r?.bedrooms !== null ? (
                        <h5>{`${r?.bedrooms} bd ${r?.bathrooms} ba`}</h5>
                      ) : (
                        <h5>{`${r?.landsize}`}</h5>
                      )}
                    </div>
                  </Link>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
