import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { useAuth } from "../../context/auth";
import config from "../../NewConfig";

export default function AccountActivate() {
  // hooks
  const [searchParams] = useSearchParams();

  // context
  const [auth, setAuth] = useAuth();
  // state
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) requestActivation();
  }, [token]);

  useEffect(() => {
    if (auth.user) {
      setRole(auth.user?.role);
    }
  }, []);

  const addDefaultRole = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${config.AUTH_API}/api/Roles/AddRole`,
        {
          userId: auth.user.userId,
          role: "Buyer",
        }
      );

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        auth.user.role.push("Buyer");

        setAuth({ ...auth });
        console.log("auth", auth);

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);
        toast.success("Role Added");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "Something went wrong. Default Role cannot be assigned now. Try again."
      );
      setLoading(false);
    }
  };

  const requestActivation = async () => {
    try {
      const response = await axios.get(
        `${config.AUTH_API}/user/ConfirmEmail?token=${token}&userId=${userId}`
      );

      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        // navigate("/login");
      } else {
        console.log(response);
        // addDefaultRole();
        toast.success("Your email has been confirmed. Log in to NimbleCasa.");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      navigate("/register");
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
}
