import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ImageGallery,
  generatePhotosArray,
} from "../../components/misc/ImageGallery";

import "./ContactSellerModal.css";

import axios from "axios";

const ContactSellerModal = ({ ad, onClose, onSubmit }) => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  const loggedIn = auth.user !== null && auth.token !== "";

  useEffect(() => {
    if (loggedIn) {
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setPhone(auth.user?.phone);
    }
  }, [loggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ name, email, message, phone, adId: ad._id });
      setLoading(false);
      onClose();
      toast.success("Your enquiry has been emailed to the seller");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Contact this Property</h3>

        <img src="./room.jpg" alt="Property Image" className="property-image" />

        {/* <ImageGallery
          photos={generatePhotosArray(ad?.photos)}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          alt="Property Image"
          className="property-image"
        /> */}

        <form className="contact-modal" onSubmit={handleSubmit}>
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
            className="contact-modal-btn btn btn-primary mt-4 mb-5"
            disabled={!name || !email || loading}
          >
            {loading ? "Please wait" : "Send Enquiry"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactSellerModal;
