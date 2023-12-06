import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import LogoutMessage from "../../components/misc/logoutMessage/LogoutMessage";

import "./ContactUs.css";
import { useAuth } from "../../context/auth";
// import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import { contactUsSchema } from "./validations";
import config from "../../NewConfig";

const ContactUs = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // state
  const [loading, setLoading] = useState(false);
  // console.log("subject", auth.user);

  const onSubmit = async (values, actions) => {
    const {
      contactName,
      email,
      message,
      phone,
      subject,
      propertyType,
      propertySubtype,
      enquiryType,
      location,
    } = values;

    try {
      // console.log(email, password);
      setLoading(true);

      const response = await axios.post(
        `${config.AUTH_API}/api/Emailing/ContactUs`,
        {
          Name: contactName,
          Email: email,
          Phone: phone,
          Message: message,
          Subject: subject,
          PropertyType: propertyType,
          EnquiryType: enquiryType,
          PropertySubtype: propertySubtype,
          Location: location,
          EmailReceiver: config.AdminEmail,
          Action: "",
        }
      );

      // console.log("response>>>", response);
      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
      } else {
        // toast.success("Message Sent");
        toast.success(response.data.message);
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      contactName: auth?.user?.firstName || "",
      email: auth?.user?.email || "",
      phone: auth?.user?.phone || "",
      message: "",
      subject: "Enquiry",
      enquiryType: "",
      propertyType: "",
      propertySubtype: "",
      location: "",
    },
    validationSchema: contactUsSchema,
    onSubmit,
  });

  //Function to handle subject change
  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setFieldValue("subject", selectedSubject);

    // Reset other fields when subject changes
    setFieldValue("enquiryType", "");
    setFieldValue("propertyType", "");
    setFieldValue("propertySubtype", "");
    setFieldValue("location", "");
  };

  return (
    <>
      {/* <ContentWrapper> */}
      <LogoutMessage>
        <div className="background-color">
          <div className="container mt-5 p-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="bd-1 contact-us-container contact-bd-color">
                  <div className="contact-form-title text-center">
                    <h2>Contact Us</h2>
                  </div>
                  <hr />

                  <form onSubmit={handleSubmit}>
                    <div className="form-group mt-4">
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter your name"
                        name="contactName"
                        id="name"
                        value={values.contactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.contactName && touched.contactName && (
                        <p className="mt-0 text-danger">
                          <small>
                            {" "}
                            <div> {errors.contactName}</div>
                          </small>
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-4">
                      <input
                        type="email"
                        className="form-control mb-2"
                        name="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <p className="mt-0 text-danger">
                          <small>
                            {" "}
                            <div> {errors.email}</div>
                          </small>
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-4">
                      <input
                        type="tel"
                        name="phone"
                        className="form-control mb-2"
                        placeholder="Enter your phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone && (
                        <p className="mt-0 text-danger">
                          <small>
                            {" "}
                            <div> {errors.phone}</div>
                          </small>
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-4">
                      <select
                        // autoFocus
                        placeholder="Select Message type"
                        onChange={(e) => {
                          handleChange(e);
                          handleSubjectChange(e);
                        }}
                        name="subject"
                        className="form-select form-select-lg f-select"
                      >
                        <option
                          className="form-select-lg mb-3 f-select"
                          value={"Enquiry"}
                        >
                          Enquiry
                        </option>
                        <option
                          className="form-select-lg mb-3 f-select"
                          value={"Complaint"}
                        >
                          Complaint
                        </option>
                      </select>
                    </div>

                    {/* Conditionally render fields for Enquiry */}
                    {values.subject === "Enquiry" && (
                      <>
                        <div className="form-group mt-2">
                          <div className="radio-button m-2">
                            <label className="radio-label">
                              <input
                                type="radio"
                                name="enquiryType"
                                value="Sell"
                                checked={values.enquiryType === "Sell"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <span className="radio-span">Sell</span>
                            </label>
                            <label className="radio-label">
                              <input
                                type="radio"
                                name="enquiryType"
                                value="Lease"
                                checked={values.enquiryType === "Lease"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <span className="radio-span">Lease</span>
                            </label>
                          </div>
                        </div>

                        {/* Additional fields for Enquiry */}
                        <div className="form-group">
                          <select
                            name="propertyType"
                            className="form-select form-select-lg f-select"
                            value={values.propertyType}
                            onChange={handleChange}
                          >
                            <option value="">Select Property Type</option>
                            <option
                              className="form-select-lg mb-3 f-select"
                              value={"Commercial"}
                            >
                              Commercial
                            </option>
                            <option
                              className="form-select-lg mb-3 f-select"
                              value={"Industrial"}
                            >
                              Industrial
                            </option>
                            <option
                              className="form-select-lg mb-3 f-select"
                              value={"Short-Let"}
                            >
                              Short-Let
                            </option>
                            <option
                              className="form-select-lg mb-3 f-select"
                              value={"House"}
                            >
                              House
                            </option>
                            <option
                              className="form-select-lg mb-3 f-select"
                              value={"Land"}
                            >
                              Land
                            </option>
                          </select>
                        </div>

                        <div className="form-group mt-4">
                          <input
                            type="text"
                            name="propertySubtype"
                            className="form-control mb-2"
                            placeholder="Property Sub-type"
                            value={values.propertySubtype}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="form-group mt-4">
                          <input
                            type="text"
                            name="location"
                            className="form-control mb-2"
                            placeholder="Location"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </>
                    )}

                    {/* Hide Message field for Enquiry */}
                    {values.subject !== "Enquiry" && (
                      <div className="form-group mt-4">
                        <textarea
                          className="form-control mb-2"
                          placeholder="Write your message"
                          cols={10}
                          rows={5}
                          name="message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.message && touched.message && (
                          <p className="mt-0 text-danger">
                            <small>
                              {" "}
                              <div> {errors.message}</div>
                            </small>
                          </p>
                        )}
                      </div>
                    )}
                    <div className="mt-4">
                      <button
                        className="contact-button w-100 btn btn-color"
                        disabled={loading}
                      >
                        {isSubmitting ? "Loading" : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LogoutMessage>
      {/* </ContentWrapper> */}
    </>
  );
};

export default ContactUs;
