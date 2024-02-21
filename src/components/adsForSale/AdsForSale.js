import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ShimmerPostList } from "react-shimmer-effects";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import AdCard from "../cards/AdCard";
import { useAuth } from "../../context/auth";
import RowPerPage from "../rowPerPage/RowPerPage.js";

const AdsForSale = ({ loading, setLoading }) => {
  let count = 0;
  count++;

  // context
  const [auth] = useAuth();

  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

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
      setAds(data.ads.filter((a) => !a.featuredPropertyStatus));

      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      //   console.log(err);
      setLoading(false);
    }
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div className="row d-flex justify-content-evenly">
        {loading ? (
          <div style={{ padding: "40px 0" }}>
            <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />
          </div>
        ) : (
          <>
            <h3 className="mt-5 text-center">Properties For Sale and Rent</h3>
            {ads?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </>
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
    </>
  );
};

export default AdsForSale;
