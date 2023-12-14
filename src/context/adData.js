// DataContext.js
import React, { useContext, createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [ddata, setDdata] = useState({
    adData: null,
  });

  // Retrieve ddata from local storage on component mount
  useEffect(() => {
    let storedData = localStorage.getItem("adData");
    if (storedData) setDdata(JSON.parse(localStorage.getItem("adData")));
  }, []);
  // Update local storage whenever ddata changes
  useEffect(() => {
    localStorage.setItem("adData", JSON.stringify(ddata));
  }, [ddata]);

  return (
    <DataContext.Provider value={[ddata, setDdata]}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);
export { useData, DataProvider };
