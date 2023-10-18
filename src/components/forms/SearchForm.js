import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import config from "../../NewConfig";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import { action, type } from "../../helpers/actionTypeList";

import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { setKey, geocode, RequestType } from "react-geocode";

export default function SearchForm({ navMenuProperty }) {
  // context
  const [search, setSearch] = useSearch();
  const [purpose, setPurpose] = useState(true);
  const [propertyType, setPropertyType] = useState(true);
  const [price, setPrice] = useState(true);
  const [filter, setFilter] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(null);

  // hooks
  const navigate = useNavigate();

  setKey(config.GOOGLE_MAPS_KEY);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    setPurpose(path[1] === "buy" ? "Buy" : path[1]);
    search.action = path[1] === "buy" ? "Buy" : path[1];
    setSearch((prev) => ({ ...prev, address: prev.address, loading: false }));
    // console.log("search", search);
  }, []);

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
        // const address = results[0].formatted_address;
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
        // console.log(city, state, country, sublocality);
        // console.log(neighborhood);
        // setSearch({ ...search, address });
        setSearch({ ...search, address: neighborhood });

        setCurrentAddress(neighborhood);

        // console.log(address);
      })
      .catch(console.error);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  const handleSearch = async () => {
    setSearch({ ...search, loading: false });

    // console.log("search options>>>>", search);

    try {
      const { results, page, price, ...rest } = search;
      // console.log("rest options>>>>", rest);

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
      {currentAddress && (
        <div className="searchForm-container pt-5">
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
                    defaultInputValue: currentAddress || search?.address,
                    placeholder: "Search for address..",
                    onChange: ({ value }) => {
                      setSearch({ ...search, address: value.description });
                      setFilter(false);
                    },
                    onclick: () => {
                      this.set(null);
                    },
                  }}
                />
              </div>

              <div className="d-flex flex-wrap btn-group justify-content-evenly filter-options">
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
                          <option selected disabled>
                            Price
                          </option>
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
              {/* <pre>{JSON.stringify(search.address, null, 4)}</pre> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
