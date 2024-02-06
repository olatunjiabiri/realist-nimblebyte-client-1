import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ShimmerPostList } from "react-shimmer-effects";
import { setKey, geocode, RequestType } from "react-geocode";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useAuth } from "../context/auth";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";

import RowPerPage from "../components/rowPerPage/RowPerPage.js";
import FeaturedProperties from "../components/featuredProperties/FeaturedProperties.js";

export default function Home() {
  let count = 0;
  count++;

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

        <div className="container mt-3 px-4">
          <FeaturedProperties />
        </div>

        <div className="container pt-3 px-4">
          <div className="row d-flex justify-content-evenly">
            <h3 className="mt-5">Properties For Sale and Rent</h3>

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
                    <RowPerPage
                      total={total}
                      rowPerPage={perPage}
                      setRowPerPage={setPerPage}
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
