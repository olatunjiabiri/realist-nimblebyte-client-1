import React, { useState } from "react";
import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import config from "../../NewConfig";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import { action, type } from "../../helpers/actionTypeList";

import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

export default function SearchForm({ navMenuProperty }) {
  // context
  const [search, setSearch] = useSearch();
  const [purpose, setPurpose] = useState(true);
  const [propertyType, setPropertyType] = useState(true);
  const [price, setPrice] = useState(true);
  const [filter, setFilter] = useState(true);

  // hooks
  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearch({ ...search, loading: false });

    // console.log("search options>>>>", search);

    try {
      const { results, page, price, ...rest } = search;

      const query = queryString.stringify(rest);
      // console.log("query===>", query);

      const { data } = await axios.get(`/search?${query}`);

      // console.log("data===>", data);

      if (search?.page !== "/search") {
        setSearch((prev) => ({ ...prev, results: data, loading: false }));
        navigate("/search");
      } else {
        setSearch((prev) => ({
          ...prev,
          results: data,
          page: window.location.pathname,
          loading: false,
        }));
      }
    } catch (err) {
      //   console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

  return (
    <>
      <div className="searchForm-container mt-5 pt-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: "url(/image-resize.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center ",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="container col-lg-8">
            <div className="form-control my-4 text-center rounded-pill ">
              <GooglePlacesAutocomplete
                apiKey={config.GOOGLE_PLACES_KEY}
                apiOptions="ng"
                selectProps={{
                  defaultInputValue: search?.address,
                  placeholder: "Search for address..",
                  onChange: ({ value }) => {
                    setSearch({ ...search, address: value.description });
                    setFilter(false);
                  },
                }}
              />
            </div>

            <div
              className="d-flex flex-wrap btn-group justify-content-evenly filter-options"
              //className=""
            >
              <div className="row justify-content-evenly col-lg-8">
                {!navMenuProperty && (
                  <>
                    <select
                      className="form-select mb-2 pl-1 col text-center rounded-pill mx-2"
                      aria-label="form-select select-options"
                      onChange={(e) => {
                        setSearch({
                          ...search,
                          action: e.target.value,
                          price: "",
                        });
                        setPropertyType(false);
                      }}
                    >
                      <option selected disabled>
                        Purpose
                      </option>
                      {action.map((item) => (
                        <option
                          className="optgroup"
                          key={item._id}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                (
                <>
                  <select
                    className="form-select mb-2 pl-1 col text-center rounded-pill mx-2"
                    aria-label="form-select select-options"
                    // disabled={filter}
                    onChange={(e) => {
                      setSearch({
                        ...search,
                        type: e.target.value,
                        price: "",
                      });
                    }}
                  >
                    <option selected disabled>
                      Property Type
                    </option>
                    {type.map((item) => (
                      <option
                        className="optgroup"
                        key={item._id}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {search.action === "Buy" ? (
                    <>
                      <select
                        className="form-select mb-2 pl-1 col text-center rounded-pill mx-2"
                        aria-label="form-select select-options"
                        // disabled={filter}
                        onChange={(e) => {
                          setSearch({
                            ...search,
                            price: e.target.value,
                            priceRange: sellPrices.find(
                              (item) => item.name === e.target.value
                            ).array,
                          });
                        }}
                      >
                        <option selected disabled>
                          Price
                        </option>
                        {sellPrices.map((item) => (
                          <option
                            className="optgroup"
                            key={item._id}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <select
                        className="form-select mb-2 pl-1 col text-center rounded-pill mx-2"
                        aria-label="form-select select-options"
                        // disabled={filter}
                        onChange={(e) => {
                          setSearch({
                            ...search,
                            price: e.target.value,
                            priceRange: rentPrices.find(
                              (item) => item.name === e.target.value
                            ).array,
                          });
                        }}
                      >
                        <option selected>Price</option>
                        {rentPrices.map((item) => (
                          <option
                            className="optgroup"
                            key={item._id}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </>
                )
              </div>
            </div>
            <div className="d-grid col-5 mx-auto text-center mt-3">
              <button
                onClick={handleSearch}
                className="btn btn-warning rounded-pill"
              >
                Search
              </button>
            </div>
            {/* <pre>{JSON.stringify(search, null, 4)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
}
