import React, { useState, useEffect, useRef } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import config from "../../config.js";
import CurrencyInput from "react-currency-input-field";
// import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";

import { Avatar } from "antd";

import { useAuth } from "../../context/auth";
import { useData } from "../../context/adData";

import LogoutMessage from "../misc/logoutMessage/LogoutMessage";
import { houseType } from "../../helpers/houseType";

import "./index.css";
// import Uploader from "../uploader";
import Modall from "../modal2/Modal";
import DynamicForm from "../uploader";

export default function AdForm({ action, type }) {
  // context
  const [auth, setAuth] = useAuth();
  const [ddata, setDdata] = useData();
  const [isOpen, setIsOpen] = useState(false);
  // state
  const [checked, setChecked] = React.useState(false);

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState([]);
  const [features, setFeatures] = useState([]);
  const [formData, setFormData] = useState([
    { text: "Sitting room", image: null, blob: null },
    { text: "Bedroom", image: null, blob: null },
    { text: "Compound", image: null, blob: null },
  ]);

  const [selectOptions, setSelectOptions] = useState(houseType);

  const fileRefs = useRef([]);
  // hooks
  const navigate = useNavigate();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // console.log("addata>>>>", ddata);
  const [ad, setAd] = useState({
    photos: ddata.photos || [],
    uploading: false,
    propertyTitle: ddata.propertyTitle || "",
    price: ddata.price || "",
    areaPerPrice: ddata.areaPerPrice || "",
    address: ddata.address || "",
    landmark: ddata.landmark || "",
    bedrooms: ddata.bedrooms || "",
    bathrooms: ddata.bathrooms || "",
    carpark: ddata.carpark || "",
    landsize: ddata.landsize || "",
    title: ddata.title || "",
    description: ddata.description || "",
    loading: false,
    type: ddata.type || type,
    action: ddata.action || action,
    postedBy: auth.user.userId,
    features: ddata.features || features,
    houseType: ddata.houseType || "",
  });

  useEffect(() => {
    if (ad) {
      setDdata(ad);
    }
  }, [ad]);

  useEffect(() => {
    if (auth.user) {
      setRole(auth.user?.role);
    }
    if (ddata.features) {
      setFeatures(ddata.features);
    } else {
      if (ad.type) {
        getFeature(ad.type);
      }
    }
  }, []);

  useEffect(() => {
    if (ad.type) {
      getFeature(ad.type);
    }
  }, [ad.type]);

  const handleTermsandPolicyCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    // setHouseType(value);
    setAd({ ...ad, houseType: value });
  };

  // const handleFieldClick = () => {
  //   setSelectOptions(
  //     selectOptions.filter((option) => option !== "Select House Type")
  //   );
  // };

  const handleInputChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeature(typeof value === "string" ? value.split(",") : value);
    setAd({ ...ad, features: value });
  };

  const getFeature = async (type) => {
    setLoading(true);
    setFeatures(ddata.features);
    const { data } = await axios.get(`${config.API}/adFeature/${type}`);
    if (!data) {
      setLoading(false);
    } else {
      setFeatures(data.features);
      setLoading(false);
    }
  };

  const handleClick = async () => {
    // console.log("Ad....", ad);

    try {
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.address) {
        toast.error("Address is required");
        return;
      } else if (!ad.landmark) {
        toast.error("Landmark location is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.propertyTitle) {
        toast.error("Property Title is required");
        return;
      } else if (ad.action === "Sell" && !ad.title) {
        toast.error(" Property document Title is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        //price validation
        setAd({ ...ad, loading: true });
        const { data } = await axios.post("/ad", ad);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          // update user in context
          // setAuth({ ...auth, user: data.user });
          // update user in local storage
          // const fromLS = JSON.parse(localStorage.getItem("auth"));
          // fromLS.user = data.user;
          // localStorage.setItem("auth", JSON.stringify(fromLS));
          // console.log("ads>>", data);

          toast.success("Ad created successfully");

          setDdata({ adData: null });
          localStorage.removeItem("adData");

          setAd({ ...ad, loading: false });

          // const adId = { adID: data.ad._id };
          // navigate("/payment/paystack/paystack", { state: adId });
          // navigate(`/adview/${ad.houseType}`);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleChange = (e) => {
    setAd({ ...ad, areaPerPrice: e.target.value });
  };

  return (
    <div>
      <LogoutMessage>
        <Modall handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <DynamicForm
            formData={formData}
            setFormData={setFormData}
            fileRefs={fileRefs}
            ad={ad}
            setAd={setAd}
            setIsOpen={setIsOpen}
          />
        </Modall>
        <div className="container contain">
          <div className="row">
            <form>
              <div className="col-lg-8 border border-info offset-lg-2 mt-2 adform-wrapper">
                <h1 class="text-dark text-center p-3">
                  Create Ad for {action === "Sell" ? "Sale" : "Rent"}{" "}
                </h1>
                <hr />

                {/* <div className="d-flex justify-content-center property-type-controls"> */}

                <div className=" row d-flex property-type-controls">
                  <label id="formType" className="col-form-label adedit-label">
                    Property Type:
                  </label>
                  <label
                    className={` col radio-button ${
                      ad.type === "House" ? "selected" : ""
                    }`}
                  >
                    <input
                      className="input-style m-2"
                      type="radio"
                      name="formType"
                      value={"House"}
                      checked={ad.type === "House"}
                      onChange={() => {
                        setAd({ ...ad, type: "House" });
                        getFeature("House");
                      }}
                    />
                    House
                  </label>

                  <label
                    className={` col radio-button ${
                      ad.type === "Land" ? "selected" : ""
                    }`}
                  >
                    <input
                      className="input-style m-2"
                      type="radio"
                      name="formType"
                      value={"Land"}
                      checked={ad.type === "Land"}
                      onChange={() => {
                        setAd({ ...ad, type: "Land" });
                        getFeature("Land");
                      }}
                    />
                    Land
                  </label>

                  {/* <label
                    className={` col radio-button ${
                      ad.type === "Shortlet" ? "selected" : ""
                    }`}
                  >
                    <input
                      className="input-style m-2"
                      type="radio"
                      name="formType"
                      value={"Shortlet"}
                      checked={ad.type === "Shortlet"}
                      onChange={() => {
                        setAd({ ...ad, type: "Shortlet" });
                        getFeature("Shortlet");
                      }}
                    />
                    Shortlet
                  </label> */}

                  <label
                    className={` col radio-button ${
                      ad.type === "Commercial" ? "selected" : ""
                    }`}
                  >
                    <input
                      className="input-style m-2"
                      type="radio"
                      name="formType"
                      value={"Commercial"}
                      checked={ad.type === "Commercial"}
                      onChange={() => {
                        setAd({ ...ad, type: "Commercial" });
                        getFeature("Commercial");
                      }}
                    />
                    Commercial
                  </label>

                  <label
                    className={` col radio-button ${
                      ad.type === "Industrial" ? "selected" : ""
                    }`}
                  >
                    <input
                      className="input-style m-2"
                      type="radio"
                      name="formType"
                      value={"Industrial"}
                      checked={ad.type === "Industrial"}
                      onChange={() => {
                        setAd({ ...ad, type: "Industrial" });
                        getFeature("Industrial");
                      }}
                    />
                    Industrial
                  </label>
                </div>

                <div className="mb-3">
                  {/* <div>Open modal</div> */}
                  {/* <ImageUpload ad={ad} setAd={setAd} /> */}
                  <label
                    onClick={() => setIsOpen(true)}
                    className="btn btn-primary"
                  >
                    Upload Photos
                  </label>
                  {ad.photos?.map((file, index) => (
                    <Avatar
                      key={index}
                      src={file?.Location}
                      shape="square"
                      size="46"
                      className="ml-2 m-2"
                    />
                  ))}
                </div>

                <div>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Property Title e.g Luxury 4 Bedroom Duplex"
                    value={ad.propertyTitle}
                    onChange={(e) =>
                      setAd({ ...ad, propertyTitle: e.target.value })
                    }
                  />
                </div>

                {ad.type === "Land" || ad?.type === "Commercial" ? (
                  <div className="d-flex flex-direction-row">
                    <div className="col-sm-8">
                      <CurrencyInput
                        placeholder="Enter price in Naira"
                        defaultValue={ad.price}
                        className="form-control mb-3"
                        onValueChange={(value) =>
                          setAd({ ...ad, price: value })
                        }
                      />
                    </div>
                    <span className="col-sm-1 px-2 text-center">per</span>
                    <div className="col-sm-3">
                      <FormControl sx={{ width: "100%", mb: 2 }}>
                        <Select
                          value={ad.areaPerPrice}
                          onChange={handleChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          SelectDisplayProps={{
                            style: { paddingTop: 8, paddingBottom: 8 },
                          }}
                        >
                          {["sqm", "sqft", "plot"].map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/* <div className="col-sm-1 text-center ">per</div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="sqm/sqft/plot"
                        value={ad.areaPerPrice}
                        onChange={(e) =>
                          setAd({ ...ad, areaPerPrice: e.target.value })
                        }
                      />
                    </div> */}
                  </div>
                ) : (
                  <div>
                    <CurrencyInput
                      placeholder="Enter price in Naira"
                      defaultValue={ad.price}
                      className="form-control mb-3"
                      onValueChange={(value) => setAd({ ...ad, price: value })}
                    />
                  </div>
                )}

                <div className="mb-3 border-0 ">
                  {/* <GooglePlacesAutocomplete
                    apiKey={config.GOOGLE_PLACES_KEY}
                    apiOptions="ng"
                    selectProps={{
                      defaultInputValue: ad?.address,
                      placeholder: "Property address/location..",
                      onChange: ({ value }) => {
                        setAd({ ...ad, address: value.description });
                      },
                    }}
                  /> */}
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Property address/location.."
                    value={ad.address}
                    onChange={(e) => setAd({ ...ad, address: e.target.value })}
                  />
                </div>

                <Tooltip title="This is the Property Address/Location that is visible to the public">
                  <div className="mb-3 border-0 ">
                    <GooglePlacesAutocomplete
                      apiKey={config.GOOGLE_PLACES_KEY}
                      apiOptions="ng"
                      selectProps={{
                        defaultInputValue: ad?.landmark,
                        placeholder: "Landmark address/location",
                        onChange: ({ value }) => {
                          setAd({ ...ad, landmark: value.description });
                        },
                      }}
                    />
                  </div>
                </Tooltip>

                {/* {(ad.type === "House" || ad.type === "Shortlet") && ( */}
                {ad.type === "House" && (
                  <FormControl sx={{ width: "100%", mb: 2 }}>
                    <Select
                      SelectDisplayProps={{
                        style: {
                          paddingTop: 8,
                          paddingBottom: 8,
                          color: "gray",
                        },
                      }}
                      displayEmpty
                      value={ad.houseType}
                      onChange={handleSelectChange}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "1em",
                        appearance: "auto",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select {ad.type} type
                      </MenuItem>
                      {selectOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {type === "House" && ad.type === "House" ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      className="form-control mb-3"
                      placeholder="Enter number of bedrooms"
                      value={ad.bedrooms}
                      onChange={(e) =>
                        setAd({ ...ad, bedrooms: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      className="form-control mb-3"
                      placeholder="Enter number of bathrooms/toilets "
                      value={ad.bathrooms}
                      onChange={(e) =>
                        setAd({ ...ad, bathrooms: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      className="form-control mb-3"
                      placeholder="Enter number of carparks"
                      value={ad.carpark}
                      onChange={(e) =>
                        setAd({ ...ad, carpark: e.target.value })
                      }
                    />
                  </>
                ) : (
                  ""
                )}

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Size of property in sqm or sqft"
                  value={ad.landsize}
                  onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
                />
                {ad.action === "Sell" && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter property document title e.g. C of O, Survey Plan"
                    value={ad.title}
                    onChange={(e) => setAd({ ...ad, title: e.target.value })}
                  />
                )}

                {features?.length > 0 ? (
                  <>
                    {" "}
                    <FormControl sx={{ width: "100%", mb: 2 }}>
                      <Select
                        SelectDisplayProps={{
                          style: {
                            paddingTop: 8,
                            paddingBottom: 8,
                            color: "gray",
                          },
                        }}
                        id="demo-multiple-checkbox"
                        displayEmpty
                        multiple
                        value={feature}
                        onChange={handleInputChange}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <span form-control mb-3>
                                Select extra features
                              </span>
                            );
                          }

                          return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {features.map((feat) => (
                          <MenuItem key={feat.feature} value={feat.feature}>
                            <Checkbox
                              checked={
                                ddata.features
                                  ? ddata.features.indexOf(feat.feature) > -1
                                  : feature.indexOf(feat.feature) > -1
                              }
                            />
                            <ListItemText primary={feat.feature} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <></>
                )}
                <textarea
                  className="form-control mb-3"
                  placeholder="Enter description"
                  value={ad.description}
                  onChange={(e) =>
                    setAd({ ...ad, description: e.target.value })
                  }
                />
                <div className="mb-3 text-center">
                  <Checkbox
                    checked={checked}
                    onChange={handleTermsandPolicyCheck}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  By submitting this form I agree to the{" "}
                  <Link className="text-primary" to="/seller-terms">
                    Terms of Use
                  </Link>{" "}
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    disabled={!checked || loading}
                    onClick={handleClick}
                    type="button"
                    className={`btn btn-primary col-4 m-3  ${
                      ad.loading ? "disabled" : ""
                    }`}
                  >
                    {ad.loading ? "Saving..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </LogoutMessage>
      {/* <pre>{JSON.stringify(ad.houseType, null, 4)}</pre> */}
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </div>
  );
}
