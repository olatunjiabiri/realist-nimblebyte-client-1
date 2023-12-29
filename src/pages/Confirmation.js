import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "./../config.js";
import ContentWrapper from "../components/contentWrapper/ContentWrapper";

import "./Login.css";

export default function Confirmation() {
  // state
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("confirmation"));
    setEmail(email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { emailId, path } = JSON.parse(
        localStorage.getItem("confirmation")
      );
      const { data } = await axios.post(`${config.AUTH_API}/user/resend`, {
        email,
        emailId: config.emailId,
        path: `${window.location.origin}/auth/account-activate`,
      });

      if (!data?.success) {
        setLoading(false);
      } else {
        toast.success(
          "Confirmation link resent successfully, check your email!"
        );
        setLoading(false);
      }
    } catch (err) {
      if (err.response.data.success === false) {
        switch (err.response.data.statusCode) {
          case 302: //user does not exist
            toast.error(err.response.data.message);
            // navigate("/register");
            break;
          case 401:
          case 417:
            // toast.error("Invalid Credential."); // Incorrect password
            toast.error(err.response.data.message); //wrong password
            break;
          default:
          // code block
        }
        // toast.error(err.response.data.message);
      } else toast.error("Something went wrong", err);
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit}>
            <div className="h3 mb-4 text-center">Email Confirmation</div>
            <input
              type="text"
              placeholder="Enter your email"
              className="form-control mb-4"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={loading} className="btn btn-primary col-12 mb-4">
              {loading ? "Waiting..." : "Resend email"}
            </button>
          </form>
        </div>
      </div>
    </ContentWrapper>
  );
}
