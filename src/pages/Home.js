import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ShimmerPostList } from "react-shimmer-effects";
import { setKey, geocode, RequestType } from "react-geocode";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import config from "../config.js";
import { useAuth } from "../context/auth";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";
import RowPerPage from "../components/rowPerPage/RowPerPage.js";

export default function Home() {
  let count = 0;
  count++;
  setKey(config.GOOGLE_MAPS_KEY);

  // context
  const [auth] = useAuth();

  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user === null) {
      auth.token = "";
    }
    fetchAds();
  }, []);

  useEffect(() => {
    fetchAds();
  }, [page, perPage]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  const success = (position) => {
    geocode(
      RequestType.LATLNG,
      `${position.coords.latitude},${position.coords.longitude}`,
      {
        location_type: "ROOFTOP", // Override location type filter for this request.
        enable_address_descriptor: true, // Include address descriptor in response.
      }
    )
      .then(({ results }) => {
        const address = results[0].formatted_address;
        const neighborhood = results[0].address_components[2].long_name;
        const { city, state, country, sublocality } =
          results[0].address_components.reduce((acc, component) => {
            if (component.types.includes("locality"))
              acc.city = component.long_name;
            else if (component.types.includes("neighborhood"))
              acc.state = component.long_name;
            else if (component.types.includes("administrative_area_level_2"))
              acc.state = component.long_name;
            else if (component.types.includes("country"))
              acc.country = component.long_name;
            return acc;
          }, {});

        localStorage.setItem("cLocation", neighborhood);
      })
      .catch(console.error);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/ads/${page}/${perPage}`);
      setAds(data.ads);

      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ads]);

  return (
    <div>
      <LogoutMessage>
        <div>
          <SearchForm />
        </div>

        <div className="container pt-3">
          <div className="row d-flex justify-content-center">
            {loading ? (
              <div style={{ padding: "40px 0" }}>
                <ShimmerPostList
                  postStyle="STYLE_FOUR"
                  col={3}
                  row={2}
                  gap={30}
                />
              </div>
            ) : (
              ads?.map((ad) => <AdCard ad={ad} key={ad._id} />)
            )}
          </div>

          {ads?.length < total ? (
            <div className="row">
              <div className="col text-center mt-4 mb-4">
                <Stack spacing={2}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RowPerPage
                      total={total}
                      rowPerPage={perPage}
                      setRowPerPage={setPerPage}
                    />

                    <Pagination
                      color="primary"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                      variant="outlined"
                      count={Math.ceil(total / perPage)}
                      page={page}
                      onChange={handleChange}
                    />
                  </div>
                </Stack>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </LogoutMessage>
      {/* <pre>{JSON.stringify(cLocation, null, 4)} </pre> */}
    </div>
  );
}
