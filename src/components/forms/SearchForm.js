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
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedType, setSelectedType] = useState(""); // State to track selected type

  // State to manage visibility of select boxes and search button
  const [showFilters, setShowFilters] = useState(false);

  const handleButtonClick = (buttonName) => {
    if (buttonName === "All") {
      setSearch((prevSearch) => ({
        ...prevSearch,
        action: buttonName,
      }));
      setSelectedType("All"); // Clear the selected type
    } else {
      setSearch((prevSearch) => ({
        ...prevSearch,
        action: buttonName,
      }));
      setSelectedType(buttonName.toLowerCase()); // Set the selected type
    }
    // Show filters and search button when a button is clicked
    setShowFilters(true);
  };

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

  // Detect screen size and hide filters on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setShowFilters(false);
      } else {
        setShowFilters(true);
      }
    };


    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle change in minimum price
  const handleMinPriceChange = (event) => {
    const newMinPrice = parseInt(event.target.value);
    setSearch((prevSearch) => ({
      ...prevSearch,
      minPrice: newMinPrice,
      maxPrice:
        newMinPrice > prevSearch.maxPrice ? newMinPrice : prevSearch.maxPrice,
    }));
  };

  // Function to handle change in maximum price
  const handleMaxPriceChange = (event) => {
    const newMaxPrice = parseInt(event.target.value);
    setSearch((prevSearch) => ({
      ...prevSearch,
      maxPrice: newMaxPrice,
    }));
  };

  // Generate options for min and max prices
  const generatePriceOptions = (start, end, step) => {
    const options = [];
    for (let i = start; i <= end; i += step) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const priceStep = 500000; // Adjust the step size as needed

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
            {/* Render only buttons 1, 2, and 3 initially */}
            <div className="top-buttons-container">
              <button
                // className="button1"
                className={
                  selectedType === "all" ? "button1 active" : "button1"
                }
                onClick={() => handleButtonClick("All Types")}
              >
                All
              </button>
              <button
                // className="button2"
                className={
                  selectedType === "buy" ? "button2 active" : "button2"
                }
                onClick={() => handleButtonClick("Buy")}
              >
                Buy
              </button>
              <button
                // className="button3"
                className={
                  selectedType === "rent" ? "button3 active" : "button3"
                }
                onClick={() => handleButtonClick("Rent")}
              >
                Rent
              </button>
            </div>
            {/* {window.innerWidth > 575 && ( */}
            {/* Render select boxes and search button when showFilters is true */}
            {showFilters && (
              <div className="search-and-filter-container">
                <div className="search-filter-container">
                  <div className="search-bar-container">
                    <div className="search-bar">
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
                    </div>
                  </div>
                  <div className="filters-container">
                    {!navMenuProperty && (
                      <>
                        <select
                          className="select1 form-select"
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
                        <select
                          className="select2 form-select"
                          aria-label="form-select select-options"
                          value={search.minPrice}
                          onChange={handleMinPriceChange}
                        >
                          {" "}
                          <option value="" disabled selected>
                            Min. Price
                          </option>
                          {generatePriceOptions(0, 1000000000, priceStep)}
                        </select>
                        <select
                          className="select3 form-select"
                          aria-label="form-select select-options"
                          value={search.maxPrice}
                          onChange={handleMaxPriceChange}
                        >
                          {" "}
                          <option value="" disabled selected>
                            Max. Price
                          </option>
                          {generatePriceOptions(
                            search.minPrice,
                            1000000000,
                            priceStep
                          )}
                        </select>
                      </>
                    )}
                    <button className="search-button" onClick={handleSearch}>
                      <img
                        src="/SearchLogo.png"
                        width={44}
                        height={44}
                        alt="SearchLogo"
                        style={{ marginLeft: "5px" }}
                      />
                      <span className="search-text">Search</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
