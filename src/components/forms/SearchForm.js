import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import config from "../../config.js";
import { Prices } from "../../helpers/priceList";
import { action, type } from "../../helpers/actionTypeList";

import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import LocationSearchInput from "../location/LocationSearchInput.js";
import Location2 from "../location/Location2.js";

export default function SearchForm({ navMenuProperty }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [userCurrentLocation, setUserCurrentLocation] = useState("");
  // context
  const [search, setSearch] = useSearch();

  // hooks
  const navigate = useNavigate();

  const path = window.location.pathname.split("/");

  useEffect(() => {
    if (!path[1]) {
      setSearch({
        address: "",
        action: "", //Buy
        type: "", //House
        total: 0,
        pageNo: 1,
        perPage: 9,
        loading: true,
        price: "All Prices", //All price
        priceRange: [0, 1000000000000],
      });
      return;
    }
    if (path[1] === "buy") {
      search.action = "Buy";
      search.address = "";
      search.type = "Property Type";
      search.price = "All Prices"; //All price
      search.total = 0;
      search.pageNo = 1;
      search.loading = true;
      search.perPage = 9;
      search.priceRange = [0, 1000000000000];
      return;
    }
    if (path[1] === "rent") {
      search.action = "Rent";
      search.address = "";
      search.loading = true;
      search.total = 0;
      search.pageNo = 1;
      search.perPage = 9;
      search.type = "Property Type";
      search.price = "All Prices"; //All price
      search.priceRange = [0, 1000000000000];
      return;
    }
    // search.action = "";
    // search.type = "";
    // (search.price = "All price"), //All price
    //   (search.priceRange = [0, 1000000000000]),
    setSearch((prev) => ({ ...prev, address: prev.address, loading: false }));
    // console.log("search2 >>>>", search);
  }, []);

  const handleSearch = async () => {
    setSearch((prev) => ({ ...prev, loading: true }));

    try {
      const { results, page, price, pageNo, perPage, ...rest } = search;

      const query = queryString.stringify(rest);

      const { data } = await axios.get(`/search/${pageNo}/${perPage}?${query}`);

      if (search?.page !== "/search") {
        setSearch((prev) => ({
          ...prev,
          results: data.ads,
          total: data.total,
          page: window.location.pathname,
          loading: false,
        }));
        navigate("/search");
      } else {
        setSearch((prev) => ({
          ...prev,
          results: data.ads,
          total: data.total,
          page: window.location.pathname,
          loading: false,
          // action: "",
        }));
      }
    } catch (err) {
      //   console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

  useEffect(() => {
    if (path[1] === "search") {
      handleSearch();
    }
  }, [search.pageNo]);

  return (
    <>
      <div className="searchForm-container">
        <div
          className="d-flex mt-5 justify-content-center align-items-center"
          style={{
            backgroundImage: "url(/search-form-image.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center ",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="container col-lg-8">
            {/* <div className="form-control my-4 text-center rounded-pill "> */}
            {/* <div className="form-control my-4 text-center rounded-pill "> */}
            {/* <GooglePlacesAutocomplete
                apiKey={config.GOOGLE_PLACES_KEY}
                apiOptions="ng"
                selectProps={{
                  // defaultInputValue: localStorage.getItem("cLocation")
                  //   ? localStorage.getItem("cLocation")
                  //   : search?.address,
                  // inputValue: search?.address,
                  defaultInputValue: search?.address,
                  placeholder: "Enter an address, city or location",
                  onChange: ({ value }) => {
                    setSearch({ ...search, address: value.description });
                    // setFilter(false);
                  },
                  onclick: () => {
                    this.set(null);
                  },
                }}
              /> */}

            <LocationSearchInput
              value={value}
              setValue={setValue}
              userCurrentLocation={userCurrentLocation}
              setUserCurrentLocation={setUserCurrentLocation}
              options={options}
              setOptions={setOptions}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />

            <div className="d-flex flex-wrap btn-group justify-content-evenly filter-options">
              <div className="d-flex row justify-content-evenly mx-auto col-lg-8 search-controls-container">
                {!navMenuProperty && (
                  <>
                    <select
                      className="form-select mb-2 pl-1 col text-center rounded-pill mx-2"
                      aria-label="form-select select-options"
                      value={search.action}
                      onChange={(e) => {
                        setSearch({
                          ...search,
                          action: e.target.value,
                          price: "",
                        });
                      }}
                    >
                      {action.map((item) => (
                        <option
                          selected={item.selected}
                          className="optgroup"
                          key={item._id}
                          value={item.value}
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
                    value={search.type}
                    onChange={(e) => {
                      setSearch({
                        ...search,
                        type: e.target.value,
                        price: "",
                      });
                    }}
                  >
                    {/* <option selected disabled> */}
                    {/*   Property Type */}
                    {/* </option> */}
                    {type.map((item) => (
                      <option
                        className="optgroup"
                        selected={item.selected}
                        key={item._id}
                        value={item.value}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {/* {search.action === "Buy" ? (
                  <> */}
                  <select
                    className="form-select mb-2 pl-1 col text-center rounded-pill mx-2"
                    aria-label="form-select select-options"
                    value={search.price}
                    onChange={(e) => {
                      setSearch({
                        ...search,
                        price: e.target.value,
                        priceRange: Prices.find(
                          (item) => item.name === e.target.value,
                        ).array,
                      });
                    }}
                  >
                    {/* <option selected disabled>
                          Price
                        </option> */}
                    {Prices.map((item) => (
                      <option
                        className="optgroup"
                        key={item._id}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {/* </> */}
                  {/* ) : (
                    <>
                      <select
                        className="form-select mb-2 pl-1 col text-center rounded-pill mx-2"
                        aria-label="form-select select-options"
                        value={search.price}
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
                  )} */}
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
    </>
  );
}
