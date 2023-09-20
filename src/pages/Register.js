import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import config from "../NewConfig";

export default function Register() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      setLoading(true);
      const response = await axios.post(`${config.AUTH_API}/user/signUp`, {
        email,
        password,
        phoneNumber: "",
        appId: config.appId,
      });

      // console.log(response)
      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
      } else {
        toast.success("Confirmation link has been sent to your mail");
        setLoading(false);
        navigate("/");
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container m-5 p-5" style={{ marginTop: "80px" }}>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Register"}
              </button>
            </form>
            <div className="mt-3 text-grey-600">
              Already have an account?{" "}
              <span>
                <Link className="text-danger" to="/login">
                  Log in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
