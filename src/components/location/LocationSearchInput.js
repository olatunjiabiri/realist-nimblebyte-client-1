import React, { useEffect, useMemo, useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { setKey, geocode, RequestType } from "react-geocode";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
import { useSearch } from "../../context/search.js";
import { currentLocation } from "../../helpers/currentLocation.js";

import config from "../../config.js";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function LocationSearchInput({
  value,
  setValue,
  inputValue,
  setInputValue,
  options,
  setOptions,
  userCurrentLocation,
  setUserCurrentLocation,
}) {
  const [search, setSearch] = useSearch();

  const loaded = useRef(false);

  setKey(config.GOOGLE_MAPS_KEY);

  useEffect(() => {
    if (typeof window !== "undefined" && !loaded.current) {
      if (!document.querySelector("#google-maps")) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_KEY}`,
          document.querySelector("head"),
          "google-maps",
        );
      }

      loaded.current = true;
    }
  }, []);

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    // console.log({ value, options, inputValue });
    // if (value === newValue) {
    //   setSearch({ ...search, address: value });
    //   console.log({ search });
    // }

    return () => {
      active = false;
    };
    // }, [value, options, inputValue, search]);
  }, [inputValue]);

  const defaultOption = ["Current Location"];

  const searchOptions = [...options, ...defaultOption];

  //current Location logic start here
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, [navigator.geolocation]);

  const success = (position) => {
    geocode(
      RequestType.LATLNG,
      `${position.coords.latitude},${position.coords.longitude}`,
      {
        location_type: "ROOFTOP", // Override location type filter for this request.
        enable_address_descriptor: true, // Include address descriptor in response.
      },
    )
      .then(({ results }) => {
        const address = results[0].formatted_address;
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

        // localStorage.setItem("cLocation", neighborhood);
        setUserCurrentLocation(address);

        setSearch((prev) => ({ ...prev, address }));
      })
      .catch(console.error);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  return (
    <div className="d-flex w-full justify-content-center my-4">
      <Autocomplete
        id="google-map-demo"
        autoHighlight
        sx={{
          width: "75%",
          maxWidth: 1200, // Adjust the maximum width as needed
          "& .MuiTextField-root": {
            borderRadius: "50px",
            backgroundColor: "#ffffff",
          },
          "& .MuiAutocomplete-inputRoot": {
            padding: "10px", // Adjust the input padding as needed
          },
          "& .MuiAutocomplete-listbox": {
            marginTop: "5px", // Adjust the listbox margin as needed
          },
        }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={searchOptions}
        autoComplete
        //   includeInputInList
        filterSelectedOptions
        value={value}
        // noOptionsText="No locations"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          // newValue === "Current Location"
          //   ? setSearch({ ...search, address: localStorage.getItem("cLocation") })
          //   : setSearch({ ...search, address: value?.description });
          if (newValue !== "Current Location") {
            console.log("new value", newValue);
            setSearch((prev) => ({ ...prev, address: newValue?.description }));
          }

          setValue(
            newValue === "Current Location" ? userCurrentLocation : newValue,
          );
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        // onSelect={setSearch({ ...search, address: value })}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Enter an address, city or location"
            placeholder="Enter an address, city or location"
            fullWidth
            variant="filled"
          />
        )}
      />
    </div>
  );
}
