import { setKey, geocode, RequestType } from "react-geocode";
import config from "../config.js";

export const currentLocation = () => {
  setKey(config.GOOGLE_MAPS_KEY);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

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

        localStorage.setItem("cLocation", neighborhood);
      })
      .catch(console.error);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };
  return neighborhood;
};
