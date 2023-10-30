import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import "./ContactSellerModal.css";
import { useAuth } from "../../context/auth";
import config from "../../NewConfig";
import { contactSellerFormSchema } from "../../../src/validations";

const ContactSellerModal = ({ ad, onClose }) => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [agent, setAgent] = useState("");

  const loggedIn = auth.user !== null && auth.token !== "";

  useEffect(() => {
    fetchAgents();
    if (loggedIn) {
      setName(auth.user?.firstName || "");
      setEmail(auth.user?.email || "");
      setPhone(auth.user?.phone || "");
    }
    setMessage(
      `Hi, I am interested in the property located at ${
        ad?.address || ""
      }.  Thanks`
    );
  }, [loggedIn, ad?.address, auth?.user]);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(
        `${config.AUTH_API}/api/Roles/GetUsersByRole?roleName=Seller`
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
      setLoading(true);

      const response = await axios.post(
        `${config.AUTH_API}/api/ContactSeller`,
        {
          adId: ad?._id,
          message,
          sellerEmail: agent[0].email.toString() || "",
          enquirerEmail: email,
          propertyPageUrl: `https://realistclientapp2.azurewebsites.net/ad/${ad?.slug}`,
          enquirerName: name,
          enquirerPhone: phone,
          propertyAddress: ad.address,
        }
      );
      console.log("response>>>", response);
      toast.success("Your enquiry has been sent to the seller");
      setLoading(false);
    } catch (err) {
      console.error(err);
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
      name: name,
      phone: phone,
      email: email,
      message: message,
    },
    validationSchema: contactSellerFormSchema,
    onSubmit,
  });

  return (
    <>
      {ad && (
        <div>
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

          <form className="contact-modal" onSubmit={handleSubmit}>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus={true}
            ></textarea>

            <button
              // onClick={handleSubmit}
              type="submit"
              className="btn btn-primary mt-4 mb-5 contact-modal-btn"
              disabled={loading}
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
