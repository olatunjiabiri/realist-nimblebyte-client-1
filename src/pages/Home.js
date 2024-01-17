import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";
import { ShimmerPostList } from "react-shimmer-effects";

import { setKey, geocode, RequestType } from "react-geocode";

import { useSearch } from "../context/search";

import config from "../config.js";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Home() {
  let count = 0;
  count++;
  setKey(config.GOOGLE_MAPS_KEY);

  // context
  const [auth, setAuth] = useAuth();
  const [search, setSearch] = useSearch();

  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (auth.user === null) {
      auth.token = "";
    }
    // setSearch((prev) => ({
    //   ...prev,
    //   address: localStorage.getItem("cLocation")
    //     ? localStorage.getItem("cLocation")
    //     : search?.address,
    //   loading: false,
    // }));

    fetchAds();
  }, []);

  useEffect(() => {
    // if (page === 1) return;
    fetchAds();
  }, [page]);

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
      },
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

  const isFirstLoad = useRef(true);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/ads/${page}/${perPage}`);
      // console.log("data", data);
      //setAds((prevAds) => [...prevAds, ...data.ads]);
      // setAds([...ads, ...data.ads]);
      setAds(data.ads);

      setTotal(data.total);
      setLoading(false);
      // if (!isFirstLoad.current) {
      //   window.scrollTo(0, 500);
      // }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  // useEffect(() => {
  //   console.log("isFirstload", isFirstLoad.current);
  //   if (isFirstLoad.current || ads.length === 0) {
  //     isFirstLoad.current = false;
  //     return;
  //   }
  // }, [ads]);
  //
  useEffect(() => {
    console.log("isFirstload", isFirstLoad.current);
    // if (isFirstLoad.current || ads.length === 0) {
    //   isFirstLoad.current = false;
    //   return;
    // }
    if (!loading) {
      window.scrollTo(0, 500);
    }
  }, [page, loading]);

  const [hasFetchedAds, setHasFetchedAds] = useState(false);

  // useEffect(() => {
  //   // If ads are fetched for the first time, update the state
  //   if (!hasFetchedAds) {
  //     setHasFetchedAds(true);
  //     return;
  //   }
  //
  //   // Perform the scroll only after the first successful fetch
  //   if (hasFetchedAds) {
  //     window.scrollTo(0, 500);
  //   }
  // }, [ads]); // Depend on ads

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
                {/* <button
                  disabled={loading}
                  className="btn btn-warning"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading
                    ? "Loading..."
                    : `${ads?.length} / ${total} Load more`}
                </button> */}

                <Stack spacing={2}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
