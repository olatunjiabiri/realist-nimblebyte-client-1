import React, { useState, useEffect } from "react";
import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";
import AdCard from "../components//cards/AdCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ShimmerPostList } from "react-shimmer-effects";

export default function Search() {
  const [search, setSearch] = useSearch();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    // window.scrollTo(0, 0);
  }, []);

  const handleChange = (event, value) => {
    setSearch((prev) => ({
      ...prev,
      pageNo: value,
      loading: true,
      // action: "",
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search?.results]);

  return (
    <div>
      <SearchForm />

      <div className="container">
        <div className="row d-flex justify-content-center">
          {search.results?.length > 0 ? (
            <>
              <div className="col-md-12 text-center p-3">
                {/* <button className="btn btn-info disabled"> */}
                {/*   {/* <b>Showing {search?.results?.length} of {search.total} results in page {search?.pageNo}</b> */}
                {/*   <b> */}
                {/*     Displaying {search?.results?.length} out of {search.total}{" "} */}
                {/*     results found, shown on page {search?.pageNo}. */}
                {/*   </b> */}
                {/*   {/* <b>Displaying {search?.results?.length * search?.pageNo} out of {search.total} results found, shown on page {search?.pageNo}.</b> */}
                {/* </button> */}
                <button className="btn btn-info disabled">
                  <b>
                    Displaying {9 * (search.pageNo - 1) + 1 || 1} to{" "}
                    {9 * search.pageNo - (9 - search?.results?.length) + 0} out
                    of {search.total} results found, shown on page{" "}
                    {search?.pageNo}.
                  </b>
                </button>
              </div>

              <div className="row d-flex justify-content-center">
                {/* {search?.results?.map((item) => ( */}
                {/*   <AdCard ad={item} key={item._id} /> */}
                {/* ))} */}

                {search.loading ? (
                  <div style={{ padding: "40px 0" }}>
                    <ShimmerPostList
                      postStyle="STYLE_FOUR"
                      col={3}
                      row={2}
                      gap={30}
                    />
                  </div>
                ) : (
                  search?.results?.map((ad) => <AdCard ad={ad} key={ad._id} />)
                )}
                {search?.results?.length < search.total ? (
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
                            count={Math.ceil(search?.total / search.perPage)}
                            page={search.pageNo}
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
            </>
          ) : (
            <div className="col-md-12 text-center p-5">
              <b>No properties found</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
