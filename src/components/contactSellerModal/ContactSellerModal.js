/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

import "./ContactSellerModal.css";
import { useAuth } from "../../context/auth";
import config from "../../NewConfig";
import { contactSellerFormSchema } from "../../../src/validations";
import BuyerTermsandConditions from "../../documents/BuyerTermsandConditions";
import Modall from "../modal/Modal";

const ContactSellerModal = ({ ad, setIsOpen, onClose }) => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  // const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [agent, setAgent] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const handleTermsandPolicyCheck = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(
        `${config.AUTH_API}/api/Roles/GetUsersByRole?roleName=Agent`
      );
      setAgent(
        data?.responsePayload.filter((a) => {
          return a.userId === ad?.postedBy;
        })
      );
      // setLoading(false);
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };

  const onSubmit = async (values, actions) => {
    const { name, email, message, phone } = values;

    setLoading(true);
    try {
      const response = await axios.post(
        `${config.AUTH_API}/api/ContactSeller`,
        {
          adId: ad?._id || "",
          message,
          sellerEmail: agent[0]?.email.toString() || "",
          enquirerEmail: email,
          propertyPageUrl: `${config.CLIENT_BASE_URL}/ad/${ad?._id}` || "",
          sellerName: agent[0]?.firstName || "",
          enquirerName: name,
          enquirerPhone: phone,
          propertyAddress: ad?.address || "",
          adminEmail: config.AdminEmail || "",
        }
      );

      // console.log("ad.address>>>", ad);
      toast.success("Your enquiry has been sent to the agent");
      setLoading(false);
      setIsOpen(false);
    } catch (err) {
      console.error("enquiry error", err);
      toast.error("Something went wrong! Try again.");
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
      name: auth?.user?.firstName || "",
      phone: auth?.user?.phone || "",
      email: auth?.user?.email || "",
      message: `Hi, I am interested in the property located at ${
        ad?.googleMap[0]?.city || ad?.googleMap[0]?.country || ""
      }. Thanks`,
    },
    validationSchema: contactSellerFormSchema,
    onSubmit,
  });

  return (
    <>
      <Modall handleClose={() => setIsOpen1(false)} isOpen={isOpen1}>
        <BuyerTermsandConditions setIsOpen1={setIsOpen1} />
      </Modall>
      {ad && (
        <div>
          <form className="contact-modal" onSubmit={handleSubmit}>
            <div className="">
              <h3 className="modal-content-title text-center ">
                Contact this Property
              </h3>
            </div>
            <div className="modal-image-wrapper">
              <img
                src={ad?.photos[0].Location}
                alt=""
                className="property-image"
                width={300}
                height={30}
              />
            </div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.name && touched.name && (
              <div className="mt-0 text-danger">
                <h6>
                  {" "}
                  <p> {errors.name}</p>
                </h6>
              </div>
            )}

            <input
              type="text"
              id="validationCustom03"
              name="email"
              placeholder="Enter your email"
              className="form-control contact-modal-control mb-3"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.email && touched.email && (
              <div className="mt-0 text-danger">
                <h6>
                  {" "}
                  <p> {errors.email}</p>
                </h6>
              </div>
            )}

            <input
              type="text"
              name="phone"
              className="form-control contact-modal-control mb-3"
              placeholder="Enter your phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.phone && touched.phone && (
              <div className="mt-0 text-danger">
                <h6>
                  {" "}
                  <p> {errors.phone}</p>
                </h6>
              </div>
            )}

            <textarea
              name="message"
              className="form-control contact-modal-control mb-3"
              id="form-control-textarea"
              placeholder="Write your message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus={true}
            ></textarea>
            <div className="mb-1 text-center terms-text">
              <Checkbox
                checked={checked}
                onChange={handleTermsandPolicyCheck}
                inputProps={{ "aria-label": "controlled" }}
              />
              By submitting this form I agree to the{" "}
              <Link
                className="text-primary"
                // to="/buyer-terms"
                onClick={() => setIsOpen1(true)}
              >
                Terms of Use
              </Link>{" "}
            </div>

            <button
              // onClick={handleSubmit}
              type="submit"
              className="btn btn-primary mt-4 mb-5 contact-modal-btn"
              disabled={!checked || loading}
            >
              {isSubmitting ? "Please wait" : "Send Enquiry"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ContactSellerModal;
