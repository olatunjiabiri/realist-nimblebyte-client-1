import React from 'react'
import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchForm() {
  // context
  const [search, setSearch] = useSearch();
  // hooks
  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearch({ ...search, loading: false });
    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      console.log("query===>", query);

      const { data } = await axios.get(`/search?${query}`);

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
      <div
        className="d-flex align-items-center"
        style={{
          backgroundImage: "url(/banner2.png)",
          backgroundSize: "auto 100%",
          backgroundPosition: "left top",
          height: 400,
          width: "100%",
        }}
      >
        <div className="container" style={{ height: 150 }}>
          <div className="row ">
            <div className="col-lg-12 form-control">
              <GooglePlacesAutocomplete
                apiKey={GOOGLE_PLACES_KEY}
                apiOptions="ng"
                selectProps={{
                  defaultInputValue: search?.address,
                  placeholder: "Search for address..",
                  onChange: ({ value }) => {
                    setSearch({ ...search, address: value.description });
                  },
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
              className={`${
                search.action === "Buy"
                  ? "btn btn-primary col-lg-2"
                  : "btn btn-primary col-lg-2 text-white"
              }`}
            >
              {/* {search.action === "Buy" ? "✅ Buy" : "Buy"} */}
              Buy
            </button>
            <button
              onClick={() =>
                setSearch({ ...search, action: "Rent", price: "" })
              }
              className={`${
                search.action === "Rent"
                  ? "btn btn-primary col-lg-2"
                  : "btn btn-primary col-lg-2 text-white"
              }`}
            >
              {/* {search.action === "Rent" ? "✅ Rent" : "Rent"} */}
              Rent
            </button>
            <button
              onClick={() => setSearch({ ...search, type: "House", price: "" })}
              className={`${
                search.type === "House"
                  ? "btn btn-primary col-lg-2"
                  : "btn btn-primary col-lg-2 text-white"
              }`}
            >
              {/* {search.type === "House" ? "✅ House" : "House"} */}
              House
            </button>
            <button
              onClick={() => setSearch({ ...search, type: "Land", price: "" })}
              className={`${
                search.type === "Land"
                  ? "btn btn-primary col-lg-2"
                  : "btn btn-primary col-lg-2 text-white"
              }`}
            >
              {/* {search.type === "Land" ? "✅ Land" : "Land"} */}
              Land
            </button>

            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
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
            </div>

            <button onClick={handleSearch} className="btn btn-danger col-lg-2">
              Search
            </button>
          </div>

          {/* <pre>{JSON.stringify(search, null, 4)}</pre> */}
        </div>
      </div>
    </>
  );
}
