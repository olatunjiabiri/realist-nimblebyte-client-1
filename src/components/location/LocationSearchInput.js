import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
import { useSearch } from "../../context/search.js";
import { currentLocation } from "../../helpers/currentLocation.js";

const GOOGLE_MAPS_API_KEY = "AIzaSyD3IfqOASixLFAOqv7dDtwllrpHsa11iTs";

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

export default function LocationSearchInput() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const [search, setSearch] = useSearch();

  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3IfqOASixLFAOqv7dDtwllrpHsa11iTs&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
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

    console.log({ value, options, inputValue });
    // if (!!value) {
    //   setSearch({ ...search, address: value?.description });
    //   console.log({ search });
    // }

    return () => {
      active = false;
    };
  }, [value, options, inputValue, fetch]);

  const defaultOption = [{ description: "Current Location" }];

  const searchOptions = [...options, ...defaultOption];

  return (
    <div className="d-flex justify-content-center my-4">
      <Autocomplete
        id="google-map-demo"
        autoHighlight
        sx={{
          // "& .MuiTextField-root": {
          borderWidth: 4,
          borderStyle: "none",
          padding: "2px",
          margin: "16px",
          width: "100%",
          borderRadius: "50px",
          backgroundColor: "#ffffff",
          // },
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
          console.log({ newValue });
          setValue(
            //   newValue?.description === "Current Location"
            //     ? localStorage.getItem("cLocation")
            //     :
            newValue
          );
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Enter an address, city or location"
            placeholder="Enter an address, city or location"
            fullWidth
            variant="filled"
          />
        )}
        //   renderOption={(props, option) => {
        //     const matches =
        //       option?.structured_formatting?.main_text_matched_substrings || [];

        //     const parts = parse(
        //       option?.structured_formatting?.main_text,
        //       matches.map((match) => [match.offset, match.offset + match.length])
        //     );

        //     return (
        //       <li {...props}>
        //         <Grid container alignItems="center">
        //           <Grid item sx={{ display: "flex", width: 44 }}>
        //             <LocationOnIcon sx={{ color: "text.secondary" }} />
        //           </Grid>
        //           <Grid
        //             item
        //             sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
        //           >
        //             {parts.map((part, index) => (
        //               <Box
        //                 key={index}
        //                 component="span"
        //                 sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
        //               >
        //                 {part.text || "Current Location 2"}
        //               </Box>
        //             ))}
        //             <Typography variant="body2" color="text.secondary">
        //               {option?.structured_formatting?.secondary_text}
        //             </Typography>
        //           </Grid>
        //         </Grid>
        //         {value}
        //       </li>
        //     );
        //   }}
      />
    </div>
  );
}
