import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ProfileUpload from "../../components/forms/ProfileUpload";
import config from "../../NewConfig";
import { useAuth } from "../../context/auth";
import { AiFillWarning } from "react-icons/ai";

export default function UpdateProfile() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [reg_number, setReg_number] = useState("");
  const [userType, setUserType] = useState("Buyer");

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isAgent, setIsAgent] = useState(false);

  // hook
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setFirstName(auth.user?.firstName);
      setLastName(auth.user?.lastName);
      setEmail(auth.user?.email);
      setCompany(auth.user?.company);
      setAddress(auth.user?.address);
      setPhone(auth.user?.phone);
      setAbout(auth.user?.about);
      setPhoto(auth.user?.photo);
      setReg_number(auth.user?.reg_number);
    }
  }, []);

  useEffect(() => {
    if (auth?.user?.role && auth.user?.role?.includes("Seller")) {
      setUserType("Seller");
    }
  }, [auth?.user?.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${config.AUTH_API}/user/updateProfile`,
        {
          firstName,
          lastName,
          email,
          company,
          address,
          phone,
          about,
          reg_number,
        }
      );

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        // const data1 = { ...auth.user, role: "Buyer", userId: auth.user.userId };
        const data1 = { ...auth.user, userId: auth.user.userId };

        setAuth({ ...auth, user: data.responsePayload });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data1;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);

        toast.success("Profile updated");
        // reload page on redirect
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background-color">
        <div className="container p-5">
          {/* <Sidebar /> */}
          <div className="container mt-5">
            <div className="row mb-3">
              <div className="border border-info col-lg-8 offset-lg-2  mt-2 adedit-wrapper">
                <h1 class="text-dark text-center p-3">Update Profile</h1>
                <hr />

                {/* account Type Section */}
                <div className="row mb-3">
                  <label
                    id="price"
                    className="col-sm-5 mt-3 col-form-label adedit-label"
                  >
                    Account Type:
                  </label>
                  <div className="col-sm-7">
                    <input
                      id="price"
                      name="price"
                      placeholder="Enter price"
                      value={`${
                        userType === "Buyer"
                          ? "Prospective Client"
                          : "Agent/Seller"
                      }`}
                      className="form-control mt-3 adedit-label"
                      readOnly
                    />
                  </div>
                </div>

                {/* <div className="form-group col-8 pb-1">
                  {(userType === "Seller" || isAgent) && (
                    <ProfileUpload
                      photo={photo}
                      setPhoto={setPhoto}
                      uploading={uploading}
                      setUploading={setUploading}
                    />
                  )}
                </div> */}

                <form onSubmit={handleSubmit}>
                  {userType === "Buyer" && (
                    <>
                      <div className="mb-3 mt-3 row">
                        <label
                          id="isAgent"
                          className="col-sm-6 col-form-label adedit-label"
                        >
                          Do you want to be Agent/Seller ?
                        </label>
                        <div className="col-sm-6 d-flex justify-content-between">
                          <label
                            className={`radio-button ${
                              isAgent === false ? "selected" : ""
                            }`}
                          >
                            <input
                              className="input-style m-3 col-sm-3 col-form-label adedit-label"
                              type="radio"
                              name="isAgent"
                              value={false}
                              checked={isAgent === false}
                              onChange={() => setIsAgent(false)}
                            />
                            <span className="pl-5"> No</span>
                          </label>
                          <label
                            className={`radio-button ${
                              isAgent === true ? "selected" : ""
                            }`}
                          >
                            <input
                              className=" input-style m-3  col-sm-3 col-form-label adedit-label"
                              type="radio"
                              name="isAgent"
                              value={true}
                              checked={isAgent === true}
                              onChange={() => {
                                setIsAgent(true);
                                // setUserType("Seller");
                              }}
                            />
                            Yes
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="form-group col-8 pb-1">
                    {(userType === "Seller" || isAgent) && (
                      <ProfileUpload
                        photo={photo}
                        setPhoto={setPhoto}
                        uploading={uploading}
                        setUploading={setUploading}
                      />
                    )}
                  </div>
                  {userType === "Seller" || isAgent ? (
                    <>
                      <input
                        type="text"
                        placeholder="Company name"
                        className="form-control mb-3"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Registration number"
                        className="form-control mb-3"
                        value={reg_number}
                        onChange={(e) => setReg_number(e.target.value)}
                      />
                    </>
                  ) : (
                    ""
                  )}

                  <input
                    type="text"
                    placeholder="Firstname"
                    className="form-control mt-3 mb-3"
                    value={firstName}
                    onChange={(e) =>
                      // setFirstName(slugify(e.target.value.toLowerCase()))
                      setFirstName(e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="form-control mb-3"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="email"
                    className="form-control mb-3"
                    value={email}
                    readOnly
                  />

                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control mb-3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="form-control mb-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <textarea
                    placeholder="Write something interesting about yourself.."
                    className="form-control mb-3"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    maxLength={200}
                  />
                  {(userType === "Seller" || isAgent) && (
                    <label className="alert alert-warning d-flex align-items-center">
                      <span>
                        <AiFillWarning
                          className="bi flex-shrink-0 me-2"
                          style={{ width: "24", height: "24" }}
                        />
                      </span>{" "}
                      You data will be reviewed by our legal department
                    </label>
                  )}

                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary col-md-6 mt-3 mb-5"
                      disabled={loading}
                      onClick={() => {
                        alert("You Data will go through Verification Process.");
                      }}
                    >
                      {loading ? "Processing" : "Update Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <pre>{JSON.stringify(isAgent, null, 4)} </pre>
      </div>
    </>
  );
}
