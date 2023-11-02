import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import "./ContactUs.css";
import { useAuth } from "../../context/auth";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import { contactUsSchema } from "./validations";
import config from "../../NewConfig";

const ContactUs = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // state
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    const { contactName, email, message, phone, subject } = values;
    console.log("subject", subject);

    try {
      // console.log(email, password);
      setLoading(true);

      const response = await axios.post(`${config.AUTH_API}/api/contact-us`, {
        name: contactName,
        email: email,
        phone: phone,
        messages: message,
        subject: subject,
      });

      console.log("response>>>", response);
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
  } = useFormik({
    initialValues: {
      contactName: auth?.user?.firstName || "",
      email: auth?.user?.email || "",
      phone: auth?.user?.phone || "",
      message: "",
      subject: "Enquiry",
    },
    validationSchema: contactUsSchema,
    onSubmit,
  });

  return (
    // <ContentWrapper>
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
                  {/* <label for="name" className="control-label form-label1">
              {" "}
              Name{" "}
            </label> */}

                  <input
                    type="text"
                    className="form-control mb-3"
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
                  {/* <label className="control-label form-label1"> Email </label> */}
                  <input
                    type="email"
                    className="form-control mb-3"
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
                  {/* <label className="control-label form-label1"> Phone </label> */}
                  <input
                    type="tel"
                    name="phone"
                    className="form-control mb-3"
                    placeholder="Enter your email"
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
                    onChange={handleChange}
                    name="subject"
                    className="form-select form-select-lg f-select"
                  >
                    {/* <option disabled selected>
                    {" "}
                    Select Message type
                  </option> */}
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

                <div className="form-group mt-4">
                  {/* <label className="form-label">
              {" "}
              Message <span className="text-muted">(optional)</span>
            </label> */}
                  <textarea
                    className="form-control mb-3"
                    placeholder="Write your message"
                    cols={10}
                    rows={5}
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onChange={(e) => setMessage(e.target.value)}
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

    // </ContentWrapper>
  );
};

export default ContactUs;
