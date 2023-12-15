import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

import ProfileUpload from "../ProfileUpload";
import config from "../../../NewConfig";
import { useAuth } from "../../../context/auth";
import { AiFillWarning } from "react-icons/ai";
import LogoutMessage from "../../misc/logoutMessage/LogoutMessage";
import DocumentForm from "../../documentUploader";
import Modall from "../../modal2/Modal";
import { useNavigate } from "react-router-dom";

export default function ProfileForm({ sourceURL }) {
  // console.log("sourceURL", sourceURL);
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [userType, setUserType] = useState("Buyer");

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [roles, setRoles] = useState([]);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    address: "",
    phone: "",
    aboutMe: "",
    reg_number: "",
  });

  // hook
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setPhoto(auth.user?.photo || "");
      setRoles(auth?.user?.role);
    }
  }, []);

  // Function to update form field and save to localStorage
  const updateFormField = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value };
    setProfileData((prev) => ({ ...prev, ...updatedFormData }));
    setFormData(updatedFormData);
    localStorage.setItem("profileFormData", JSON.stringify(updatedFormData));
  };

  // Initialize form state from localStorage
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("profileFormData"));
    if (storedFormData || auth?.user) {
      setProfileData((prev) => ({
        ...prev,
        firstName: storedFormData?.firstName || auth?.user?.firstName || "",
      }));
      setProfileData((prev) => ({
        ...prev,
        lastName: storedFormData?.lastName || auth?.user?.lastName || "",
      }));
      setProfileData((prev) => ({
        ...prev,
        email: storedFormData?.email || auth?.user?.email || "",
      }));
      setProfileData((prev) => ({
        ...prev,
        company: storedFormData?.company || auth?.user?.company || "",
      }));
      setProfileData((prev) => ({
        ...prev,
        address: storedFormData?.address || auth?.user?.address || "",
      }));
      setProfileData((prev) => ({
        ...prev,
        phone: storedFormData?.phone || auth?.user?.phone || "",
      }));
      setProfileData((prev) => ({
        ...prev,
        aboutMe: storedFormData?.aboutMe || auth?.user?.description || "",
      }));
      setProfileData((prev) => ({
        ...prev,
        reg_number:
          storedFormData?.reg_number || auth?.user?.info?.regNumber || "",
      }));
    }
  }, []);

  useEffect(() => {
    if (auth?.user?.role && auth.user?.role?.includes("Agent")) {
      setUserType("Agent");
    }
  }, [auth?.user?.role]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        (userType === "Agent" || isAgent || sourceURL) &&
        !profileData?.company
      ) {
        toast.error("Company name is required");
        return;
      } else if (
        (userType === "Agent" || isAgent || sourceURL) &&
        !profileData.reg_number
      ) {
        toast.error("Registration No. is required");
        return;
      } else if (!profileData.firstName) {
        toast.error("FirstName is required");
        return;
      } else if (!profileData.lastName) {
        toast.error("Lastname is required");
        return;
      } else if (!profileData.address) {
        toast.error("Address is required");
        return;
      } else if (!profileData.phone) {
        toast.error("Phone No. is required");
        return;
      } else if (
        (userType === "Agent" || isAgent || sourceURL) &&
        !profileData.aboutMe
      ) {
        toast.error("Brief Profile is required");
        return;
      } else {
        if (userType === "Agent" || isAgent || sourceURL) {
          if (!auth.user?.role?.includes("Agent")) {
            roles.push("Agent");
          }
        }
        setLoading(true);
        // console.log("Roles", roles);

        if (userType === "Agent" || isAgent || sourceURL) {
          localStorage.setItem(
            "profile",
            JSON.stringify({
              userId: auth?.user?.userId,
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              email: profileData.email,
              company: profileData.company,
              address: profileData.address,
              phone: profileData.phone,
              description: profileData.aboutMe,
              registrationNumber: profileData.reg_number || "",
              roles: roles,
              photo,
            }),
          );

          navigate("/user/document-manager");
          return;
        }
        const { data } = await axios.post(
          `${config.AUTH_API}/user/updateProfile`,
          {
            userId: auth?.user?.userId,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            company: profileData.company,
            address: profileData.address,
            phone: profileData.phone,
            description: profileData.aboutMe,
            registrationNumber: profileData.reg_number || "",
            roles: roles,
            photo,
            agentDocuments: [],
          },
        );

        if (!data.success) {
          toast.error(data.message);
          setLoading(false);
        } else {
          const data1 = { ...auth.user, userId: auth.user.userId };

          setAuth({ ...auth, user: data.responsePayload });

          let fromLS = JSON.parse(localStorage.getItem("auth"));
          fromLS.user = data1;
          localStorage.setItem("auth", JSON.stringify(fromLS));
          setLoading(false);

          // console.log("data storage", localStorage.getItem("auth"));

          toast.success("Profile updated");
          // reload page on redirect
          window.location.href = "/";
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState([
    { text: "Passport photo ID", image: null, blob: null },
    { text: "Proof of identification", image: null, blob: null },
    { text: "CAC certification", image: null, blob: null },
  ]);

  return (
    <>
      <LogoutMessage>
        <div className="background-color content-container">
          <div className="container p-5">
            {/* <Sidebar /> */}
            <div className="container mt-5">
              <div className="row mb-3">
                <div className="border border-info col-lg-8 offset-lg-2  mt-2 adedit-wrapper">
                  <h1 className="text-dark text-center p-3">
                    {`${sourceURL ? "Agent Request Form" : "Update Profile"}`}
                  </h1>
                  <hr />

                  {/* account Type Section */}
                  <div className="row mb-3">
                    <label
                      id="userType"
                      className="col-sm-5 mt-3 col-form-label adedit-label"
                    >
                      Account Type:
                    </label>
                    <div className="col-sm-7">
                      <input
                        id="userType"
                        name="userType"
                        // placeholder="Enter price"
                        value={`${userType === "Buyer" ? "User" : "Agent"}`}
                        className="form-control pl-3 mt-3 adedit-label"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* <div className="form-group col-8 pb-1">
                  {(userType === "Agent" || isAgent) && (
                    <ProfileUpload
                      photo={photo}
                      setPhoto={setPhoto}
                      uploading={uploading}
                      setUploading={setUploading}
                    />
                  )}
                </div> */}

                  <form onSubmit={handleSubmit}>
                    {!sourceURL && userType === "Buyer" && (
                      <>
                        <div className="mb-3 mt-3 row">
                          <label
                            id="isAgent"
                            className="col-sm-6 col-form-label adedit-label"
                          >
                            Do you want to be an Agent ?
                          </label>
                          <div className="col-sm-4 d-flex justify-content-between">
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
                                  // setUserType("Agent");
                                }}
                              />
                              Yes
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                    {/* <div className="form-group col-8 pb-1"> */}
                    {/*   {(userType === "Agent" || isAgent || sourceURL) && ( */}
                    {/*     <ProfileUpload */}
                    {/*       photo={photo} */}
                    {/*       setPhoto={setPhoto} */}
                    {/*       uploading={uploading} */}
                    {/*       setUploading={setUploading} */}
                    {/*       label={auth?.user?.userId} */}
                    {/*     /> */}
                    {/*   )} */}
                    {/* </div> */}
                    {/* <div className="form-group col-8 pb-1"> */}
                    {/*   {(userType === "Agent" || isAgent || sourceURL) && ( */}
                    {/*     <label */}
                    {/*       onClick={() => setIsOpen(true)} */}
                    {/*       className="btn btn-primary" */}
                    {/*     > */}
                    {/*       Upload Documents */}
                    {/*     </label> */}
                    {/*   )} */}
                    {/*   {uploadedFiles.length > 0 && ( */}
                    {/*     <> */}
                    {/*       <div>Uploaded documents</div> */}
                    {/*       {uploadedFiles.map((file) => ( */}
                    {/*         <p className="text-success"> */}
                    {/*           {/* Uploaded Documents: {uploadedFiles.join(", ")} */}
                    {/*           {file} */}
                    {/*         </p> */}
                    {/*       ))} */}
                    {/*     </> */}
                    {/*   )} */}
                    {/* </div> */}
                    {userType === "Agent" || isAgent || sourceURL ? (
                      <>
                        <input
                          type="text"
                          placeholder="Company name"
                          className="form-control mb-3"
                          value={profileData.company}
                          onChange={(e) =>
                            updateFormField("company", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          placeholder="Registration number"
                          className="form-control mb-3"
                          value={profileData.reg_number}
                          onChange={(e) =>
                            updateFormField("reg_number", e.target.value)
                          }
                        />
                      </>
                    ) : (
                      ""
                    )}
                    <input
                      type="text"
                      placeholder="Firstname"
                      className="form-control mt-3 mb-3"
                      value={profileData.firstName}
                      onChange={(e) =>
                        updateFormField("firstName", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Lastname"
                      className="form-control mb-3"
                      value={profileData.lastName}
                      onChange={(e) =>
                        updateFormField("lastName", e.target.value)
                      }
                    />
                    <input
                      type="email"
                      className="form-control mb-3"
                      value={profileData.email}
                      readOnly
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control mb-3"
                      value={profileData.address}
                      onChange={(e) =>
                        updateFormField("address", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Phone number"
                      className="form-control mb-3"
                      value={profileData.phone}
                      onChange={(e) => updateFormField("phone", e.target.value)}
                    />
                    <textarea
                      placeholder="Write something interesting about yourself.."
                      className="form-control mb-3"
                      value={profileData.aboutMe}
                      onChange={(e) =>
                        updateFormField("aboutMe", e.target.value)
                      }
                      maxLength={5000}
                    />
                    {(userType === "Agent" || isAgent || sourceURL) && (
                      <label className="alert alert-warning d-flex align-items-center">
                        <span>
                          <AiFillWarning
                            className="bi flex-shrink-0 me-2"
                            style={{ width: "24", height: "24" }}
                          />
                        </span>{" "}
                        Your data will be reviewed by our legal department
                      </label>
                    )}
                    <div className="d-flex justify-content-center">
                      {userType === "Agent" || isAgent || sourceURL ? (
                        <button
                          className="btn btn-primary col-md-6 mt-3 mb-5"
                          disabled={loading}
                        >
                          {loading ? "Processing" : "Next"}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary col-md-6 mt-3 mb-5"
                          disabled={loading}
                        >
                          {loading ? "Processing" : "Update Profile"}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(photo, null, 4)} </pre> */}
        </div>
      </LogoutMessage>
    </>
  );
}
