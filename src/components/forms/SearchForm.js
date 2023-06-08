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

export default function SearchForm() {
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
    // if (search?.price === "") {
    //   // setSearch((prev) => ({ ...prev, price: "All price" }));
    //   setSearch({
    //     ...search,
    //     price: "All price",
    //     loading: false,
    //   });
    // }

    // if (search?.action === "") {
    //   // setSearch((prev) => ({ ...prev, action: "Buy" }));
    //   setSearch({
    //     ...search,
    //     action: "Buy",
    //     loading: false,
    //   });
    // }
    // if (search?.type === "") {
    //   // setSearch((prev) => ({ ...prev, type: "House" }));
    //   setSearch({
    //     ...search,
    //     type: "House",
    //     loading: false,
    //   });
    // }

    console.log("search options>>>>", search);

    try {
      const { results, page, price, ...rest } = search;

      const query = queryString.stringify(rest);
      console.log("query===>", query);

      const { data } = await axios.get(`/search?${query}`);

      console.log("data===>", data);

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
      console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

  return (
    <>
      <div className="searchForm-container">
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
          <div className="container bg-secondary bg-gradient filter-container">
            <div className="form-control">
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
              {/* </div> */}
            </div>

            <div className="d-flex flex-wrap btn-group justify-content-center filter-options">
              <div className="form-row m-1">
                <select
                  className="form-control pl-1"
                  aria-label="form-select select-options"
                  // size={3}
                  disabled={filter}
                  // defaultValue="Purpose"
                  onClick={(e) => {
                    setSearch({
                      ...search,
                      action: e.target.value,
                    });
                  }}
                  onChange={(e) => {
                    setSearch({ ...search, action: e.target.value });
                    setPropertyType(false);
                  }}
                >
                  <option selected>Purpose</option>
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

                <select
                  className="form-control pl-1"
                  aria-label="form-select select-options"
                  disabled={filter}
                  onChange={(e) => {
                    setSearch({ ...search, type: e.target.value });
                  }}
                  onClick={(e) => {
                    setSearch({ ...search, type: e.target.value });
                  }}
                >
                  <option selected>Property Type</option>
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
                      className="form-control pl-1"
                      aria-label="form-select select-options"
                      disabled={filter}
                      onClick={(e) => {
                        // {
                        sellPrices.map((item) =>
                          setSearch({
                            ...search,
                            price: item.name,
                            priceRange: item.array,
                          })
                        );
                        // }
                      }}
                    >
                      <option selected>Price</option>
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
                      className="form-control pl-1"
                      aria-label="form-select select-options"
                      disabled={filter}
                      onClick={(e) => {
                        // {
                        rentPrices.map((item) =>
                          setSearch({
                            ...search,
                            price: item.name,
                            priceRange: item.array,
                          })
                        );
                        // }
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
                <div className="col-md-12 text-center mt-0">
                  <button onClick={handleSearch} className="btn btn-danger">
                    Search
                  </button>
                </div>
              </div>

              {/* <div className="dropdown m-1"> */}
              {/* <button
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                > */}
              {/* Purpose */}
              {/* &nbsp; {search?.action ? search.action : "Purpose"}
                </button> */}

              {/* <ul className="dropdown-menu">
                  <>
                    {action.map((item) => (
                      <li key={item._id}>
                        <button
                          onChange={() => {
                            setSearch({
                              ...search,
                              action: item.name,
                              // price: "",
                            });
                          }}
                          onClick={() => {
                            setSearch({
                              ...search,
                              action: item.name,
                              // price: "",
                            });
                          }}
                          className="dropdown-item"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </>
                </ul> */}
              {/* </div> */}

              {/* <div className="dropdown  m-1">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  &nbsp; {search?.type ? search.type : "Property Type"}
                </button> */}

              {/* <ul className="dropdown-menu">
                  <>
                    {type.map((item) => (
                      <li key={item._id}>
                        <button
                          onChange={(e) =>
                            setSearch({ ...search, type: e.target.value })
                          }
                          onClick={() => {
                            setSearch({
                              ...search,
                              type: item.name,
                              // price: "",
                            });
                          }}
                          className="dropdown-item"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </>
                </ul>
              </div> */}

              {/* <div className="dropdown  m-1">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  &nbsp; {search?.price ? search.price : "Price"}
                </button>

                <ul className="dropdown-menu">
                  {search.action === "Buy" ? (
                    <>
                      {sellPrices.map((item) => (
                        <li key={item._id}>
                          <button
                            onClick={() => {
                              setSearch({
                                ...search,
                                price: item.name,
                                priceRange: item.array,
                              });
                            }}
                            className="dropdown-item"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </>
                  ) : (
                    <>
                      {rentPrices.map((item) => (
                        <li key={item._id}>
                          <button
                            onClick={() => {
                              setSearch({
                                ...search,
                                price: item.name,
                                priceRange: item.array,
                              });
                            }}
                            className="dropdown-item"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div> */}

              {/* <div className="dropdown  m-1">
                <button onClick={handleSearch} className="btn btn-danger">
                  Search
                </button>
              </div> */}
            </div>

            {/* <pre>{JSON.stringify(search, null, 4)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
}
