import React, { useState, useEffect } from "react";
import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";
import AdCard from "../components//cards/AdCard";

export default function Search() {
  const [search, setSearch] = useSearch();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    // window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <SearchForm />

      <div className="container">
        <div className="row d-flex justify-content-center">
          {search.results?.length > 0 ? (
            <>
              <div className="col-md-12 text-center p-3">
                <button className="btn btn-info disabled">
                  <b>Found {search.results?.length} results</b>
                </button>
              </div>

              <div className="row d-flex justify-content-center">
                {search?.results?.map((item) => (
                  <AdCard ad={item} key={item._id} />
                ))}
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
