import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShimmerPostList } from "react-shimmer-effects";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useAuth } from "../context/auth";
import { useSearch } from "../context/search";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";
import RowPerPage from "../components/rowPerPage/RowPerPage.js";

export default function Buy() {
  // context
  const [auth, setAuth] = useAuth();
  const [search, setSearch] = useSearch();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [loading, setLoading] = useState(false);

  // state
  const [ads, setAds] = useState();

  useEffect(() => {
    fetchAds();
  }, [page, perPage]);

  useEffect(() => {
    const path = window.location.pathname.split("/");

    if (path[1] === "buy") {
      search.action = "Buy";
    } else if (path[1] === "rent") {
      search.action = "Rent";
    } else search.action = "";
    search.type = "";

    setSearch((prev) => ({ ...prev, address: prev.address, loading: false }));
    // console.log("search buy >>>>", search);
  }, []);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [ads]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/ads-for-sell/${page}/${perPage}`);
      setAds(data?.ads);
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

  return (
    <div>
      <LogoutMessage>
        <SearchForm navMenuProperty={true} />
        <div className="container">
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
        </div>
      </LogoutMessage>
      {/* <pre>{JSON.stringify(auth, null, 4)} </pre> */}
    </div>
  );
}
