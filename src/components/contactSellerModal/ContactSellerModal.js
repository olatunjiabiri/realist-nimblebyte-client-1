import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./ContactSellerModal.css";
import { useAuth } from "../../context/auth";
import config from "../../NewConfig";

const ContactSellerModal = ({ ad, onClose, onSubmit }) => {
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
      setMessage(
        `Hi, I am interested in the property located at ${
          ad?.address || ""
        }.  Thanks`
      );
    }
  }, [loggedIn]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <>
      {ad && (
        <div className="modal-content">
          <h3 className="modal-content-title">Contact this Property</h3>
          <div className="modal-image-wrapper">
            <img
              src={ad?.photos[0].Location}
              alt=""
              className="property-image"
              width={300}
              height={30}
            />
          </div>

          <form className="contact-modal">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="form-control contact-modal-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              className="form-control contact-modal-control mb-3"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

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
              onClick={handleSubmit}
              className="btn btn-primary mt-4 mb-5 contact-modal-btn"
              disabled={!name || !email || loading}
            >
              {loading ? "Please wait" : "Send Enquiry"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ContactSellerModal;
