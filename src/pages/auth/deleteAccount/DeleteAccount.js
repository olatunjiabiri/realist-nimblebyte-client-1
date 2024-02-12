import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import config from "../../../config.js";
import "./DeleteAccount.css";

export default function DeleteAccount() {
  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${config.AUTH_API}/user/SendResetPasswordCode?email=${email}&appId=${config.emailId}`
      );

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success(
          "Please check your email to complete Account Deletion process"
        );
        setLoading(false);
        navigate("/");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="h3 mb-4 text-center">Delete Account</div>
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
          {loading ? "Waiting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
