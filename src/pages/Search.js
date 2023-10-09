import React, { useState, useEffect } from "react";
import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";
import AdCard from "../components//cards/AdCard";

export default function Search() {
  const [search, setSearch] = useSearch();
  const [searchFilters, setSearchFilters] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      {/* <h1 className="display-1 bg-primary text-light p-5">Search</h1> */}
      <SearchForm />

      <div className="container">
        <div className="row">
          {search.results?.length > 0 ? (
            <div className="col-md-12 text-center p-5">
             <button className="btn btn-info disabled">
             <b>Found {search.results?.length} results</b>
             </button>
            </div>
          ) : (
            <div className="col-md-12 text-center p-5"><b>No properties found</b></div>
          )}
        </div>

        <div className="row">
          {search.results?.map((item) => (
            <AdCard ad={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
