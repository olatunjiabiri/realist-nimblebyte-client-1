import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import config from "../../../config.js";

const AccountDelete = () => {
  // hooks
  const [searchParams] = useSearchParams();

  // state
  const [loading, setLoading] = useState(false);

  const email = searchParams.get("email");

  const navigate = useNavigate();

  useEffect(() => {
    if (email) requestAccountDelete();
  }, [email]);

  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("cLocation");
    localStorage.removeItem("adData");
    localStorage.removeItem("profileFormData");
    localStorage.removeItem("profile");
  };

  const requestAccountDelete = async () => {
    try {
      const response = await axios.post(
        `${config.AUTH_API}/user/DeleteAccount`,
        { email: email }
      );
      // console.log(response.data);
      if (!response?.data?.message) {
        toast.error(response?.data?.message);
        logout();
        navigate("/");
      } else {
        // console.log(response.data.message);
        toast.success("Your Account has been suceessfully Deleted");
        navigate("/");
      }
    } catch (err) {
      // console.log(err);
      // toast.error("Something went wrong. Try again.");
      navigate("/");
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please wait...
    </div>
  );
};

export default AccountDelete;
