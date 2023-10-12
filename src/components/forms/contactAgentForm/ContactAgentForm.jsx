import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useAuth } from "../../../context/auth";

import "./ContactAgentForm.css";
import { contactAgentSchema } from "./validations";
import config from "../../../NewConfig";


const ContactAgentForm = ({ agent }) => {
  const navigate = useNavigate();

  
  // state
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const onSubmit = async (values, actions) => {
    
    try {
      setLoading(true);


      const response = await axios.post(`${config.AUTH_API}/api/Emailing/EmailEquiry`, {
        name: values.contactName,
        senderEmail: values.email,
        phone: values.phone,
        message: values.message,
        receiverEmail: agent[0].email,
        // emailId: config.emailId,
         appId: config.appId,                
      });

   

      // console.log("response>>>", response);
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
      contactName: auth.user?.firstName || "",
      email: auth.user?.email || "",
      phone: auth.user?.phone || "",
      message: "",
    },
    validationSchema: contactAgentSchema,
    onSubmit,
  });

  return (
    <>
      <div className="bd-1 form-container bd-color">
        <div className="contact-form-title text-center">
          <span>Contact {agent && agent[0].firstName.toUpperCase()}</span>
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
              {loading ? "LOADING" : "Contact"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactAgentForm;
