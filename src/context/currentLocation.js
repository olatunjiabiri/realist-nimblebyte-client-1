import React, { useState, createContext, useContext } from "react";

const CurrentLocationContext = createContext();

const CurrentLocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({
    currentAddress: null,
  });

  return (
    <CurrentLocationContext.Provider
      value={[currentLocation, setCurrentLocation]}
    >
      {children}
    </CurrentLocationContext.Provider>
  );
};

const useCurrentLocation = () => useContext(CurrentLocationContext);

export { useCurrentLocation, CurrentLocationProvider };
