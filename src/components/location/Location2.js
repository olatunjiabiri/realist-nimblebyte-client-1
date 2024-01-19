import React, { useState } from "react";
import {
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const CustomAutocomplete = () => {
  const [address, setAddress] = useState("");

  const handleSelect = async (selectedAddress) => {
    try {
      if (selectedAddress === "Current Location") {
        // Handle current location
        handleCurrentLocation();
      } else {
        // Handle selected address
        const results = await geocodeByAddress(selectedAddress);
        const latLng = await getLatLng(results[0]);
        console.log("Selected Address:", selectedAddress);
        console.log("LatLng:", latLng);
        // Handle the selected address and LatLng as needed
      }
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Current Location:", currentLocation);
          // Handle the current location as needed
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleInputFocus = () => {
    if (address.trim() === "") {
      // If the input is empty, show the "Current Location" option
      handleSelect("Current Location");
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value) => setAddress(value)}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              label: "Click for Current Location or Search for a place",
              variant: "outlined",
              fullWidth: true,
              onFocus: handleInputFocus,
            })}
          />
          {loading && <div>Loading...</div>}
          {suggestions.length > 0 && (
            <Paper
              style={{
                position: "absolute",
                zIndex: 1000,
                width: "100%",
                marginTop: 5,
              }}
            >
              <List>
                {suggestions.map((suggestion) => (
                  <ListItem
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      button: true,
                    })}
                  >
                    <ListItemIcon>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary={suggestion.description} />
                  </ListItem>
                ))}
                {address.trim() === "" && (
                  <ListItem
                    button
                    onClick={() => handleSelect("Current Location")}
                  >
                    <ListItemIcon>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current Location" />
                  </ListItem>
                )}
              </List>
            </Paper>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default CustomAutocomplete;
