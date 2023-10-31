import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import "./ContactUs.css";
import { contactUsSchema } from "./validations";
import API, { AppId} from "../../config";

const ContactUs = () => {
  const navigate = useNavigate();

  
  // state
  const [loading, setLoading] = useState(false);


  // const submitHandler = async (e) => {
  const onSubmit = async (values, actions) => {
    // e.preventDefault();
    try {
      // console.log(email, password);
      setLoading(true);
      console.log('API>>', API)

      const response = await axios.post(`${API}/contact-us`, {
        name: values.contactName,
        email: values.email,
        phone: values.phone,
        messages: values.message,
      });

      // const response = await axios.post(
      //   `https://nimble-byte-backend.azurewebsites.net/api/Emailing/EmailEquiry`,
      //   {
      //     Name: values.contactName,
      //     SenderEmail: values.email,
      //     Phone: values.phone,
      //     Message: values.message,
      //     ReceiverEmail: "", //[optional]
      //     AppId
      //   }
      // );

      console.log("response>>>", response);
      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
      } else {
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
      contactName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: contactUsSchema,
    onSubmit,
  });

  return (
    <>
     <div className="bd-1 form-container bd-color">
        <div className="contact-form-title text-center">
          <span>Contact Us</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-4">
            <label for="name" className="control-label form-label1">
              {" "}
              Name{" "}
            </label>

            <input
              type="text"
              className="form-control"
              name="contactName"
              id="name"
              value={values.contactName}
              onChange={handleChange}
              onBlur={handleBlur}
              // onChange={(e) => setContactName(e.target.value)}
              autoFocus
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
            <label className="control-label form-label1"> Email </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              // onChange={(e) => setEmail(e.target.value)}
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
            <label className="control-label form-label1"> Phone </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
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
            <label className="form-label">
              {" "}
              Message <span className="text-muted">(optional)</span>
            </label>
            <textarea
              className="form-control"
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
              // onClick={submitHandler}
            >
              {isSubmitting ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {/* <div className="bd-1 form-container bd-color">
        <div className="contact-form-title text-center">
          <span>Let's match you with ideal developer</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-4">
            <label for="name" className="control-label form-label1">
              {" "}
              Name{" "}
            </label>

            <input
              type="text"
              className="form-control"
              name="contactName"
              id="name"
              value={values.contactName}
              onChange={handleChange}
              onBlur={handleBlur}
              // onChange={(e) => setContactName(e.target.value)}
              autoFocus
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
            <label className="control-label form-label1"> Email </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              // onChange={(e) => setEmail(e.target.value)}
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
            <label className="control-label form-label1"> Phone </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
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
            <label className="form-label">
              {" "}
              {helpType === "engineer"
                ? "What type of Engineers do you need?"
                : "How may we be of help?"}
            </label>
            <textarea
              className="form-control"
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
              // onClick={submitHandler}
            >
              {loading ? "LOADING" : "SUBMIT"}
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default ContactUs;
