import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import config from "../../NewConfig";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../context/auth";
import "./index.css";

export default function AdForm({ action, type }) {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

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
  });
  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setRole(auth.user?.role);
    }
  }, []);

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
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("/ad", ad);
      console.log("ad create response => ", data);
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

        // reload page on redirect
        window.location.href = "/dashboard";
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
          <div className="col-lg-8 border border-info offset-lg-2 mt-2 adform-wrapper">
            <h1 class="text-dark text-center p-3">Create Ad</h1>
            <hr />
            <div className="my-3">
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

            {/* <div style={{ marginTop: "80px" }}> */}
            <div>
              <CurrencyInput
                placeholder="Enter price"
                defaultValue={ad.price}
                className="form-control mb-3"
                onValueChange={(value) => setAd({ ...ad, price: value })}
              />
            </div>

            {type === "House" ? (
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
                  placeholder="Enter how many carpark"
                  value={ad.carpark}
                  onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                />
              </>
            ) : (
              ""
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

            <textarea
              className="form-control mb-3"
              placeholder="Enter description"
              value={ad.description}
              onChange={(e) => setAd({ ...ad, description: e.target.value })}
            />

            <div className="d-flex justify-content-center">
              <button
                onClick={handleClick}
                className={`btn btn-primary col-4 m-3  ${
                  ad.loading ? "disabled" : ""
                }`}
              >
                {ad.loading ? "Saving..." : "Submit"}
              </button>
            </div>

            {/* <pre>{JSON.stringify(ad, null, 4)}</pre>
      <pre>{JSON.stringify(auth, null, 4)} </pre> */}
          </div>
        </div>
      </div>
    </div>
  );
}
