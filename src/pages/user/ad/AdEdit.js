import React, { useState, useEffect } from "react";
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

import config from "../../../NewConfig";
import ImageUpload from "../../../components/forms/ImageUpload";
import { useAuth } from "../../../context/auth";
import "./index.css";

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
  // state
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    sold: false,
    type,
    action,
    features,
  });
  const [loaded, setLoaded] = useState(false);

  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  useEffect(() => {
    setUserId(auth.user?.userId);
  }, []);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      //   console.log("single ad edit page => ", data);
      setAd(data?.ad);
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
      setFeatures(data.features);
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
      } else if (!ad.price) {
        toast.error("Price is required");
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
      } else if (!ad.landsize) {
        toast.error("landsize is required");
        return;
      } else if (!ad.title) {
        toast.error("Title is required");
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

  return (
    <div className="background-color">
      <div className="container py-5 ">
        <div className=" row border border-info col-lg-8 offset-lg-2  mt-2 adedit-wrapper">
          <h1 className="text-dark text-center p-3">Update Ad</h1>
          <hr />
          <div className="mb-3 ">
            <div className="">
              <ImageUpload ad={ad} setAd={setAd} />
            </div>
            {loaded ? (
              <div className="mb-3 row">
                <label
                  id="address"
                  className="col-sm-3 col-form-label adedit-label"
                >
                  Address
                </label>
                <div className="col-sm-9">
                  <GooglePlacesAutocomplete
                    apiKey={config.GOOGLE_PLACES_KEY}
                    apiOptions="ng"
                    selectProps={{
                      defaultInputValue: ad?.address,
                      placeholder: "Search for address..",
                      onChange: ({ value }) => {
                        setAd({ ...ad, address: value.description });
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {loaded ? (
            <div className="mb-3 row">
              <label
                id="price"
                className="col-sm-3 col-form-label adedit-label"
              >
                Price
              </label>
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
            </div>
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
                    placeholder="Enter how many bedrooms"
                    value={ad.bedrooms}
                    onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
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
                    placeholder="Enter how many bathrooms"
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
                    placeholder="Enter how many carpark"
                    value={ad.carpark}
                    onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
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
                placeholder="Size of land"
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
            <div className="col-sm-6 d-flex justify-content-between">
              <label
                className={`radio-button ${
                  ad.sold === false ? "selected" : ""
                }`}
              >
                <input
                  className="input-style m-3 col-sm-3 col-form-label adedit-label"
                  type="radio"
                  name="adStatus"
                  value={false}
                  checked={ad.sold === false}
                  onChange={() => setAd({ ...ad, sold: false })}
                />
                <span className="pl-5"> Available</span>
              </label>
              <label
                className={`radio-button ${ad.sold === true ? "selected" : ""}`}
              >
                <input
                  className=" input-style m-3  col-sm-3 col-form-label adedit-label"
                  type="radio"
                  name="adStatus"
                  value={true}
                  checked={ad.sold === true}
                  onChange={() => setAd({ ...ad, sold: true })}
                />
                Sold
              </label>
            </div>
          </div>

          <div className="mb-3 row">
            <label idr="title" className="col-sm-3 col-form-label adedit-label">
              Extra Features
            </label>

            <div className="col-sm-9">
              {features?.length > 0 ? (
                <>
                  {" "}
                  <FormControl sx={{ width: "100%", mb: 2 }}>
                    <Select
                      id="demo-multiple-checkbox"
                      displayEmpty
                      multiple
                      value={ad.features}
                      onChange={handleInputChange}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
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
                        <MenuItem key={feat.feature} value={feat.feature}>
                          <Checkbox
                            checked={ad.features.indexOf(feat.feature) > -1}
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
            </div>
          </div>

          <div className="mb-3 row">
            <label idr="title" className="col-sm-3 col-form-label adedit-label">
              Title
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control mb-3"
                id="title"
                name="title"
                placeholder="Enter title"
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
                onChange={(e) => setAd({ ...ad, description: e.target.value })}
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
      </div>
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre>
      <pre>{JSON.stringify(features, null, 4)}</pre> */}
    </div>
  );
}
