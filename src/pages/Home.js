import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";

import { setKey, geocode, RequestType } from "react-geocode";

import { useSearch } from "../context/search";

import config from "../config.js";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Home() {
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

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 500);
  }, [page]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/ads/${page}/${perPage}`);
      // console.log("data", data);
      //setAds((prevAds) => [...prevAds, ...data.ads]);
      // setAds([...ads, ...data.ads]);
      setAds(data.ads);

      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <LogoutMessage>
        <div>
          <SearchForm />
        </div>

        <div className="container pt-3">
          <div className="row d-flex justify-content-center">
            {ads?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
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
                  {/* <Typography */}
                  {/*   color="primary" */}
                  {/*   shape="rounded" */}
                  {/*   variant="outlined" */}
                  {/* > */}
                  {/*   Page {page} */}
                  {/* </Typography> */}
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
                      count={Math.round(total / 9)}
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
