import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import config from "../../NewConfig";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useAuth } from "../../context/auth";
import { useFormik } from "formik";
import { adformSchema } from "../../../src/validations";
import "./index.css";

export default function AdForm({ action, type }) {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

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

  const [ad, setAd] = useState({
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
    type,
    action,
    postedBy: auth.user.userId,
    feature:[]
  });
  
  // hooks
  const navigate = useNavigate();
  const [selectedFormType, setSelectedFormType] = useState("House");
  const [feature, setFeature] = useState([]);
  const [features, setFeatures] = useState([]);

  
  const handleInputChange = (event) => {
    const {
      target: { value },
    } = event;
      setFeature(
        typeof value === 'string' ? value.split(',') : value,
      );
  };

  useEffect(() => {
    if (auth.user) {
      setRole(auth.user?.role);
    }
    if(type){
      getFeature(type);
    }
  }, []);
 
  const getFeature = async (type) =>{
    setLoading(true);
    setFeatures([]);
    //setState({features: []});
    const { data } = await axios.get(
      `${config.API}/adFeature/${type}`,
    );
    if(!data){
      setLoading(false);
    } else{
      setFeatures(data.features)
      setLoading(false);
    }
  }
  
  const sellerRole = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${config.AUTH_API}/api/Roles/AddRole`,
        {
          userId: auth.user.userId,
          role: "Seller",
        }
      );
      // console.log("role response data >>>>", data);
      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        auth.user.role.push("Seller");

        setAuth({ ...auth });
        console.log("auth", auth);

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        // fromLS.user.role = { role: "Seller" };

        fromLS.user.role.push("Seller");

        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);
        toast.success("Role Added");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "Something went wrong. Role cannot be assigned now. Try again."
      );
      setLoading(false);
    }
  };

  const handleClick = async () => {
    try {

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

        if (!auth.user.role?.includes("Seller")) {
          sellerRole();
        }

        toast.success("Ad created successfully");

        setAd({ ...ad, loading: false });

        const adId = { adID: data.ad._id };
        navigate("/payment/paystack/paystack", { state: adId });
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <form>
            <div className="col-lg-8 border border-info offset-lg-2 mt-2 adform-wrapper">
              <h1 class="text-dark text-center p-3">
                {" "}
                Create Ad for {ad?.action === "Sell" ? "Sale" : "Rent"}{" "}
              </h1>
              <hr />

              <div className="container-div d-flex justify-content-center">
                <label
                  className={`radio-button ${
                    selectedFormType === "House" ? "selected" : ""
                  }`}
                >
                  <input
                    className="input-style m-2"
                    type="radio"
                    name="formType"
                    value="House"
                    checked={selectedFormType === "House"}
                    onChange={() => {setSelectedFormType("House"); getFeature("House")}}
                  />
                  House
                </label>
                <label
                  className={`radio-button ${
                    selectedFormType === "Land" ? "selected" : ""
                  }`}
                >
                  <input
                    className="input-style m-2"
                    type="radio"
                    name="formType"
                    value="Land"
                    checked={selectedFormType === "Land"}
                    onChange={() => {setSelectedFormType("Land"); getFeature("Land")}}
                  />
                  Land
                </label>
              </div>

              <div className="mb-3">
                <ImageUpload ad={ad} setAd={setAd} />
              </div>

              <div className="mb-3 border-0 ">
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
              <div>
                <CurrencyInput
                  placeholder="Enter price"
                  defaultValue={ad.price}
                  className="form-control mb-3"
                  onValueChange={(value) => setAd({ ...ad, price: value })}
                />
              </div>

              {type === "House" && selectedFormType === "House" ? (
                <>
                  <input
                      type="number"
                      min="0"
                      className="form-control mb-3"
                      placeholder="Enter how many bedrooms"
                      value={ad.bedrooms}
                      onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                  />
                  <input
                      type="number"
                      min="0"
                      className="form-control mb-3"
                      placeholder="Enter how many bathrooms"
                      value={ad.bathrooms}
                      onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                  />
                  <input
                      type="number"
                      min="0"
                      className="form-control mb-3"
                      placeholder="Enter how many carparks"
                      value={ad.carpark}
                      onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                  />
                </>
              ) : (
                ""
                //  {type === "Land" && selectedFormType === "Land" ?
              )}

              <input
                 type="text"
                 className="form-control mb-3"
                 placeholder="Size of land"
                 value={ad.landsize}
                 onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
              />
              <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter title"
                  value={ad.title}
                  onChange={(e) => setAd({ ...ad, title: e.target.value })}
              />
            {features?.length > 0 ? <> < FormControl sx={{width: '100%', mb:2 }}>
                {/* <InputLabel id="demo-multiple-checkbox-label"></InputLabel> */}
                <Select
                  labelId="demo-multiple-checkbox-label"
                  placeholder="Enter feature"
                  id="demo-multiple-checkbox"
                  multiple
                  value={feature}
                  onChange={handleInputChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                   {/* <MenuItem disabled value="">
                      <em>Placeholder</em>
                  </MenuItem> */}
                  {features.map((feat) => (
                    <MenuItem key={feat.feature} value={feat.feature}>
                      <Checkbox checked={feature.indexOf(feat.feature) > -1} />
                      <ListItemText primary={feat.feature} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl></> :<></>}
              <textarea
                 className="form-control mb-3"
                 placeholder="Enter description"
                 value={ad.description}
                 onChange={(e) => setAd({ ...ad, description: e.target.value })}
              />
              <div className="d-flex justify-content-center">
                <button
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
         {/* <pre>{JSON.stringify(features, null, 4)}</pre> */}
    </div>
  );
}
