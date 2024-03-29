import React, { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const innitialState = {
  address: "",
  action: "", //Buy
  type: "", //House
  price: "All price", //All price
  priceRange: [0, 1000000000000],
  results: [],
  page: "",
  total: 0,
  pageNo: 1,
  perPage: 9,
  loading: false,
};

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(innitialState);

  return (
    <SearchContext.Provider value={[search, setSearch, innitialState]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
