import React, { useState, useEffect, useRef } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { Avatar } from "antd";
import { houseType } from "../../../helpers/houseType";

import config from "../../../config.js";
import ImageUpload from "../../../components/forms/ImageUpload";
import { useAuth } from "../../../context/auth";
import "./index.css";
import DynamicForm from "../../../components/uploader";
import Modall from "../../../components/modal2/Modal";
import LogoutMessage from "../../../components/misc/logoutMessage/LogoutMessage";
import { Tooltip } from "@mui/material";

export default function AdEdit({ action, type }) {
  // context
  const [auth, setAuth] = useAuth();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [selectedFormType, setSelectedFormType] = useState("House");
  const [feature, setFeature] = useState([]);
  const [features, setFeatures] = useState([]);

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
  const [selectOptions, setSelectOptions] = useState(houseType);

  // state
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: false,
    propertyTitle: "",
    price: "",
    address: "",
    landmark: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    sold: "Available",
    type,
    action,
    features,
    houseType: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState([
    // { text: "Sitting room", image: null, blob: null },
    // { text: "Bedroom", image: null, blob: null },
    // { text: "Compound", image: null, blob: null },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const fileRefs = useRef([]);

  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      fetchAd();
    }
  }, [params?.id]);

  useEffect(() => {
    setUserId(auth.user?.userId);
  }, []);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.id}`);
      //   console.log("single ad edit page => ", data);
      setAd(data?.ad);
      setFormData(
        data?.ad.photos.map((item) => {
          return {
            text: item.Key,
            image: item.Location,
            blob: null,
          };
        })
      );
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (ad.type) {
      getFeature(ad.type);
    }
  }, [ad.type]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setAd({ ...ad, houseType: value });
  };

  const handleInputChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeature(typeof value === "string" ? value.split(",") : value);
    setAd({ ...ad, features: value });
  };

  const getFeature = async (type) => {
    setLoading(true);
    setFeatures([]);
    const { data } = await axios.get(`${config.API}/adFeature/${type}`);
    // console.log("data>>", data);
    if (!data) {
      setLoading(false);
    } else {
      setFeatures(data?.features ? data?.features : []);
      setLoading(false);
    }
  };

  const handleClick = async () => {
    // console.log("ad>>>>>", ad);
    try {
      // validation
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.address) {
        toast.error("Address is required");
        return;
      } else if (!ad.landmark) {
        toast.error("landmark Address/location is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.propertyTitle) {
        toast.error("Property title is required e.g 4 Bedroom Duplex");
        return;
      } else if (ad.type === "House" && (!ad.bedrooms || ad.bedrooms < 1)) {
        toast.error("No. of Bedrooms is required");
        return;
      } else if (ad.type === "House" && (!ad.bathrooms || ad.bathrooms < 1)) {
        toast.error("No. of Bathrooms is required");
        return;
      } else if (ad.type === "House" && !ad.carpark) {
        toast.error("No. of Carpark is required");
        return;
      } else if (ad.action === "Sell" && !ad.landsize) {
        toast.error("property landsize is required");
        return;
      } else if (ad.action === "Sell" && !ad.title) {
        toast.error("document Title is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        // make API put request
        setAd({ ...ad, loading: true });

        const { data } = await axios.put(`/ad/${ad._id}/${userId}`, ad);
        // console.log("ad create response => ", data);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          toast.success("Ad updated successfully");
          setAd({ ...ad, loading: false });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setDelLoading(true);

      const { data } = await axios.delete(`/ad/${ad._id}/${userId}`);
      // console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setDelLoading(false);
      } else {
        toast.success("Ad deleted successfully");
        setDelLoading(false);

        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setDelLoading(false);
    }
  };

  const handleChange = (e) => {
    setAd({ ...ad, areaPerPrice: e.target.value });
  };

  return (
    <div className="background-color">
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
      <div className="container py-5 ">
        <LogoutMessage>
          <div className=" row border border-info col-lg-8 offset-lg-2  mt-2 adedit-wrapper">
            <h1 className="text-dark text-center p-3">Update Ad</h1>
            <hr />
            <div className="mb-2">
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
            {loaded ? (
              <div className="row">
                <label
                  id="price"
                  className="col-sm-3 col-form-label adedit-label"
                >
                  Price
                </label>

                {ad?.type === "Land" || ad?.type === "Commercial" ? (
                  <div className="d-flex flex-direction-row col-sm-9">
                    <div className="col-sm-8">
                      <CurrencyInput
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        defaultValue={ad.price}
                        className="form-control mb-3"
                        onValueChange={(value) =>
                          setAd({ ...ad, price: value })
                        }
                      />
                    </div>
                    {/* <div className="col-sm-1 text-center ">per</div>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control mmb-3"
                          id="areaPerPrice"
                          name="areaPerPrice"
                          placeholder="sqm/sqft/plot"
                          value={ad.areaPerPrice}
                          onChange={(e) =>
                            setAd({ ...ad, areaPerPrice: e.target.value })
                          }
                        />
                      </div> */}
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
                  </div>
                ) : (
                  <div className="col-sm-9">
                    <CurrencyInput
                      id="price"
                      name="price"
                      placeholder="Enter price"
                      defaultValue={ad.price}
                      className="form-control mb-3"
                      onValueChange={(value) => setAd({ ...ad, price: value })}
                    />
                  </div>
                )}
              </div>
            ) : (
              ""
            )}

            <div className="row mb-3">
              <label
                id="propertyType"
                className="col-sm-3 col-form-label adedit-label"
              >
                Property Type:
              </label>
              <div className="col-sm-9">
                <input
                  id="propertyType"
                  name="propertyType"
                  value={ad.type}
                  className="form-control mb-3"
                  // className="form-control pl-3 mt-3 adedit-label"
                  readOnly
                />
              </div>
            </div>
            {/* {(ad.type === "House" || ad.type === "Shortlet") && ( */}
            {ad.type === "House" && (
              <div className="mb-3 row">
                <label
                  idr="title"
                  className="col-sm-3 col-form-label adedit-label"
                >
                  Select {ad.type} Type
                </label>

                <div className="col-sm-9">
                  <FormControl sx={{ width: "100%", mb: 2 }}>
                    <Select
                      SelectDisplayProps={{
                        style: { paddingTop: 8, paddingBottom: 8 },
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
                        Select {ad.type} Type
                      </MenuItem>
                      {selectOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            )}

            {loaded ? (
              <>
                <div className="mb-3 row">
                  <label
                    idr="propertyTitle"
                    className="col-sm-3 col-form-label adedit-label"
                  >
                    Property Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="propertyTitle"
                      name="propertyTitle"
                      placeholder="Property title like 4 Bedroom Duplex"
                      value={ad.propertyTitle}
                      onChange={(e) =>
                        setAd({ ...ad, propertyTitle: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    id="address"
                    className="col-sm-3 col-form-label adedit-label"
                  >
                    Address
                  </label>
                  <div className="col-sm-9">
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
                      id="address"
                      name="address"
                      placeholder="Property address/location.."
                      value={ad.address}
                      onChange={(e) =>
                        setAd({ ...ad, address: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Tooltip title="This is the Property Address/Location that is visible to the public">
                  <div className="mb-3 row">
                    <label
                      id="address"
                      className="col-sm-3 col-form-label adedit-label"
                    >
                      Landmark Location
                    </label>
                    <div className="col-sm-9">
                      <GooglePlacesAutocomplete
                        apiKey={config.GOOGLE_PLACES_KEY}
                        apiOptions="ng"
                        selectProps={{
                          defaultInputValue: ad?.landmark,
                          placeholder: "Landmark address/location..",
                          onChange: ({ value }) => {
                            setAd({ ...ad, landmark: value.description });
                          },
                        }}
                      />
                    </div>
                  </div>
                </Tooltip>
              </>
            ) : (
              ""
            )}

            {ad.type === "House" ? (
              <>
                <div className="mb-3 row">
                  <label
                    id="bedrooms"
                    className="col-sm-3 col-form-label adedit-label"
                  >
                    No. of Bedrooms
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      min="0"
                      id="bedrooms"
                      name="bedrooms"
                      className="form-control mb-3"
                      placeholder="Enter number of bedrooms"
                      value={ad.bedrooms}
                      onChange={(e) =>
                        setAd({ ...ad, bedrooms: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    id="bathrooms"
                    className="col-sm-3 col-form-label adedit-label"
                  >
                    No. of Bathrooms
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      min="0"
                      id="bathrooms"
                      name="bathrooms"
                      className="form-control mb-3"
                      placeholder="Enter number of bathrooms/toilets"
                      value={ad.bathrooms}
                      onChange={(e) =>
                        setAd({ ...ad, bathrooms: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    id="carpark"
                    className="col-sm-3 col-form-label adedit-label"
                  >
                    No. of Carpark
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      min="0"
                      id="carpark"
                      name="carpark"
                      className="form-control mb-3"
                      placeholder="Enter number of carpark"
                      value={ad.carpark}
                      onChange={(e) =>
                        setAd({ ...ad, carpark: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="mb-3 row">
              <label
                id="landsize"
                className="col-sm-3 col-form-label adedit-label"
              >
                Land Size
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control mb-3"
                  id="landSize"
                  name="landSize"
                  placeholder="Size of the property in sqm or sqft"
                  value={ad.landsize}
                  onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label
                id="adStatus"
                className="col-sm-3 col-form-label adedit-label"
              >
                Status
              </label>
              <div className="col-sm-9 d-flex justify-content-between">
                {/* <div className="col-sm-9 d-flex"> */}
                <label
                  className={`radio-button ${
                    ad.sold === "Available" ? "selected" : ""
                  }`}
                >
                  <input
                    className="input-style m-3 col col-form-label adedit-label"
                    // defaultValue={"Available"}
                    defaultChecked={ad.sold === "Available"}
                    type="radio"
                    name="adStatus"
                    value={"Available"}
                    checked={ad.sold === "Available"}
                    onChange={() => setAd({ ...ad, sold: "Available" })}
                  />
                  <span className="pl-3"> Available</span>
                </label>
                <label
                  className={`radio-button ${
                    ad.sold === "Sold" ? "selected" : ""
                  }`}
                >
                  <input
                    className="input-style m-2  col col-form-label adedit-label"
                    type="radio"
                    name="adStatus"
                    value={"Sold"}
                    checked={ad.sold === "Sold"}
                    onChange={() => setAd({ ...ad, sold: "Sold" })}
                  />
                  <span className="pl-3">
                    {" "}
                    {ad?.action === "Rent" ? "Rented" : "Sold"}
                  </span>
                </label>
                <label
                  className={`radio-button ${
                    ad.sold === "Under Contract" ? "selected" : ""
                  }`}
                >
                  <input
                    className="input-style m-2 col col-form-label adedit-label"
                    type="radio"
                    name="adStatus"
                    value={"Under Contract"}
                    checked={ad.sold === "Under Contract"}
                    onChange={() => setAd({ ...ad, sold: "Under Contract" })}
                  />
                  Under Contract
                  {/* <span className="pl-3"> Under Contract</span> */}
                </label>
              </div>
            </div>

            {features?.length > 0 && (
              <div className="mb-3 row">
                <label
                  idr="title"
                  className="col-sm-3 col-form-label adedit-label"
                >
                  Extra Features
                </label>

                <div className="col-sm-9">
                  <>
                    {" "}
                    <FormControl sx={{ width: "100%", mb: 2 }}>
                      <Select
                        id="demo-multiple-checkbox"
                        displayEmpty
                        multiple
                        value={ad?.features}
                        onChange={handleInputChange}
                        renderValue={(selected) => {
                          if (
                            (!!selected && selected.length === 0) ||
                            selected === null ||
                            selected === undefined
                          ) {
                            return (
                              <span form-control mb-3>
                                Extra Features
                              </span>
                            );
                          }

                          return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {features.map((feat) => (
                          <MenuItem key={feat?.feature} value={feat?.feature}>
                            <Checkbox
                              checked={
                                ad?.features
                                  ? ad?.features?.indexOf(feat?.feature) > -1
                                  : false
                              }
                            />
                            <ListItemText primary={feat?.feature} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                </div>
              </div>
            )}

            <div className="mb-3 row">
              <label
                idr="title"
                className="col-sm-3 col-form-label adedit-label"
              >
                Document Title
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control mb-3"
                  id="title"
                  name="title"
                  placeholder="Property document title e.g C of O, Survey Plan"
                  value={ad.title}
                  onChange={(e) => setAd({ ...ad, title: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label
                id="description"
                className="col-sm-3 col-form-label adedit-label"
              >
                Description
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control mb-3"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={ad.description}
                  onChange={(e) =>
                    setAd({ ...ad, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="d-flex justify-content-around">
              <div className=" ">
                <button
                  onClick={handleClick}
                  className={`btn btn-primary btn-lg mb-3 ${
                    ad.loading ? "disabled" : ""
                  }`}
                >
                  {ad.loading ? "Saving..." : "Update"}
                </button>
              </div>
              <div className="">
                <button
                  onClick={handleDelete}
                  className={`btn btn-danger btn-lg mb-3 ${
                    delLoading ? "disabled" : ""
                  }`}
                >
                  {delLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </LogoutMessage>
      </div>

      {/* <pre>{JSON.stringify(ad, null, 4)}</pre>
      <pre>{JSON.stringify(ad.sold, null, 4)}</pre> */}
    </div>
  );
}
