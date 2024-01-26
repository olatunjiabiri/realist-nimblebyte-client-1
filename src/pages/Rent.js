import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ShimmerPostList } from "react-shimmer-effects";

import { useAuth } from "../context/auth";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";

import RowPerPage from "../components/rowPerPage/RowPerPage.js";

export default function Rent() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [page, perPage]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [ads]);

  // console.log("auth>>", auth);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/ads-for-rent/${page}/${perPage}`);
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

  return (
    <LogoutMessage>
      <div>
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
      </div>
    </LogoutMessage>
  );
}
