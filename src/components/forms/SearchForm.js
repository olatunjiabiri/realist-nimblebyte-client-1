import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import config from "../../config.js";
import { Prices } from "../../helpers/priceList";
import { action, type } from "../../helpers/actionTypeList";

import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./index.css";
import "./SearchForm.css";
import LocationSearchInput from "../location/LocationSearchInput.js";

export default function SearchForm({ navMenuProperty }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [userCurrentLocation, setUserCurrentLocation] = useState("");
  // context
  const [search, setSearch] = useSearch();
  // State to store selected min and max prices
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000000);

  // hooks
  const navigate = useNavigate();

  const path = window.location.pathname.split("/");

  // useEffect(() => {
  //   setValue(search?.address);
  // }, [search]);

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
      search.price = "All Prices";
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

  // Function to handle change in minimum price
  const handleMinPriceChange = (event) => {
    const newMinPrice = parseInt(event.target.value);
    setMinPrice(newMinPrice);
    // Ensure the max price starts from the selected min price
    if (newMinPrice > maxPrice) {
      setMaxPrice(newMinPrice);
    }
  };

  // Function to handle change in maximum price
  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
  };

  // Generate options for min and max prices
  const generateOptions = (start, end, step) => {
    const options = [];
    for (let i = start; i <= end; i += step) {
      options.push(i);
    }
    return options;
  };

  return (
    <>
      <div className="search-section">
        <div className="searchForm-container">
          <div
            className=""
            style={{
              backgroundImage: "url(/search-form-image.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center ",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
            }}
          >
            <div className="top-buttons-container">
              <button className="button1">All</button>
              <button className="button2">Buy</button>
              <button className="button3">Rent</button>
            </div>
            <div className="search-and-filter-container">
              <div className="search-filter-container">
                <div className="search-bar-container">
                  <div className="search-bar">
                    {/* <LocationSearchInput 
                      value={value}
                      setValue={setValue}
                      userCurrentLocation={userCurrentLocation}
                      setUserCurrentLocation={setUserCurrentLocation}
                      options={options}
                      setOptions={setOptions}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                    />
                     */}
                    <input
                      type="text"
                      placeholder="Search any location here"
                      className="search-input"
                      style={{ border: "none" }}
                    />
                    <img
                      src="/barLogo.png"
                      width={15}
                      height={15}
                      alt="barLogo"
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </div>
                <div className="filters-container">
                  {!navMenuProperty && (
                    <>
                      <select
                        className="select1"
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
                            className="optgroup"
                            selected={item.selected}
                            key={item._id}
                            value={item.value}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="maxPrice">Maximum Price:</label>
                      <select
                        className="select2"
                        aria-label="form-select select-options"
                        // >
                        id="minPrice"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                      >
                        {generateOptions(0, 1000000000000, 1000000).map(
                          (option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          )
                        )}

                        {/* {" "}
                        <option value="" disabled selected>
                          Min. Price
                        </option> */}
                      </select>
                      <select
                        className="select3"
                        aria-label="form-select select-options"
                        // >
                        id="maxPrice"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                      >
                        {generateOptions(minPrice, 1000000000000, 1000000).map(
                          (option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          )
                        )}

                        {/* {" "}
                        <option value="" disabled selected>
                          Max. Price
                        </option> */}
                      </select>
                    </>
                  )}

                  <img
                    className="image-class"
                    src="/SearchLogo.png"
                    width={36}
                    height={35}
                    alt="SearchLogo"
                    style={{ marginLeft: "5px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
