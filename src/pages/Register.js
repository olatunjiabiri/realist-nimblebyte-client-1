import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper/ContentWrapper";
import Checkbox from "@mui/material/Checkbox";

import config from "../NewConfig";

export default function Register() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);
  // hooks
  const navigate = useNavigate();

  const handleTermsandPolicyCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${config.AUTH_API}/user/signUp`, {
        email,
        password,
        phoneNumber: "",
        emailId: config.emailId,
        path: `${window.location.origin}/auth/account-activate`,
        // appId: config.appId,
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
    <ContentWrapper>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit}>
            <div className="h3 mb-4 text-center">Create an Account</div>

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
            <div className="mb-3 text-center">
              <Checkbox
                checked={checked}
                onChange={handleTermsandPolicyCheck}
                inputProps={{ "aria-label": "controlled" }}
              />
              By clicking Register you agree to the{" "}
              <Link className="text-primary" to="#">
                Terms of use
              </Link>{" "}
              and{" "}
              <Link className="text-primary" to="#">
                Privacy Policy
              </Link>
            </div>
            <button
              disabled={!checked || loading}
              className="btn btn-primary col-12 mb-4"
            >
              {loading ? "Waiting..." : "Register"}
            </button>
          </form>
          {/* <div className="d-flex justify-content-between">
            <Link className="text-primary" to="#">
              Terms of use
            </Link>
            <Link className="text-primary" to="#">
              Privacy Policy
            </Link>
          </div> */}
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
    </ContentWrapper>
  );
}
