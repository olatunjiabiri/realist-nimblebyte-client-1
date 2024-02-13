import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/auth.js";
import config from "../../../config.js";
import "./DeleteAccount.css";

export default function DeleteAccount() {
  // state
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${config.AUTH_API}/User/SendDeleteUserNotification?email=${auth?.user?.email}`
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
      <form
        className="delete-account-modal"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="h3 mb-4 text-center">Delete Account</div>
        <div className="mx-2 my-3 text-center">
          {" "}
          Deleting your account will remove all your infromation from our
          database. Click Contnue to proceed
        </div>

        <div className="mx-3">
          <button disabled={loading} className="btn btn-primary col-12 mb-4">
            {loading ? "Waiting..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
