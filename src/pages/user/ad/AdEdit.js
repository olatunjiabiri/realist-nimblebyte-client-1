import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import config from "../../../NewConfig";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import "./index.css";
export default function AdEdit({ action, type }) {
  // context
  const [auth, setAuth] = useAuth();
  const [userId, setUserId] = useState("");
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
    type,
    action,
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

  const handleClick = async () => {
    try {
      // validation
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
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
      setAd({ ...ad, loading: true });

      const { data } = await axios.delete(`/ad/${ad._id}/${userId}`);
      // console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad deleted successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <div className="background-color">
      {/* <form> */}
      <div className="container py-5 ">
        <div className=" row border border-info col-lg-8 offset-lg-2  mt-2 adedit-wrapper">
          <h1 class="text-dark text-center p-3">Update Ad</h1>
          <hr />
          <div className="mb-3 ">
            <div className="">
              <ImageUpload ad={ad} setAd={setAd} />
            </div>
            {loaded ? (
              <div class="mb-3 row">
                <label
                  for="staticEmail"
                  class="col-sm-3 col-form-label adedit-label"
                >
                  Address
                </label>
                <div class="col-sm-9">
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
            <div class="mb-3 row">
              <label for="price" class="col-sm-3 col-form-label adedit-label">
                Price
              </label>
              <div class="col-sm-9">
                <CurrencyInput
                  id="price"
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
              <div class="mb-3 row">
                <label for="price" class="col-sm-3 col-form-label adedit-label">
                  No. of Bedrooms
                </label>
                <div class="col-sm-9">
                  <input
                    type="number"
                    min="0"
                    id="bedrooms"
                    className="form-control mb-3"
                    placeholder="Enter how many bedrooms"
                    value={ad.bedrooms}
                    onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                  />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="price" class="col-sm-3 col-form-label adedit-label">
                  No. of Bathrooms
                </label>
                <div class="col-sm-9">
                  <input
                    type="number"
                    min="0"
                    id="bathrooms"
                    className="form-control mb-3"
                    placeholder="Enter how many bathrooms"
                    value={ad.bathrooms}
                    onChange={(e) =>
                      setAd({ ...ad, bathrooms: e.target.value })
                    }
                  />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="price" class="col-sm-3 col-form-label adedit-label">
                  No. of Carpark
                </label>
                <div class="col-sm-9">
                  <input
                    type="number"
                    min="0"
                    id="carpark"
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

          <div class="mb-3 row">
            <label for="price" class="col-sm-3 col-form-label adedit-label">
              Land Size
            </label>
            <div class="col-sm-9">
              <input
                type="text"
                className="form-control mb-3"
                id="landSize"
                placeholder="Size of land"
                value={ad.landsize}
                onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
              />
            </div>
          </div>

          <div class="mb-3 row">
            <label for="price" class="col-sm-3 col-form-label adedit-label">
              Title
            </label>
            <div class="col-sm-9">
              <input
                type="text"
                className="form-control mb-3"
                id="title"
                placeholder="Enter title"
                value={ad.title}
                onChange={(e) => setAd({ ...ad, title: e.target.value })}
              />
            </div>
          </div>

          <div class="mb-3 row">
            <label for="price" class="col-sm-3 col-form-label adedit-label">
              Description
            </label>
            <div class="col-sm-9">
              <textarea
                className="form-control mb-3"
                id="description"
                placeholder="Enter description"
                value={ad.description}
                onChange={(e) => setAd({ ...ad, description: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <div class=" ">
              <button
                onClick={handleClick}
                className={`btn btn-primary btn-lg mb-3 ${
                  ad.loading ? "disabled" : ""
                }`}
              >
                {ad.loading ? "Saving..." : "Update"}
              </button>
            </div>
            <div class="">
              <button
                onClick={handleDelete}
                className={`btn btn-danger btn-lg mb-3 ${
                  ad.loading ? "disabled" : ""
                }`}
              >
                {ad.loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}
